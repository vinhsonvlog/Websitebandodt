import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetailPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getProductById } from '../../data/products';

const defaultImages = [
  'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_4__7.png',
];

const fallbackVersions = [
  { id: 0, label: '10CPU - 8GPU\n16GB - 256GB' },
  { id: 1, label: '10CPU - 10GPU\n16GB - 512GB' },
];

const fallbackColors = [
  { id: 0, name: 'Ánh sao', priceText: '23.990.000đ', img: 'https://via.placeholder.com/50x50/ededed/1d1d1f?text=A' },
  { id: 1, name: 'Đêm xanh', priceText: '23.990.000đ', img: 'https://via.placeholder.com/50x50/071e3e/ffffff?text=D' },
];

export default function ProductDetailPage({ session, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Lấy dữ liệu sản phẩm động dựa trên ID
  const product = useMemo(() => getProductById(id), [id]);
  
  const [activeImage, setActiveImage] = useState('');
  const [activeVersion, setActiveVersion] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  // Cập nhật lại state khi sản phẩm thay đổi
  useEffect(() => {
    if (product) {
      setActiveImage(product.images?.[0] || defaultImages[0]);
      setActiveVersion(0);
      setActiveColor(0);
    }
  }, [product]);

  const versions = product?.versions || fallbackVersions;
  const colors = product?.colors || fallbackColors;

  // Trường hợp không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="product-page">
        <Header session={session} onLogout={onLogout} />
        <main className="main-content container">
          <div className="product-card" style={{ textAlign: 'center', padding: '50px 0' }}>
            <h2>Sản phẩm không tìm thấy</h2>
            <p>Sản phẩm bạn chọn có thể đã bị xóa hoặc đường dẫn không hợp lệ.</p>
            <button type="button" className="btn-buy-now" onClick={() => navigate('/products')}>
              Quay lại danh sách sản phẩm
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-page">
      <Header session={session} onLogout={onLogout} />

      <div className="breadcrumb container">
        <span>Trang chủ</span> ❯ <span>{product.category}</span> ❯ <strong className="text-dark">{product.name}</strong>
      </div>

      <main className="main-content container">
        {/* CỘT TRÁI: Hình ảnh và Đặc điểm */}
        <div className="left-column">
          <div className="product-card">
            <div className="image-gallery">
              <div className="main-image">
                <img src={activeImage} alt={product.name} />
              </div>
              <div className="thumbnail-list">
                {(product.images || defaultImages).map((thumb, index) => (
                  <div
                    key={`${thumb}-${index}`}
                    className={`thumbnail ${activeImage === thumb ? 'active' : ''}`}
                    onClick={() => setActiveImage(thumb)}
                  >
                    <img src={thumb} alt={`${product.name} hình ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="product-card product-features">
            <h2>Đặc điểm nổi bật</h2>
            <p>{product.description}</p>
            <ul>
              {(product.features || []).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* CỘT PHẢI: Thông tin giá và lựa chọn */}
        <div className="right-column product-card">
          <h1 className="product-title">{product.name}</h1>

          <div className="rating-info">
            <span className="stars">{'⭐'.repeat(Math.round(product.rating))}</span>
            <span className="rating-text">{product.rating} ({product.reviewCount} đánh giá)</span>
          </div>

          <div className="price-box">
            <span className="current-price">{product.priceText}</span>
            {product.oldPriceText && <span className="old-price">{product.oldPriceText}</span>}
          </div>

          <div className="option-section">
            <h3 className="section-title">Phiên bản</h3>
            <div className="versions-grid">
              {versions.map((version) => (
                <button
                  key={version.id}
                  className={`version-btn ${activeVersion === version.id ? 'active' : ''}`}
                  onClick={() => setActiveVersion(version.id)}
                >
                  {version.label}
                </button>
              ))}
              <button className="custom-config-btn">Cấu hình tùy chỉnh</button>
            </div>
          </div>

          <div className="option-section">
            <h3 className="section-title">Màu sắc</h3>
            <div className="colors-grid">
              {colors.map((color) => (
                <button
                  key={color.id}
                  className={`color-btn ${activeColor === color.id ? 'active' : ''}`}
                  onClick={() => setActiveColor(color.id)}
                >
                  <img src={color.img} alt={color.name} className="color-img" />
                  <div className="color-info">
                    <span className="color-name">{color.name}</span>
                    <span className="color-price">{color.priceText}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button type="button" className="btn-buy-now">
              <strong>MUA NGAY</strong>
              <span>Giao hàng tận nơi hoặc nhận tại cửa hàng</span>
            </button>
            <button type="button" className="btn-add-cart" title="Thêm vào giỏ hàng">
              🛒
            </button>
          </div>
        </div>
      </main>

      {/* PHẦN ĐÁNH GIÁ */}
      <section className="reviews-section container">
        <div className="product-card">
          <h3 className="reviews-title">Đánh giá {product.name}</h3>

          <div className="reviews-content">
            <div className="reviews-summary">
              <div className="average-score">{product.rating}</div>
              <div className="average-stars">{'⭐'.repeat(Math.round(product.rating))}</div>
              <div className="star-bars">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="star-row">
                    <span className="star-num">{star} sao</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reviews-list">
              {[1, 2].map((item) => (
                <div key={item} className="review-card">
                  <div className="reviewer-info">
                    <div className="avatar">N</div>
                    <div>
                      <div className="reviewer-name">Nguyen Van A</div>
                      <div className="review-time">Đã mua hàng | 1 ngày trước</div>
                    </div>
                  </div>
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-text">
                    Sản phẩm cực kỳ mượt mà, màn hình hiển thị tuyệt vời. 
                    Pin trâu xài cả ngày không hết. Rất đáng tiền!
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="reviews-action">
            <button type="button" className="btn-view-more">Xem tất cả đánh giá ❯</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}