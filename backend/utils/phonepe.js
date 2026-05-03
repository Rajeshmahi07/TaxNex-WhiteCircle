const crypto = require('crypto');
const axios = require('axios');

const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT';
const SALT_KEY = process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || 1;
const BASE_URL = process.env.PHONEPE_BASE_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox';

// Create payment payload
const createPayment = async ({ amount, transactionId, userId, mobileNumber = '', redirectUrl }) => {
  try {
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: userId,
      amount: amount * 100, // in paise
      redirectUrl: redirectUrl || `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/status`,
      redirectMode: 'REDIRECT',
      callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payment/phonepe/callback`,
      mobileNumber: mobileNumber,
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };
    
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const string = base64Payload + '/pg/v1/pay' + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + SALT_INDEX;
    
    const response = await axios.post(
      `${BASE_URL}/pg/v1/pay`,
      { request: base64Payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
        },
      }
    );
    
    if (response.data && response.data.success) {
      return {
        success: true,
        paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
        transactionId,
        merchantId: MERCHANT_ID,
      };
    }
    
    return { success: false, error: response.data?.message || 'Payment creation failed' };
  } catch (error) {
    console.error('PhonePe payment creation failed:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

// Verify payment status
const verifyPayment = async (transactionId) => {
  try {
    const string = `/pg/v1/status/${MERCHANT_ID}/${transactionId}` + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + SALT_INDEX;
    
    const response = await axios.get(
      `${BASE_URL}/pg/v1/status/${MERCHANT_ID}/${transactionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': MERCHANT_ID,
        },
      }
    );
    
    if (response.data && response.data.success && response.data.code === 'PAYMENT_SUCCESS') {
      return {
        success: true,
        status: response.data.data.transactionStatus,
        amount: response.data.data.amount / 100,
      };
    }
    
    return { success: false, status: response.data?.code || 'FAILED' };
  } catch (error) {
    console.error('PhonePe verification failed:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

// Process refund
const processRefund = async (transactionId, amount, refundId) => {
  try {
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: refundId || `REF_${Date.now()}`,
      originalTransactionId: transactionId,
      amount: amount * 100,
      callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payment/phonepe/refund-callback`,
    };
    
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const string = base64Payload + '/pg/v1/refund' + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + SALT_INDEX;
    
    const response = await axios.post(
      `${BASE_URL}/pg/v1/refund`,
      { request: base64Payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
        },
      }
    );
    
    return {
      success: response.data?.success || false,
      refundId: response.data?.data?.merchantTransactionId,
      status: response.data?.data?.transactionStatus,
    };
  } catch (error) {
    console.error('PhonePe refund failed:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  createPayment,
  verifyPayment,
  processRefund,
  MERCHANT_ID,
};