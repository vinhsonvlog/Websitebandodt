const express = require('express');
const cors = require('cors');

// IMPORT CÁC ROUTES
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // MỚI: Thêm route sản phẩm
// const userRoutes = require('./routes/userRoutes'); // MỚI: (Bỏ comment khi bạn tạo file này)

const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// KIỂM TRA TRẠNG THÁI SERVER
app.get('/api/health', (req, res) => {
  return res.status(200).json({ success: true, data: { status: 'ok' } });
});

// ĐỊNH NGHĨA CÁC ĐƯỜNG DẪN API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // MỚI: Kết nối cổng API sản phẩm
// app.use('/api/users', userRoutes);    // MỚI: Kết nối cổng API người dùng

// XỬ LÝ LỖI (Luôn đặt ở cuối cùng)
app.use(errorHandler);

module.exports = app;