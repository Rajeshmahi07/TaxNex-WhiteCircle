const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['MSME', 'IEC', 'FSSAI', 'TRADEMARK', 'STARTUP', 'LLP', 'COMPANY'],
    required: true,
  },
  registrationNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  applicationNumber: {
    type: String,
  },
  businessName: {
    type: String,
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PENDING', 'PROCESSING', 'ACTIVE', 'REJECTED', 'EXPIRED', 'RENEWAL_DUE'],
    default: 'DRAFT',
  },
  appliedDate: {
    type: Date,
  },
  approvedDate: {
    type: Date,
  },
  validFrom: {
    type: Date,
  },
  validUntil: {
    type: Date,
  },
  certificateUrl: {
    type: String,
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date,
  }],
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  renewalReminder: {
    enabled: { type: Boolean, default: true },
    daysBefore: { type: Number, default: 30 },
    lastSent: { type: Date },
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

businessSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

businessSchema.index({ userId: 1, type: 1 });
businessSchema.index({ registrationNumber: 1 });
businessSchema.index({ status: 1 });

module.exports = mongoose.model('Business', businessSchema);