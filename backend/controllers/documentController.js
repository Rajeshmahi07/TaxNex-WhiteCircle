const Document = require('../models/Document');
const Notification = require('../models/Notification');

// @desc    Upload documents
// @route   POST /api/documents/upload
exports.uploadDocuments = async (req, res) => {
  try {
    const { category, month, notes } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const documents = [];
    for (const file of files) {
      const document = await Document.create({
        userId: req.user._id,
        originalName: file.originalname,
        fileName: file.filename,
        fileUrl: `/uploads/${file.filename}`,
        fileSize: file.size,
        fileType: file.mimetype,
        category,
        month,
        notes,
      });
      documents.push(document);
    }

    // Create notification
    await Notification.create({
      userId: req.user._id,
      title: 'Documents Uploaded',
      message: `${documents.length} document(s) uploaded successfully`,
      type: 'document',
    });

    res.json({ success: true, documents, message: 'Documents uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user documents
// @route   GET /api/documents
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user._id }).sort({ uploadedAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete document
// @route   DELETE /api/documents/:id
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, userId: req.user._id });
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    await document.deleteOne();
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};