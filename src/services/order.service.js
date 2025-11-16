const Order = require('../models/order.model');
const OrderItem = require('../models/order-item.model');
const Product = require('../models/product.model');
const Voucher = require('../models/voucher.model');
const createOrder = async (orderData, userId) => {
  const { orderItems, shippingAddress, notes, voucherCode, paymentMethod, shippingMethod } = orderData;

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
        price: product.price, 
        title: item.title,  
        image: item.image, 
      });

      product.stock -= item.quantity;
      await product.save();

      return await orderItem.save();
    })
  );

  const subtotal = createdOrderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  let discountAmount = 0;
  let finalPrice = subtotal;
  let appliedVoucher = null;

  // 3. Xử lý Voucher (nếu có)
  if (voucherCode) {
    try {
      const voucherResult = await voucherService.apply(voucherCode, subtotal);
      discountAmount = voucherResult.discountAmount;
      finalPrice = voucherResult.finalPrice;

      const voucher = await Voucher.findOne({ code: voucherCode });
      if (voucher) {
        appliedVoucher = voucher._id;
        voucher.timesUsed += 1;
        await voucher.save();
      }
    } catch (error) {
      console.warn(`Voucher warning for order creation: ${error.message}`);
    }
  }

  const order = new Order({
    user: userId,
    orderItems: createdOrderItems.map((item) => item._id),
    shippingAddress,
    paymentMethod, 
    shippingMethod,
    subtotal,
    discountAmount,
    totalPrice: finalPrice,
    voucher: appliedVoucher,
    notes,
  });

  return await order.save();
};


const getOrdersByUser = async (userId, page = 1, pageSize = 10) => {
  const skip = (page - 1) * pageSize;
  const query = { user: userId };
  const total = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .populate('user', 'name email')
    .populate('orderItems')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  return {
    data: orders,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total,
  };
};

/**
 * Lấy tất cả đơn hàng (cho Admin)
 */
const getAllOrders = async (page = 1, pageSize = 10) => {
  const skip = (page - 1) * pageSize;
  const total = await Order.countDocuments();
  const orders = await Order.find({})
    .populate('user', 'name email')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'book',
        select: 'title price image', 
      },
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  return {
    data: orders,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total,
  };
};

/**
 * Lấy chi tiết đơn hàng bằng ID
 */
const getOrderById = async (orderId) => {
  return await Order.findById(orderId)
    .populate('user', 'name email')
    .populate({
      path: 'orderItems',
      populate: { path: 'book', select: 'title price' },
    });
};

/**
 * Cập nhật trạng thái đơn hàng
 */
const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Không tìm thấy đơn hàng');
  order.status = status;
  return await order.save();
};

module.exports = { createOrder, getOrdersByUser, getAllOrders, getOrderById, updateOrderStatus };