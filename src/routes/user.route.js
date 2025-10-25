const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Danh sách người dùng GET: http://localhost:5000/api/users
router.get("/", userController.getUsers);

// Tạo người dùng mới POST: http://localhost:5000/api/users
router.post("/register", userController.registerUser);

// Đăng nhập dùng POST: http://localhost:5000/api/users/login
router.post("/login", userController.loginUser);

module.exports = router;
