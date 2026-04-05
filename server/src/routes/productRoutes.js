const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Đường dẫn lấy danh sách sản phẩm: GET /api/products
router.get('/', productController.getAllProducts);

// Đường dẫn thêm sản phẩm mới: POST /api/products
router.post('/', productController.createProduct);

module.exports = router;