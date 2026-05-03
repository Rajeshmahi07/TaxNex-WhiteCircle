const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  registerBusiness,
  getUserBusinesses,
  getBusinessByType,
  updateBusiness,
  uploadCertificate,
  getRenewalReminders,
} = require('../controllers/businessController');

router.post('/register', protect, registerBusiness);
router.get('/', protect, getUserBusinesses);
router.get('/reminders/renewal', protect, getRenewalReminders);
router.get('/:type', protect, getBusinessByType);
router.put('/:id', protect, updateBusiness);
router.post('/:id/certificate', protect, upload.single('certificate'), uploadCertificate);

module.exports = router;