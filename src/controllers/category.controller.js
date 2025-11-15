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
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const { status } = req.query;
    const result = await categoryService.getAll(page, pageSize, { status });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

/**
 * @desc    Cập nhật danh mục
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.update(req.params.id, req.body);
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Không thể cập nhật danh mục', error: error.message });
  }
};

/**
 * @desc    Xóa (vô hiệu hóa) danh mục
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryService.softDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    }
    res.json({ message: 'Danh mục đã được vô hiệu hóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};


module.exports = { createCategory, getAllCategories, updateCategory, deleteCategory };