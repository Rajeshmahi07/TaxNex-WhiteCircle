const express = require('express');
const router = express.Router();
const { getClients } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, adminOnly, getClients);

module.exports = router;