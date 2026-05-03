const Filing = require('../models/Filing');

// @desc    Get user filings
// @route   GET /api/filings
exports.getFilings = async (req, res) => {
  try {
    const filings = await Filing.find({ userId: req.user._id }).sort({ dueDate: 1 });
    res.json(filings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create filing
// @route   POST /api/filings
exports.createFiling = async (req, res) => {
  try {
    const { type, period, dueDate, amount } = req.body;
    const filing = await Filing.create({
      userId: req.user._id,
      type,
      period,
      dueDate,
      amount,
      status: 'pending',
    });
    res.status(201).json(filing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};