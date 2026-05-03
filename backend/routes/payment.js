const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createRazorpayOrder,
  verifyRazorpayPayment,
  createPhonePePayment,
  verifyPhonePePayment,
  getPaymentHistory,
  getPaymentById,
} = require('../controllers/paymentController');

router.post('/razorpay/create-order', protect, createRazorpayOrder);
router.post('/razorpay/verify', protect, verifyRazorpayPayment);
router.post('/phonepe/create', protect, createPhonePePayment);
router.post('/phonepe/verify', protect, verifyPhonePePayment);
router.get('/history', protect, getPaymentHistory);
router.get('/:id', protect, getPaymentById);

module.exports = router;