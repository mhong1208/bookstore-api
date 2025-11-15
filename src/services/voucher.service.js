const Voucher = require('../models/voucher.model');

const create = async (voucherData) => {
  const voucher = new Voucher(voucherData);
  return await voucher.save();
};

const getAll = async () => {
  return await Voucher.find({});
};

const getById = async (id) => {
  return await Voucher.findById(id);
};

const update = async (id, updateData) => {
  return await Voucher.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteById = async (id) => {
  return await Voucher.findByIdAndDelete(id);
};

const findByCode = async (code) => {
  return await Voucher.findOne({
    code: code,
    isActive: true,
    expiresAt: { $gt: new Date() },
  });
};

module.exports = { create, getAll, getById, update, deleteById, findByCode };