const Business = require('../models/Business');
const Notification = require('../models/Notification');

// @desc    Register new business
// @route   POST /api/business/register
exports.registerBusiness = async (req, res) => {
  try {
    const { type, businessName, details } = req.body;
    
    const business = await Business.create({
      userId: req.user._id,
      type,
      businessName,
      details,
      status: 'PENDING',
      appliedDate: new Date(),
    });
    
    // Create notification
    await Notification.create({
      userId: req.user._id,
      title: 'Business Registration Submitted',
      message: `Your ${type} registration has been submitted successfully.`,
      type: 'business',
    });
    
    res.status(201).json({
      success: true,
      data: business,
      message: `${type} registration submitted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user businesses
// @route   GET /api/business
exports.getUserBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get business by type
// @route   GET /api/business/:type
exports.getBusinessByType = async (req, res) => {
  try {
    const business = await Business.findOne({ 
      userId: req.user._id, 
      type: req.params.type.toUpperCase() 
    });
    res.json(business || { status: 'NOT_REGISTERED' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update business details
// @route   PUT /api/business/:id
exports.updateBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({ _id: req.params.id, userId: req.user._id });
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    Object.assign(business, req.body);
    business.updatedAt = new Date();
    await business.save();
    
    res.json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload certificate
// @route   POST /api/business/:id/certificate
exports.uploadCertificate = async (req, res) => {
  try {
    const business = await Business.findOne({ _id: req.params.id, userId: req.user._id });
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    
    if (req.file) {
      business.certificateUrl = `/uploads/${req.file.filename}`;
      business.status = 'ACTIVE';
      business.approvedDate = new Date();
      await business.save();
    }
    
    res.json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get renewal reminders
// @route   GET /api/business/reminders/renewal
exports.getRenewalReminders = async (req, res) => {
  try {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    const businesses = await Business.find({
      userId: req.user._id,
      validUntil: { $lte: thirtyDaysFromNow, $gte: new Date() },
      'renewalReminder.enabled': true,
    });
    
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};