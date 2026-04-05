import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const categories = ['Laptop', 'Tablet', 'Điện thoại', 'Âm thanh', 'Phụ kiện'];

export default function Header() {
  const [query, setQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/products');
    }
    setShowCategories(false);
  };

  const openCategory = (category) => {
    setShowCategories(false);
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <header className="topbar">
      <div className="topbar-content container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          TECH<span>STORE</span>
        </Link>

        <div className="category-wrapper">
          <button
            type="button"
            className="btn-category"
            onClick={() => setShowCategories((current) => !current)}
            aria-expanded={showCategories}
          >
            <span className="icon">☰</span> Danh mục
          </button>
          {showCategories && (
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="category-item"
                  onClick={() => openCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm kiếm sản phẩm giá tốt..."
            aria-label="Tìm kiếm sản phẩm"
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        <div className="actions">
          <Link to="/products" className="btn btn-products">
            <span className="icon">📱</span> Sản phẩm
          </Link>
          <button className="btn btn-cart" type="button">
            <span className="icon">🛒</span> Giỏ hàng
          </button>
          <button className="btn btn-login" type="button">
            Đăng nhập
          </button>
        </div>
      </div>
    </header>
  );
}
