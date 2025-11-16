const express = require('express');
const router = express.Router();
const {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
  applyVoucher,
} = require('../controllers/voucher.controller');
const { protect, admin } = require('./auth.middleware');

// Chỉ admin mới có thể tạo, cập nhật, xóa voucher
router.route('/')
  .post(protect, admin, createVoucher)
  .get(protect, getAllVouchers); 

router.route('/:id')
  .get(protect, getVoucherById)
  .put(protect, admin, updateVoucher)
  .delete(protect, admin, deleteVoucher);

router.route('/apply')
  .post(protect, applyVoucher);

module.exports = router;
