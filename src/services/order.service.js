const Order = require('../models/order.model');
const OrderItem = require('../models/order-item.model');
const Product = require('../models/product.model');
const Voucher = require('../models/voucher.model');
const voucherService = require('./voucher.service');

const createOrder = async (orderData, userId) => {
  const { orderItems, shippingAddress, notes, voucherCode } = orderData;

  if (!orderItems || orderItems.length === 0) {
    throw new Error('Không có sản phẩm nào trong đơn hàng');
  }

  // 1. Tạo các OrderItem và lưu vào DB
  const createdOrderItems = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item.book);
      if (!product) throw new Error(`Sản phẩm với ID ${item.book} không tồn tại.`);
      if (product.stock < item.quantity) throw new Error(`Sản phẩm '${product.title}' không đủ hàng.`);

      const orderItem = new OrderItem({
        book: item.book,
        quantity: item.quantity,
        price: product.price, // Lấy giá từ DB, không tin tưởng client
      });
      return await orderItem.save();
    })
  );

  // 2. Tính toán tổng tiền
  const subtotal = createdOrderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  let discountAmount = 0;
  let finalPrice = subtotal;
  let appliedVoucher = null;

  // 3. Xử lý Voucher (nếu có)
  if (voucherCode) {
    const voucher = await voucherService.findByCode(voucherCode);

    if (voucher && subtotal >= voucher.minOrderAmount) {
      if (voucher.discountType === 'fixed') {
        discountAmount = voucher.discountValue;
      } else { // percentage
        discountAmount = (subtotal * voucher.discountValue) / 100;
      }
      finalPrice = Math.max(0, subtotal - discountAmount); // Đảm bảo giá không âm
      appliedVoucher = voucher._id;

      voucher.timesUsed += 1;
      await voucher.save();
    }
  }

  // 4. Tạo đơn hàng
  const order = new Order({
    user: userId,
    orderItems: createdOrderItems.map((item) => item._id),
    shippingAddress,
    subtotal,
    discountAmount,
    totalPrice: finalPrice,
    voucher: appliedVoucher,
    notes,
  });

  return await order.save();
};

const getOrdersByUser = async (userId) => {
  return await Order.find({ user: userId }).populate('user', 'name email').populate('orderItems');
};

module.exports = { createOrder, getOrdersByUser };