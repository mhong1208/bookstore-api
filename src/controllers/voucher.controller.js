const voucherService = require('../services/voucher.service');

/**
 * @desc    Tạo voucher mới
 * @route   POST /api/vouchers
 * @access  Private/Admin
 */
const createVoucher = async (req, res) => {
  try {
    const savedVoucher = await voucherService.create(req.body);
    res.status(201).json(savedVoucher);
  } catch (error) {
    res.status(400).json({ message: 'Không thể tạo voucher', error: error.message });
  }
};

/**
 * @desc    Lấy tất cả voucher
 * @route   GET /api/vouchers
 * @access  Private/Admin
 */
const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await voucherService.getAll();
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

/**
 * @desc    Lấy voucher theo ID
 * @route   GET /api/vouchers/:id
 * @access  Private/Admin
 */
const getVoucherById = async (req, res) => {
  try {
    const voucher = await voucherService.getById(req.params.id);
    if (!voucher) {
      return res.status(404).json({ message: 'Không tìm thấy voucher' });
    }
    res.json(voucher);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

/**
 * @desc    Cập nhật voucher
 * @route   PUT /api/vouchers/:id
 * @access  Private/Admin
 */
const updateVoucher = async (req, res) => {
  try {
    const voucher = await voucherService.update(req.params.id, req.body);
    if (!voucher) {
      return res.status(404).json({ message: 'Không tìm thấy voucher' });
    }
    res.json(voucher);
  } catch (error) {
    res.status(400).json({ message: 'Không thể cập nhật voucher', error: error.message });
  }
};

/**
 * @desc    Xóa voucher
 * @route   DELETE /api/vouchers/:id
 * @access  Private/Admin
 */
const deleteVoucher = async (req, res) => {
  try {
    const voucher = await voucherService.deleteById(req.params.id);
    if (!voucher) {
      return res.status(404).json({ message: 'Không tìm thấy voucher' });
    }
    res.json({ message: 'Voucher đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
};

module.exports = { createVoucher, getAllVouchers, getVoucherById, updateVoucher, deleteVoucher };