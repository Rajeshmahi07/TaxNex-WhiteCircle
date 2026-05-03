const express = require('express');
const router = express.Router();
const { getConversation, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/conversation/:userId', protect, getConversation);
router.post('/', protect, sendMessage);

module.exports = router;