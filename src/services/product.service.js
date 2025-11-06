// src/services/product.service.js
const Product = require("../models/product.model");

const createProduct = async (data) => {
  return await Product.create(data);
};

// options: { name, categories }
const getProducts = async (pageIndex = 1, pageSize = 10, options = {}) => {
  const skip = (pageIndex - 1) * pageSize;

  // Build query filters
  const query = {};
  if (options.name) {
    // case-insensitive partial match on title (name)
    query.title = { $regex: options.name, $options: "i" };
  }
  if (options.categories) {
    // accept comma-separated ids or an array
    let cats = options.categories;
    if (typeof cats === "string") {
      cats = cats.split(",").map((c) => c.trim()).filter(Boolean);
    }
    if (Array.isArray(cats) && cats.length > 0) {
      query.categories = { $in: cats };
    }
  }

  const products = await Product.find(query)
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .populate("categories"); // populate categories

  const total = await Product.countDocuments(query);
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

const getProductById = async (id) => {
  return await Product.findById(id).populate("categories");
};


module.exports = { createProduct, getProducts,updateProduct, getProductById };
