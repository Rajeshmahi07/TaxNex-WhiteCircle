const mongoose = require('mongoose');

const businessRegistrationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['msme', 'iec', 'fssai', 'trademark', 'startup', 'llp', 'company'],
    required: true,
  },
  registrationNumber: {
    type: String,
  },
  applicationNumber: {
    type: String,
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'processing', 'active', 'rejected', 'expired'],
    default: 'draft',
  },
  appliedDate: {
    type: Date,
  },
  validUntil: {
    type: Date,
  },
  certificateUrl: {
    type: String,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
  },
  renewalReminder: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BusinessRegistration', businessRegistrationSchema);