import './HomePage.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { products } from '../../data/products'; // Lấy dữ liệu từ develop

// Lọc sản phẩm nổi bật từ data (develop)
const bestSellingProducts = products.filter((product) => product.featured).slice(0, 4);

const bannerImages = [
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/samsung-galaxy-a37-home.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/690x300_ROI_MacBookNeo.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/oppofingn6.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/690x300_open_iPhone%2017e.png",
];

export default function HomePage({ session, onLogout }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  const nextBanner = () =>
    setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  const prevBanner = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + bannerImages.length) % bannerImages.length,
    );

  useEffect(() => {
    const interval = setInterval(nextBanner, 5000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };

  const addToCart = (product) => {
    const savedCart = JSON.parse(window.localStorage.getItem('shop_cart') || '[]');
    const nextCart = [...savedCart];
    const existingItem = nextCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      nextCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.image,
        quantity: 1,
      });
    }

    window.localStorage.setItem('shop_cart', JSON.stringify(nextCart));
    showToast(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  const buyNow = (product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="home">
      {/* Truyền session và onLogout để Header hiển thị đúng trạng thái user */}
      <Header session={session} onLogout={onLogout} />
      
      {toast && <div className="toast-message">{toast}</div>}

      <main className="container">
        {/* HERO BANNER */}
        <section className="hero-section">
          <div className="slider">
            {bannerImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Banner ${index}`}
                className={`banner-img ${index === currentIndex ? "active" : ""}`}
              />
            ))}
            <button className="nav-btn prev" onClick={prevBanner}>
              ‹
            </button>
            <button className="nav-btn next" onClick={nextBanner}>
              ›
            </button>
            <div className="dots">
              {bannerImages.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(i)}
                ></span>
              ))}
            </div>
          </div>
        </section>

        {/* SELLING POINTS */}
        <section className="selling-points">
          <div className="point">
            <span className="point-icon">✨</span>
            <div className="point-text">Giá chỉ từ 99k</div>
          </div>
          <div className="point">
            <span className="point-icon">🔄</span>
            <div className="point-text">Lên đời trợ giá 2tr</div>
          </div>
          <div className="point">
            <span className="point-icon">💳</span>
            <div className="point-text">Trả góp 0% lãi suất</div>
          </div>
          <div className="point">
            <span className="point-icon">🎁</span>
            <div className="point-text">Bạn mới giảm thêm 5%</div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="product-section">
          <div className="section-header">
            <h2>Sản phẩm bán chạy</h2>
            <Link to="/products" className="view-all">
              Xem tất cả ❯
            </Link>
          </div>
          <div className="product-grid">
            {bestSellingProducts.map((product) => (
              <div key={product.id} className="product-card">
                {/* Click vào ảnh hoặc tên để xem chi tiết */}
                <Link to={`/products/${product.id}`} className="product-link">
                  <div className="img-box">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                  </div>
                </Link>

                <div className="product-info">
                  <p className="price">{product.priceText}</p>
                  
                  {/* Nhóm các nút hành động (vinhson UI) */}
                  <div className="product-actions">
                    <button 
                      type="button" 
                      className="buy-now" 
                      onClick={() => buyNow(product)}
                    >
                      Mua ngay
                    </button>
                    <button
                      type="button"
                      className="add-to-cart"
                      title="Thêm vào giỏ hàng"
                      onClick={() => addToCart(product)}
                    >
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}