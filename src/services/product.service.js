// src/services/product.service.js
const Product = require("../models/product.model");

const createProduct = async (data) => {
  return await Product.create(data);
};

const getProducts = async (pageIndex = 1, pageSize = 10) => {
  const skip = (pageIndex - 1) * pageSize;
  const products = await Product.find()
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .populate("categories"); // populate categories
  const total = await Product.countDocuments();
  return {
    data: products,
    pageIndex,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total,
  };
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate("categories");
};


module.exports = { createProduct, getProducts,updateProduct };
