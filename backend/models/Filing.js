const mongoose = require('mongoose');

const filingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['GSTR-1', 'GSTR-3B', 'GSTR-4', 'ITR-1', 'ITR-2', 'ITR-3', 'ITR-4', 'TDS', 'TCS'],
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  financialYear: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  filingDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'in-process', 'filed', 'rejected'],
    default: 'pending',
  },
  acknowledgementNo: {
    type: String,
  },
  acknowledgementFile: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
  },
  remarks: {
    type: String,
  },
  filedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

filingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Filing', filingSchema);