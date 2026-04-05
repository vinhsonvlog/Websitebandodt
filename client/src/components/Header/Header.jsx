import React from "react";
import { Link } from "react-router-dom";

export default function Header({ session }) {
  const email = session?.user?.email || "";
  const avatarText = (email.charAt(0) || "U").toUpperCase();

  return (
    <header className="topbar">
      <div className="topbar-content container">
        <Link
          to="/"
          className="logo"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          TECH<span>STORE</span>
        </Link>
        <button className="btn-category">
          <span className="icon">☰</span> Danh mục
        </button>

        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm sản phẩm giá tốt..." />
          <button className="search-btn">🔍</button>
        </div>

        <div className="actions">
          <Link to="/products" className="btn btn-products">
            <span className="icon">📱</span> Sản phẩm
          </Link>
          <button className="btn btn-cart">
            <span className="icon">🛒</span> Giỏ hàng
          </button>
          {email ? (
            <Link
              to="/profile"
              className="avatar-link"
              title={email}
              aria-label="Tài khoản"
            >
              <span className="avatar-circle">{avatarText}</span>
            </Link>
          ) : (
            <Link to="/login" className="btn btn-login">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
