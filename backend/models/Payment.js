const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  method: {
    type: String,
    enum: ['RAZORPAY', 'PHONEPE', 'CARD', 'UPI', 'NETBANKING'],
    required: true,
  },
  gateway: {
    type: String,
    enum: ['RAZORPAY', 'PHONEPE'],
    required: true,
  },
  transactionId: {
    type: String,
    unique: true,
  },
  orderId: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  signature: {
    type: String,
  },
  status: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
    default: 'PENDING',
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  receipt: {
    type: String,
  },
  refundAmount: {
    type: Number,
    default: 0,
  },
  refundReason: {
    type: String,
  },
  paidAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ invoiceId: 1 });
paymentSchema.index({ transactionId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);