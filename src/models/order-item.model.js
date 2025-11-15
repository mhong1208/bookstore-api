const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.'],
    },
    price: {
      type: Number,
      required: true, // giá tại lúc mua hàng
    },
    notes: {
      type: String, // Ghi chú cho sản phẩm này
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
