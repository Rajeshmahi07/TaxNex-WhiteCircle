const Reminder = require('../models/Reminder');
const Notification = require('../models/Notification');

// @desc    Get user reminders
// @route   GET /api/reminders
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id }).sort({ dueDate: 1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create reminder
// @route   POST /api/reminders
exports.createReminder = async (req, res) => {
  try {
    const { type, subType, title, message, dueDate, daysBefore, channels } = req.body;
    const reminder = await Reminder.create({
      userId: req.user._id,
      type,
      subType,
      title,
      message,
      dueDate,
      daysBefore: daysBefore || 3,
      channels: channels || { email: true, whatsapp: false, sms: false },
    });
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};