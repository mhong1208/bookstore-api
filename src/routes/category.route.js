const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');
const { protect, admin } = require('./auth.middleware');

// Route công khai để lấy danh sách
router.route('/').get(getAllCategories);
// Routes yêu cầu quyền Admin
router.route('/').post(protect, admin, createCategory);
router.route('/:id').put(protect, admin, updateCategory).delete(protect, admin, deleteCategory);

module.exports = router;