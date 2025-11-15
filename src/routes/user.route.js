const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect, admin } = require("./auth.middleware");

// Danh sách người dùng GET: http://localhost:5000/api/users
// Chỉ Admin mới có quyền xem danh sách người dùng
router.get("/", protect, admin, userController.getUsers);

// Tạo người dùng mới POST: http://localhost:5000/api/users
router.post("/register", userController.registerUser);

// Đăng nhập dùng POST: http://localhost:5000/api/users/login
router.post("/login", userController.loginUser);

// Cập nhật trạng thái người dùng PUT: http://localhost:5000/api/users/:id/status
router.put("/:id/status", protect, admin, userController.updateUserStatus);

module.exports = router;
