// src/services/category.service.js
const Category = require("../models/category.model");

const createCategory = async (data) => {
  return await Category.create(data);
};

const getCategories = async (pageIndex = 1, pageSize = 10) => {
  const skip = (pageIndex - 1) * pageSize;
  const categories = await Category.find().skip(skip).limit(pageSize).sort({ createdAt: -1 });
  const total = await Category.countDocuments();
  return {
    data: categories,
    pageIndex,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total,
  };
};

const updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

module.exports = { createCategory, getCategories, updateCategory };
