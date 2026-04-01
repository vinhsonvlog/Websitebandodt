import './HomePage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header'; // Điều chỉnh đường dẫn cho đúng thư mục của bạn
import Footer from '../../components/Footer/Footer'; // Điều chỉnh đường dẫn cho đúng thư mục của bạn

const bestSellingProducts = [
  { name: 'Laptop ASUS Vivobook 15 X1502VA', price: '15.190.000đ', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_901.png' },
  { name: 'iPad A16 Wifi 128GB 2025', price: '9.110.500đ', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-a16-11-inch_10_.jpg' },
  { name: 'iPhone 17 Pro Max 256GB', price: '37.690.000đ', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-17-pro-max_3.jpg' },
  { name: 'Tai nghe Apple AirPods 4', price: '3.433.000đ', img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-4-chong-on-chu-dong-thumb.png' },
];

const bannerImages = [
  'https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/samsung-galaxy-a37-home.png',
  'https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/690x300_ROI_MacBookNeo.png',
  'https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/oppofingn6.png',
  'https://cdn2.cellphones.com.vn/insecure/rs:fill:1036:450/q:100/plain/https://dashboard.cellphones.com.vn/storage/690x300_open_iPhone%2017e.png',
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBanner = () => setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
  const prevBanner = () => setCurrentIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);

  useEffect(() => {
    const interval = setInterval(nextBanner, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      {/* HEADER */}
      <Header />

      <main className="container">
        {/* HERO BANNER */}
        <section className="hero-section">
          <div className="slider">
            {bannerImages.map((img, index) => (
               <img 
                 key={index}
                 src={img} 
                 alt={`Banner ${index}`} 
                 className={`banner-img ${index === currentIndex ? 'active' : ''}`} 
               />
            ))}
            <button className="nav-btn prev" onClick={prevBanner}>‹</button>
            <button className="nav-btn next" onClick={nextBanner}>›</button>
            <div className="dots">
              {bannerImages.map((_, i) => (
                <span key={i} className={`dot ${i === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(i)}></span>
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
            <Link to="/products" className="view-all">Xem tất cả ❯</Link>
          </div>
          <div className="product-grid">
            {bestSellingProducts.map((p, i) => (
              <div key={i} className="product-card">
                <div className="img-box"><img src={p.img} alt={p.name} /></div>
                <div className="product-info">
                  <h3>{p.name}</h3>
                  <p className="price">{p.price}</p>
                  
                  {/* Thay đổi ở đây: Bọc 2 nút vào div.product-actions */}
                  <div className="product-actions">
                    <button className="buy-now">Mua ngay</button>
                    <button className="add-to-cart" title="Thêm vào giỏ hàng">
                      🛒
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}