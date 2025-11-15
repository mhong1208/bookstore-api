const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders } = require('../controllers/order.controller');
const { protect } = require('../middleware/auth.middleware');

router.route('/').post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);

module.exports = router;