const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voucherSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'Voucher code is required.'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: [true, 'Discount type is required.'],
    },
    discountValue: {
      type: Number,
      required: [true, 'Discount value is required.'],
    },
    minOrderAmount: {
      type: Number,
      default: 0, // Áp dụng cho mọi đơn hàng nếu không có giá trị tối thiểu
    },
    expiresAt: {
      type: Date,
      required: [true, 'Expiration date is required.'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    maxUsage: {
      type: Number, // Số lần sử dụng tối đa
    },
    timesUsed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Voucher', voucherSchema);