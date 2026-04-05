import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ session, onLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const email = session?.user?.email || "";
  const avatarText = (email.charAt(0) || "U").toUpperCase();

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    onLogout?.();
    navigate("/");
  };

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
            <div className="avatar-menu" ref={menuRef}>
              <button
                type="button"
                className="avatar-link"
                title={email}
                aria-label="Tài khoản"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <span className="avatar-circle">{avatarText}</span>
              </button>

              {isMenuOpen ? (
                <div className="avatar-dropdown" role="menu">
                  <div className="avatar-email">{email}</div>
                  <Link
                    to="/profile"
                    className="avatar-dropdown-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Hồ sơ
                  </Link>
                  <button
                    type="button"
                    className="avatar-dropdown-item"
                    onClick={handleLogoutClick}
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : null}
            </div>
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
