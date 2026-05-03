const express = require('express');
const router = express.Router();
const { getReminders, createReminder } = require('../controllers/reminderController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getReminders);
router.post('/', protect, createReminder);

module.exports = router;