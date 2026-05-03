const Invoice = require('../models/Invoice');

// @desc    Get user invoices
// @route   GET /api/invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pay invoice
// @route   PUT /api/invoices/:id/pay
exports.payInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, userId: req.user._id });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    invoice.status = 'paid';
    invoice.paymentDate = new Date();
    await invoice.save();
    
    res.json({ message: 'Payment successful', invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};