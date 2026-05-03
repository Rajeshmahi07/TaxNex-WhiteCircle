const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
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
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');
  
  return expectedSignature === signature;
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

module.exports = {
  createOrder,
  verifyPayment,
  getPayment,
  refundPayment,
};