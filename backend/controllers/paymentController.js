const Payment = require('../models/Payment');
const Invoice = require('../models/Invoice');
const razorpay = require('../utils/razorpay');
const phonepe = require('../utils/phonepe');

// @desc    Create Razorpay order
// @route   POST /api/payment/razorpay/create-order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { invoiceId } = req.body;
    
    if (!invoiceId) {
      return res.status(400).json({ message: 'Invoice ID is required' });
    }
    
    const invoice = await Invoice.findOne({ _id: invoiceId, userId: req.user._id });
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    const order = await razorpay.createOrder({
      amount: Math.round(invoice.totalAmount * 100), // in paise
      currency: 'INR',
      receipt: `invoice_${invoice._id}`,
      notes: {
        invoiceId: invoice._id.toString(),
        userId: req.user._id.toString(),
      },
    });
    
    // Save payment record
    const payment = await Payment.create({
      invoiceId: invoice._id,
      userId: req.user._id,
      amount: invoice.totalAmount,
      gateway: 'RAZORPAY',
      orderId: order.id,
      status: 'PENDING',
    });
    
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({ message: error.message || 'Failed to create payment order' });
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payment/razorpay/verify
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, paymentRecordId } = req.body;
    
    const isValid = razorpay.verifyPayment({
      orderId,
      paymentId,
      signature,
    });
    
    if (!isValid) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }
    
    const payment = await Payment.findById(paymentRecordId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }
    
    payment.status = 'SUCCESS';
    payment.paymentId = paymentId;
    payment.signature = signature;
    payment.paidAt = new Date();
    await payment.save();
    
    // Update invoice status
    await Invoice.findByIdAndUpdate(payment.invoiceId, { 
      status: 'paid', 
      paymentDate: new Date() 
    });
    
    res.json({ success: true, message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Razorpay verification error:', error);
    res.status(500).json({ message: error.message || 'Payment verification failed' });
  }
};

// @desc    Create PhonePe payment
// @route   POST /api/payment/phonepe/create
exports.createPhonePePayment = async (req, res) => {
  try {
    const { invoiceId, mobileNumber } = req.body;
    
    if (!invoiceId) {
      return res.status(400).json({ message: 'Invoice ID is required' });
    }
    
    const invoice = await Invoice.findOne({ _id: invoiceId, userId: req.user._id });
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    const transactionId = `TXN_${Date.now()}_${invoice._id.toString().slice(-6)}`;
    
    const paymentData = await phonepe.createPayment({
      amount: invoice.totalAmount,
      transactionId: transactionId,
      userId: req.user._id.toString(),
      mobileNumber: mobileNumber || '',
      redirectUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/status`,
    });
    
    if (!paymentData.success) {
      return res.status(400).json({ message: paymentData.error || 'Payment creation failed' });
    }
    
    const payment = await Payment.create({
      invoiceId: invoice._id,
      userId: req.user._id,
      amount: invoice.totalAmount,
      gateway: 'PHONEPE',
      transactionId: transactionId,
      status: 'PENDING',
    });
    
    res.json({
      success: true,
      paymentUrl: paymentData.paymentUrl,
      transactionId: transactionId,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error('PhonePe payment creation error:', error);
    res.status(500).json({ message: error.message || 'Failed to create payment' });
  }
};

// @desc    Verify PhonePe payment
// @route   POST /api/payment/phonepe/verify
exports.verifyPhonePePayment = async (req, res) => {
  try {
    const { transactionId } = req.body;
    
    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }
    
    const verification = await phonepe.verifyPayment(transactionId);
    
    if (!verification.success) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }
    
    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }
    
    payment.status = 'SUCCESS';
    payment.paidAt = new Date();
    await payment.save();
    
    await Invoice.findByIdAndUpdate(payment.invoiceId, { 
      status: 'paid', 
      paymentDate: new Date() 
    });
    
    res.json({ success: true, message: 'Payment verified successfully' });
  } catch (error) {
    console.error('PhonePe verification error:', error);
    res.status(500).json({ message: error.message || 'Payment verification failed' });
  }
};

// @desc    Get payment history
// @route   GET /api/payment/history
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .populate('invoiceId')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch payment history' });
  }
};

// @desc    Get payment by ID
// @route   GET /api/payment/:id
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    }).populate('invoiceId');
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    res.json(payment);
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch payment' });
  }
};