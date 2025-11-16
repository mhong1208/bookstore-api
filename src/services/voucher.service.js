const Voucher = require('../models/voucher.model');

const create = async (voucherData) => {
  const voucher = new Voucher(voucherData);
  return await voucher.save();
};

const getAll = async (page = 1, pageSize = 10, options = {}) => {
  const skip = (page - 1) * pageSize;
  const query = {};

  // if (options.status !== 'all') {
  //   query.isActive = true;
  // }

  const total = await Voucher.countDocuments(query);
  const vouchers = await Voucher.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  return {
    data: vouchers,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    totalItems: total,
  };
};

const getById = async (id) => {
  return await Voucher.findById(id);
};

const update = async (id, updateData) => {
  return await Voucher.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteById = async (id) => {
  // Chuyển sang soft delete
  return await Voucher.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

const findByCode = async (code) => {
  return await Voucher.findOne({
    code: code,
    isActive: true,
    expiresAt: { $gt: new Date() },
  });
};


const apply = async (code, orderAmount) => {
  const voucher = await Voucher.findOne({
    code: code,
    isActive: true,
    expiresAt: { $gt: new Date() },
  });

  if (!voucher) {
    throw new Error('Voucher không tồn tại, đã hết hạn hoặc đã bị vô hiệu hóa.');
  }

  if (voucher.maxUsage !== null && voucher.timesUsed >= voucher.maxUsage) {
    throw new Error('Voucher đã hết lượt sử dụng.');
  }

  if (orderAmount < voucher.minOrderAmount) {
    throw new Error(`Giá trị đơn hàng tối thiểu để sử dụng voucher này là ${voucher.minOrderAmount}.`);
  }

  let discountAmount = 0;
  if (voucher.discountType === 'fixed') {
    discountAmount = voucher.discountValue;
  } else {
    discountAmount = (orderAmount * voucher.discountValue) / 100;
  }

  const finalPrice = Math.max(0, orderAmount - discountAmount);

  return {
    message: 'Áp dụng voucher thành công!',
    discountAmount,
    finalPrice,
    voucherCode: voucher.code,
  };
};

module.exports = { create, getAll, getById, update, deleteById, findByCode, apply };