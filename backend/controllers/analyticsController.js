const Filing = require('../models/Filing');
const User = require('../models/User');
const Document = require('../models/Document');

// @desc    Get analytics data
// @route   GET /api/analytics
exports.getAnalytics = async (req, res) => {
  try {
    const pendingFilings = await Filing.countDocuments({ status: 'pending' });
    const filedThisMonth = await Filing.countDocuments({
      status: 'filed',
      filingDate: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });
    const totalClients = await User.countDocuments({ role: 'client' });
    const clientsWithoutUploads = await User.countDocuments({
      role: 'client',
      _id: { $nin: await Document.distinct('userId') }
    });
    
    // Monthly stats
    const monthlyStats = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = months[date.getMonth()];
      const filed = await Filing.countDocuments({
        status: 'filed',
        filingDate: { $gte: new Date(date.getFullYear(), date.getMonth(), 1), $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1) }
      });
      const pending = await Filing.countDocuments({
        status: 'pending',
        dueDate: { $gte: new Date(date.getFullYear(), date.getMonth(), 1), $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1) }
      });
      monthlyStats.unshift({ month, filed, pending });
    }

    res.json({
      pendingFilings,
      filedThisMonth,
      totalClients,
      clientsWithoutUploads,
      delayReports: pendingFilings,
      monthlyStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};