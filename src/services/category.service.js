const Category = require('../models/category.model');

const create = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

const getAll = async (page = 1, pageSize = 10, options = {}) => {
  const skip = (page - 1) * pageSize;
  const query = {};

  // if (options.status !== 'all') {
  //   query.isActive = true;
  // }

  const total = await Category.countDocuments(query);
  const categories = await Category.find(query)
    .sort({ name: 1 })
    .skip(skip)
    .limit(pageSize);

  return {
    data: categories,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total,
  };
};

const update = async (id, updateData) => {
  return await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const softDelete = async (id) => {
  return await Category.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

// Các hàm getById có thể được thêm vào đây khi cần

module.exports = { create, getAll, update, softDelete };