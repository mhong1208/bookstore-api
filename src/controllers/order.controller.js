const orderService = require('../services/order.service');

/**
 * @desc    Tạo đơn hàng mới
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, notes, voucherCode } = req.body;
    const createdOrder = await orderService.createOrder(
      { orderItems, shippingAddress, notes, voucherCode },
      req.user.id
    );
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
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const result = await orderService.getOrdersByUser(req.user.id, page, pageSize);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

/**
 * @desc    Lấy tất cả đơn hàng (Admin)
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const result = await orderService.getAllOrders(page, pageSize);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

/**
 * @desc    Lấy đơn hàng theo ID (Admin)
 * @route   GET /api/orders/:id
 * @access  Private/Admin
 */
const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

/**
 * @desc    Cập nhật trạng thái đơn hàng (Admin)
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await orderService.updateOrderStatus(req.params.id, status);
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Không thể cập nhật đơn hàng', error: error.message });
  }
};


module.exports = { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus };