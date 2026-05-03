const express = require('express');
const router = express.Router();
const { getDashboardStats, getClients } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, adminOnly, getDashboardStats);
router.get('/clients', protect, adminOnly, getClients);

module.exports = router;