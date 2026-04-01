import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar-content container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          TECH<span>STORE</span>
        </Link>
        <button className="btn-category">
          <span className="icon">☰</span> Danh mục
        </button>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm giá tốt..." 
          />
          <button className="search-btn">🔍</button>
        </div>
        
        <div className="actions">
          <Link to="/products" className="btn btn-products">
            <span className="icon">📱</span> Sản phẩm
          </Link>
          <button className="btn btn-cart">
            <span className="icon">🛒</span> Giỏ hàng
          </button>
          <button className="btn btn-login">Đăng nhập</button>
        </div>
      </div>
    </header>
  );
}
