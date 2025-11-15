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

module.exports = { create, getAll, getById, update, deleteById, findByCode };