const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/order.controller');
const { protect, admin } = require('./auth.middleware');

// Routes cho người dùng
router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders); // Admin có thể lấy tất cả đơn hàng
router.route('/myorders').get(protect, getMyOrders);

// Routes cho Admin
router.route('/:id').get(protect, admin, getOrderById);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;