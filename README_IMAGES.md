# 📸 Hướng dẫn Thiết lập Hình ảnh Sản phẩm

Tất cả code đã được cập nhật để sử dụng hình ảnh **local** từ thư mục `/public/images/products/` thay vì URL CDN.

## 🚀 Các bước thực hiện

### 1️⃣ Tạo thư mục và cấu trúc

✅ **Đã thực hiện:**
- Thư mục `client/public/images/products/` đã tạo
- File `HUONG_DAN.md` có danh sách tên tệp cần thiết

### 2️⃣ Tải hình ảnh

Tùy chọn:

**A. Từ Cellphones.com.vn** (đề nghị)
- Truy cập: https://cellphones.com.vn
- Tìm sản phẩm → Chuột phải ảnh → "Save image as"
- Đặt tên theo danh sách

**B. Từ các trang ảnh miễn phí:**
- Unsplash.com
- Pexels.com
- Pixabay.com

### 3️⃣ Copy ảnh vào thư mục

```
D:\Websitebandodt\client\public\images\products\
├── iphone-xs-max.jpg
├── iphone-15-pro.jpg
├── samsung-s24.jpg
├── samsung-a35.jpg
├── laptop-sony.jpg
├── laptop-dell.jpg
├── iphone-15.jpg
├── samsung-s23-ultra.jpg
├── ipad-air.jpg
├── google-pixel-8.jpg
├── macbook-air-m2.jpg
├── samsung-fold-5.jpg
├── iphone-14-pro-max.jpg
├── samsung-a54.jpg
├── oneplus-12.jpg
├── asus-vivobook.jpg
├── iphone-13-mini.jpg
├── samsung-z-flip.jpg
├── google-pixel-tablet.jpg
├── sony-xperia-1.jpg
├── nothing-phone.jpg
└── placeholder.jpg (ảnh lỗi - tùy chọn)
```

### 4️⃣ Chạy dự án

```bash
cd client
npm start
```

## 📍 File đã cập nhật

| File | Cập nhật |
|------|----------|
| `ProductPage.js` | ✅ Thêm hàm `getProductImage()` |
| `ComparisonPage.js` | ✅ Thêm hàm `getProductImage()` |
| `ProductCarousel.js` | ✅ Thêm hàm `getProductImage()` |
| `public/images/products/README.md` | ✅ Tạo mới |
| `public/images/HUONG_DAN.md` | ✅ Tạo mới |

## ✨ Kết quả

Sau khi thêm ảnh, tất cả giao diện sẽ hiển thị ảnh từ thư mục local:
- ✅ Trang danh mục (`/products`)
- ✅ Carousel (banner)
- ✅ Trang so sánh (`/comparison`)
- ✅ Thẻ sản phẩm

## 🆘 Gặp vấn đề?

**Ảnh không hiển thị?**
1. Kiểm tra tên tệp (phân biệt chữ hoa/thường)
2. Kiểm tra đường dẫn: `client/public/images/products/`
3. Kiểm tra server đang chạy: `npm start`
4. F5 làm mới trình duyệt
5. Xóa cache (Ctrl + Shift + Delete)

**File không tìm thấy?**
- Nhấn F12 → Console → Kiểm tra lỗi network
- Đảm bảo tên tệp khớp chính xác

---

**💡 Mẹo:** Bạn có thể sử dụng placeholder CDN tạm thời (giữ nguyên URLs cũ) trong khi chờ tải ảnh thực.
