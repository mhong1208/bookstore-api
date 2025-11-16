const productService = require('../services/product.service');

/**
 * @desc    Tạo sản phẩm mới
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res) => {
  try {
    const createdProduct = await productService.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Không thể tạo sản phẩm', error: error.message });
  }
};

/**
 * @desc    Lấy tất cả sản phẩm (có phân trang)
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.pageIndex) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const { status } = req.query;
    const keyword = req.query.name;
    const category = req.query.categoryId;
    const result = await productService.getAll(page, pageSize, { keyword, status, category });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

/**
 * @desc    Lấy sản phẩm theo ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

/**
 * @desc    Cập nhật sản phẩm
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.update(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Không thể cập nhật sản phẩm', error: error.message });
  }
};

/**
 * @desc    Xóa sản phẩm
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteById(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json({ message: 'Sản phẩm đã được vô hiệu hóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };