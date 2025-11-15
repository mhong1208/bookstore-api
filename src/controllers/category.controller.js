const categoryService = require('../services/category.service');

/**
 * @desc    Tạo danh mục mới
 * @route   POST /api/categories
 * @access  Private/Admin
 */
const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const createdCategory = await categoryService.create({ name, description });
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: 'Không thể tạo danh mục', error: error.message });
  }
};

/**
 * @desc    Lấy tất cả danh mục
 * @route   GET /api/categories
 * @access  Public
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

// Các hàm getById, update, delete có thể được viết tương tự như Product

module.exports = { createCategory, getAllCategories };