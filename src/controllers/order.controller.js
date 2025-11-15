const orderService = require('../services/order.service');

/**
 * @desc    Tạo đơn hàng mới
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res) => {
  try {
    const createdOrder = await orderService.createOrder(req.body, req.user.id);
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: 'Không thể tạo đơn hàng', error: error.message });
  }
};

/**
 * @desc    Lấy đơn hàng của người dùng đang đăng nhập
 * @route   GET /api/orders/myorders
 * @access  Private
 */
const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = { createOrder, getMyOrders };