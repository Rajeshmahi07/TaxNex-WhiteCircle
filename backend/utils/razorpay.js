const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_your_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret',
});

// Create order
const createOrder = async (options) => {
  try {
    const order = await razorpayInstance.orders.create(options);
    return order;
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    throw error;
  }
};

// Verify payment
const verifyPayment = ({ orderId, paymentId, signature }) => {
  try {
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_key_secret')
      .update(body.toString())
      .digest('hex');
    
    return expectedSignature === signature;
  } catch (error) {
    console.error('Payment verification failed:', error);
    return false;
  }
};

// Get payment details
const getPayment = async (paymentId) => {
  try {
    const payment = await razorpayInstance.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    console.error('Failed to fetch payment:', error);
    throw error;
  }
};

// Refund payment
const refundPayment = async (paymentId, amount) => {
  try {
    const refund = await razorpayInstance.payments.refund(paymentId, { amount });
    return refund;
  } catch (error) {
    console.error('Refund failed:', error);
    throw error;
  }
};

// Get all payments
const getAllPayments = async () => {
  try {
    const payments = await razorpayInstance.payments.all();
    return payments;
  } catch (error) {
    console.error('Failed to fetch payments:', error);
    throw error;
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getPayment,
  refundPayment,
  getAllPayments,
};