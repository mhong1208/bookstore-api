const Product = require('../models/product.model');

const create = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

const getAll = async (page = 1, pageSize = 10, keyword = '') => {
  const searchCondition = keyword
    ? {
        title: {
          $regex: keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments(searchCondition);
  const products = await Product.find(searchCondition)
    .populate('categories')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  return { products, page, pages: Math.ceil(count / pageSize) };
};

const getById = async (id) => {
  return await Product.findById(id).populate('categories');
};

const update = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteById = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = { create, getAll, getById, update, deleteById };