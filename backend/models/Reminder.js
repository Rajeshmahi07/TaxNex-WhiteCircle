const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['gst', 'itr', 'tds', 'general'],
    required: true,
  },
  subType: {
    type: String,
    enum: ['GSTR-1', 'GSTR-3B', 'ITR-July31', 'ITR-Sept30', 'TDS-Quarterly', 'GST-Annual'],
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  daysBefore: {
    type: Number,
    default: 3,
  },
  channels: {
    email: { type: Boolean, default: true },
    whatsapp: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
  },
  sent: {
    type: Boolean,
    default: false,
  },
  sentAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reminder', reminderSchema);