const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Order Schema – Lưu thông tin đơn hàng của người dùng
 */
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
      },
    ],

    shippingAddress: { type: String, required: true },

    paymentMethod: {
      type: String,
      required: true,
    },

    shippingMethod: {
      type: String,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
      default: 0.0,
    },

    discountAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    paidAt: {
      type: Date,
    },


    status: {
      type: String,
      required: true,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
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
