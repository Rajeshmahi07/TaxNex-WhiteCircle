const express = require('express');
const router = express.Router();
const { uploadDocuments, getDocuments, deleteDocument } = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.array('files', 10), uploadDocuments);
router.get('/', protect, getDocuments);
router.delete('/:id', protect, deleteDocument);

module.exports = router;