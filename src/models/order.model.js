const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Order Schema – Lưu thông tin đơn hàng của người dùng
 */
const orderSchema = new Schema(
  {
    /**
     * Người tạo đơn hàng
     * Liên kết tới bảng User
     */
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    /**
     * Danh sách các sản phẩm trong đơn hàng
     * Mỗi OrderItem chứa:
     *  - book (sách)
     *  - quantity (số lượng)
     *  - price (giá tại thời điểm đặt)
     */
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
      },
    ],

    /**
     * Thông tin địa chỉ giao hàng của khách hàng
     */
    shippingAddress: {
      address: { type: String, required: true },      // Số nhà, tên đường
      city: { type: String, required: true },          // Thành phố / tỉnh
      postalCode: { type: String, required: true },    // Mã bưu điện
      country: { type: String, required: true },       // Quốc gia
    },

    /**
     * Tổng tiền hàng TRƯỚC khi trừ giảm giá
     * subtotal = sum(orderItems.totalItemPrice)
     */
    subtotal: {
      type: Number,
      required: true,
      default: 0.0,
    },

    /**
     * Tổng số tiền giảm giá (nếu có)
     * discountAmount = subtotal - totalPrice
     */
    discountAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },

    /**
     * Tổng tiền khách cần thanh toán
     * totalPrice = subtotal - discountAmount
     */
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    /**
     * Trạng thái thanh toán
     * true  -> đã thanh toán
     * false -> chưa thanh toán
     */
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    /**
     * Thời điểm thanh toán (nếu có)
     */
    paidAt: {
      type: Date,
    },

    /**
     * Trạng thái xử lý của đơn hàng
     */
    status: {
      type: String,
      required: true,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    /**
     * Mã giảm giá được áp dụng cho đơn hàng (nếu có)
     */
    voucher: {
      type: Schema.Types.ObjectId,
      ref: 'Voucher',
    },

    /**
     * Ghi chú của khách hàng kèm theo đơn
     */
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // tự động tạo createdAt & updatedAt
  }
);

module.exports = mongoose.model('Order', orderSchema);
