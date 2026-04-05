import React, { useState } from "react";
import "./ProductDetailPage.css";
import Header from "../../components/Header/Header"; // Điều chỉnh đường dẫn cho đúng thư mục của bạn
import Footer from "../../components/Footer/Footer"; // Điều chỉnh đường dẫn cho đúng thư mục của bạn

export default function ProductPage({ session, onLogout }) {
  const [activeImage, setActiveImage] = useState(
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_4__7.png",
  );
  const [activeVersion, setActiveVersion] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  const thumbnails = [
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_1__6_135.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_pro_14_inch_m4_chip_silver_pdp_image_position_2_vn_vi.jpg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_pro_14_inch_m4_chip_silver_pdp_image_position_3_vn_vi.jpg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_pro_14_inch_m4_chip_silver_pdp_image_position_4_vn_vi.jpg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_pro_14_inch_m4_chip_silver_pdp_image_position_6_vn_vi.jpg",
  ];

  const versions = [
    { id: 0, label: "10CPU - 8GPU\n16GB - 256GB" },
    { id: 1, label: "10CPU - 8GPU\n16GB - 256GB\nSạc 70W" },
    { id: 2, label: "10CPU - 10GPU\n16GB - 512GB" },
    { id: 3, label: "10CPU - 10GPU\n16GB - 512GB\nSạc 70W" },
    { id: 4, label: "10CPU - 10GPU\n24GB - 256GB" },
    { id: 5, label: "10CPU - 10GPU\n24GB - 512GB" },
    { id: 6, label: "10CPU - 10GPU\n24GB - 512GB\nSạc 70W" },
    { id: 7, label: "10CPU - 10GPU\n16GB - 1TB" },
    { id: 8, label: "10CPU - 10GPU\n16GB - 1TB\nSạc 70W" },
  ];

  const colors = [
    {
      id: 0,
      name: "Ánh sao",
      price: "23.990.000đ",
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_15__7_163.png",
    },
    {
      id: 1,
      name: "Đêm xanh thẳm",
      price: "23.990.000đ",
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_16__6_123.png",
    },
    {
      id: 2,
      name: "Bạc",
      price: "23.990.000đ",
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_14__8_17.png",
    },
    {
      id: 3,
      name: "Xanh da trời",
      price: "23.990.000đ",
      img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__7_16.png",
    },
  ];

  return (
    <div className="product-page">
      {/* HEADER */}
      <Header session={session} onLogout={onLogout} />

      {/* BREADCRUMB */}
      <div className="breadcrumb container">
        <span>Trang chủ</span> ❯ <span>Laptop</span> ❯ <span>Mac</span> ❯{" "}
        <span>Macbook M4</span> ❯{" "}
        <strong className="text-dark">
          MacBook Air M4 13 inch 2025 10CPU 8GPU 16GB 256GB | Chính hãng Apple
          Việt Nam
        </strong>
      </div>

      {/* MAIN CONTENT */}
      <main className="main-content container">
        {/* CỘT TRÁI */}
        <div className="left-column">
          <div className="product-card">
            <div className="image-gallery">
              <div className="main-image">
                <img src={activeImage} alt="MacBook Air M4" />
              </div>
              <div className="thumbnail-list">
                {thumbnails.map((thumb, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${activeImage === thumb ? "active" : ""}`}
                    onClick={() => setActiveImage(thumb)}
                  >
                    <img src={thumb} alt={`Thumb ${index}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="product-card product-features">
            <h2>Đặc điểm nổi bật</h2>
            <p>
              MacBook Air M4 13 inch 2025 10CPU 8GPU 16GB 256GB với cấu hình
              được xây dựng quanh chip Apple M4 thế hệ mới nhất, mang đến{" "}
              <strong>hiệu năng ấn tượng</strong>. Với 10 nhân CPU, chiếc
              MacBook Air M4 này cung cấp khả năng xử lý đa tác vụ nhanh chóng,
              mượt mà, từ công việc văn phòng, học tập đến duyệt web hay các ứng
              dụng sáng tạo. 8 nhân GPU tích hợp đảm bảo hiệu suất đồ họa tốt,
              đủ sức mạnh cho việc chỉnh sửa ảnh, biên tập video cơ bản và trải
              nghiệm giải trí sống động.
            </p>
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="right-column product-card">
          <h1 className="product-title">
            MacBook Air M4 13 inch 2025 10CPU 8GPU 16GB 256GB | Chính hãng Apple
            Việt Nam
          </h1>

          <div className="rating-info">
            <span className="stars">⭐⭐⭐⭐⭐</span>
            <span className="rating-text">4.9 (16 đánh giá)</span>
          </div>

          <div className="price-box">
            <span className="current-price">23.490.000đ</span>
            <span className="old-price">26.990.000đ</span>
          </div>

          <div className="option-section">
            <h3 className="section-title">Phiên bản</h3>
            <div className="versions-grid">
              {versions.map((v) => (
                <button
                  key={v.id}
                  className={`version-btn ${activeVersion === v.id ? "active" : ""}`}
                  onClick={() => setActiveVersion(v.id)}
                >
                  {v.label}
                </button>
              ))}
              <button className="custom-config-btn">Cấu hình tùy chỉnh</button>
            </div>
          </div>

          <div className="option-section">
            <h3 className="section-title">Màu sắc</h3>
            <div className="colors-grid">
              {colors.map((c) => (
                <button
                  key={c.id}
                  className={`color-btn ${activeColor === c.id ? "active" : ""}`}
                  onClick={() => setActiveColor(c.id)}
                >
                  <img src={c.img} alt={c.name} className="color-img" />
                  <div className="color-info">
                    <span className="color-name">{c.name}</span>
                    <span className="color-price">{c.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-buy-now">
              <strong>MUA NGAY</strong>
              <span>Giao hàng tận nơi hoặc nhận tại cửa hàng</span>
            </button>
            <button className="btn-add-cart" title="Thêm vào giỏ hàng">
              🛒
            </button>
          </div>
        </div>
      </main>

      {/* ĐÁNH GIÁ (REVIEWS) */}
      <section className="reviews-section container">
        <div className="product-card">
          <h3 className="reviews-title">
            Đánh giá MacBook Air M4 13 inch 2025
          </h3>

          <div className="reviews-content">
            {/* Cột trái */}
            <div className="reviews-summary">
              <div className="average-score">4.9</div>
              <div className="average-stars">⭐⭐⭐⭐⭐</div>
              <div className="star-bars">
                {[5, 4, 3, 2, 1].map((star, index) => (
                  <div key={index} className="star-row">
                    <span className="star-num">{star} sao</span>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: star === 5 ? "90%" : star === 4 ? "10%" : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột phải */}
            <div className="reviews-list">
              {[1, 2].map((item) => (
                <div key={item} className="review-card">
                  <div className="reviewer-info">
                    <div className="avatar">N</div>
                    <div>
                      <div className="reviewer-name">Nguyen Van A</div>
                      <div className="review-time">
                        Đã mua hàng | 1 ngày trước
                      </div>
                    </div>
                  </div>
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">
                    Máy cực kỳ mượt mà, màn hình hiển thị tuyệt vời. Pin trâu
                    xài cả ngày không hết. Giao hàng cực kỳ nhanh chóng! Rất
                    đáng tiền.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="reviews-action">
            <button className="btn-view-more">Xem tất cả đánh giá ❯</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
