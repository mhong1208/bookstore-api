const Category = require('../models/category.model');

const create = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

const getAll = async () => {
  return await Category.find({});
};

// Các hàm getById, update, delete có thể được thêm vào đây khi cần

module.exports = { create, getAll };