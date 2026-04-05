import { useState, useEffect } from 'react';
import './ProductCarousel.css';

const getProductImage = (productId) => {
  const imageMap = {
    2: '/images/products/iphone-15-pro.jpg',
    3: '/images/products/samsung-s24.jpg',
    11: '/images/products/macbook-air-m2.jpg',
    8: '/images/products/samsung-s23-ultra.jpg',
  };
  return imageMap[productId] || '/images/products/placeholder.jpg';
};

const featuredProducts = [
  {
    id: 2,
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: '23.990.000đ',
    image: getProductImage(2),
    badge: 'Mới',
  },
  {
    id: 3,
    name: 'Samsung S24',
    brand: 'Samsung',
    price: '19.990.000đ',
    image: getProductImage(3),
    badge: 'Hot',
  },
  {
    id: 11,
    name: 'MacBook Air M2',
    brand: 'Apple',
    price: '35.000.000đ',
    image: getProductImage(11),
    badge: 'Deal',
  },
  {
    id: 8,
    name: 'Samsung S23 Ultra',
    brand: 'Samsung',
    price: '28.000.000đ',
    image: getProductImage(8),
    badge: 'Sale',
  },
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="product-carousel">
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            >
              <img src={product.image} alt={product.name} />
              <div className="carousel-overlay">
                <div className="carousel-content">
                  <span className="carousel-badge">{product.badge}</span>
                  <h2 className="carousel-title">{product.name}</h2>
                  <p className="carousel-brand">{product.brand}</p>
                  <p className="carousel-price">{product.price}</p>
                  <button className="carousel-btn">Xem chi tiết</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control prev" onClick={handlePrev}>
          ‹
        </button>
        <button className="carousel-control next" onClick={handleNext}>
          ›
        </button>

        <div className="carousel-dots">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
