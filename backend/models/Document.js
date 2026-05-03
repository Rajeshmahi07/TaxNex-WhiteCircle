const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
  },
  fileType: {
    type: String,
  },
  category: {
    type: String,
    enum: ['gst', 'itr', 'tds', 'bank', 'other'],
    default: 'other',
  },
  month: {
    type: String,
    pattern: /^\d{4}-\d{2}$/,
  },
  year: {
    type: Number,
  },
  notes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'processed', 'rejected'],
    default: 'pending',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  processedAt: Date,
});

module.exports = mongoose.model('Document', documentSchema);