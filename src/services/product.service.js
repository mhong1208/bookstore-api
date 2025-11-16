const Product = require('../models/product.model');

const create = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

const getAll = async (page = 1, pageSize = 10, options = {}) => {
  const { keyword, status, category } = options;
  const searchCondition = {};

  // Mặc định chỉ lấy sản phẩm đang hoạt động, trừ khi có yêu cầu lấy tất cả
  // if (status !== 'all') {
  //   searchCondition.isActive = true;
  // }

  if (keyword && keyword.trim() !== '') {
    searchCondition.title = { $regex: keyword, $options: 'i' };
  }

  if (category && category.trim() !== '') {
    searchCondition.categories = category;
  }

  const count = await Product.countDocuments(searchCondition);
  const products = await Product.find(searchCondition)
    .populate('categories')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  return {
    data: products,
    page,
    pageSize,
    totalPages: Math.ceil(count / pageSize),
    totalItems: count,
  };
};

const getById = async (id) => {
  return await Product.findOne({ _id: id, isActive: true }).populate('categories');
};

const update = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteById = async (id) => {
  // Chuyển sang soft delete
  return await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

module.exports = { create, getAll, getById, update, deleteById };