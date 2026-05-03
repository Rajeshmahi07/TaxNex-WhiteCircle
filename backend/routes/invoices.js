const express = require('express');
const router = express.Router();
const { getInvoices, payInvoice } = require('../controllers/invoiceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getInvoices);
router.put('/:id/pay', protect, payInvoice);

module.exports = router;