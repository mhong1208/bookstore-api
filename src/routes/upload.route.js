const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/upload.controller');
const { protect } = require('./auth.middleware');
const upload = require('./upload.middleware');

// @route   POST /api/upload
// @desc    Tải lên một file ảnh. Key của form-data phải là 'image'
// @access  Private
router.post('/', protect, upload.single('image'), uploadFile);

module.exports = router;