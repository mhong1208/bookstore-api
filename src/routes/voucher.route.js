const express = require('express');
const router = express.Router();
const {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher,
} = require('../controllers/voucher.controller');
const { protect, admin } = require('./auth.middleware');

// Áp dụng middleware cho tất cả các route trong file này
router.use(protect, admin);

router.route('/').post(createVoucher).get(getAllVouchers);
router.route('/:id').get(getVoucherById).put(updateVoucher).delete(deleteVoucher);

module.exports = router;