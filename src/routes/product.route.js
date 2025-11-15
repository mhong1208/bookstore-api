const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require('../controllers/product.controller');

router.route('/').post(createProduct).get(getAllProducts);
router.route('/:id').get(getProductById);
// Thêm .put(updateProduct).delete(deleteProduct) khi hoàn thiện

module.exports = router;