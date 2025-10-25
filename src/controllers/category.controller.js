// src/controllers/category.controller.js
const categoryService = require("../services/category.service");

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const pageIndex = parseInt(req.query.pageIndex) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const result = await categoryService.getCategories(pageIndex, pageSize);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await categoryService.updateCategory(id, req.body);
    if (!updatedCategory) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createCategory, getCategories, updateCategory };
