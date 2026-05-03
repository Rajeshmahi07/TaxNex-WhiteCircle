const express = require('express');
const router = express.Router();
const { verifyGSTIN } = require('../controllers/gstController');
const { protect } = require('../middleware/authMiddleware');

router.post('/verify', protect, verifyGSTIN);

module.exports = router;