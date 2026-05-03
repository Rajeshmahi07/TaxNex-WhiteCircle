const User = require('../models/User');
const Filing = require('../models/Filing');
const Document = require('../models/Document');
const Invoice = require('../models/Invoice');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalFilings = await Filing.countDocuments();
    const pendingFilings = await Filing.countDocuments({ status: 'pending' });
    const filedCount = await Filing.countDocuments({ 
      status: 'filed',
      filingDate: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });
    const totalDocuments = await Document.countDocuments();
    const unpaidInvoices = await Invoice.countDocuments({ status: 'unpaid' });

    res.json({
      totalClients,
      totalFilings,
      pendingFilings,
      filedCount,
      totalDocuments,
      unpaidInvoices,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all clients
// @route   GET /api/admin/clients
exports.getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' }).select('-password').sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};