// src/routes/category.route.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.put("/:id", categoryController.updateCategory);

module.exports = router;
