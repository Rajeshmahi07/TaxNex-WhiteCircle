const express = require('express');
const router = express.Router();
const { getFilings, createFiling } = require('../controllers/filingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getFilings);
router.post('/', protect, createFiling);

module.exports = router;