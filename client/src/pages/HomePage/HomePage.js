import './HomePage.css';
import { useState, useEffect } from 'react';

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
      <header className="topbar">
        <div className="topbar-content container">
          <div className="logo">TECH<span>STORE</span></div>
          <button className="btn-category">
            <span className="icon">☰</span> Danh mục
          </button>
          
          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm sản phẩm giá tốt..." />
            <button className="search-btn">🔍</button>
          </div>
          
          <div className="actions">
            <button className="btn btn-cart">
              <span className="icon">🛒</span> Giỏ hàng
            </button>
            <button className="btn btn-login">Đăng nhập</button>
          </div>
        </div>
      </header>

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
            <button className="view-all">Xem tất cả ❯</button>
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
      <footer className="footer">
        <div className="container footer-grid">
          {/* Cột 1 */}
          <div className="footer-col">
            <h4>Tổng đài hỗ trợ miễn phí</h4>
            <ul>
              <li>Mua hàng - bảo hành 1234.5678 <br/>(7h30 - 22h00)</li>
              <li>Khiếu nại <a href="#">1234.5678</a> <br/>(8h00 - 21h30)</li>
            </ul>
            <h4 className="mt-4">Phương thức thanh toán</h4>
            <div className="payment-methods">
              <div className="pay-tag">Apple Pay</div>
              <div className="pay-tag text-blue">VNPAY</div>
              <div className="pay-tag text-pink">MoMo</div>
              <div className="pay-tag text-blue-light">OnePay</div>
              <div className="pay-tag text-green">ZaloPay</div>
              <div className="pay-tag text-yellow">AlePay</div>
              <div className="pay-tag text-orange">Kredivo</div>
              <div className="pay-tag text-red">mPOS</div>
            </div>
          </div>

          {/* Cột 2 */}
          <div className="footer-col">
            <h4>Thông tin về chính sách</h4>
            <ul>
              <li><a href="#">Mua hàng và thanh toán Online</a></li>
              <li><a href="#">Mua hàng trả góp Online</a></li>
              <li><a href="#">Mua hàng trả góp bằng thẻ tín dụng</a></li>
              <li><a href="#">Chính sách giao hàng</a></li>
              <li><a href="#">Chính sách đổi trả</a></li>
              <li><a href="#">Tra thông tin bảo hành</a></li>
              <li><a href="#">Tra cứu hoá đơn điện tử</a></li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div className="footer-col">
            <h4>Về chúng tôi</h4>
            <ul>
              <li><a href="#">Giới thiệu về công ty</a></li>
              <li><a href="#">Quy chế hoạt động</a></li>
              <li><a href="#">Dự án Doanh nghiệp</a></li>
              <li><a href="#">Tin tức khuyến mại</a></li>
              <li><a href="#">Giới thiệu máy đổi trả</a></li>
              <li><a href="#">Đại lý uỷ quyền của Apple</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 TechStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}