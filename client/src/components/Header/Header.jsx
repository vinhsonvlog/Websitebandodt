import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Danh sách danh mục từ nhánh develop
const categories = ["Laptop", "Tablet", "Điện thoại", "Âm thanh", "Phụ kiện"];

export default function Header({ session, onLogout }) {
  const navigate = useNavigate();

  // State từ nhánh vinhson (User menu)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // State từ nhánh develop (Search & Categories)
  const [query, setQuery] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const email = session?.user?.email || "";
  const avatarText = (email.charAt(0) || "U").toUpperCase();

  // Logic đóng menu khi click ra ngoài (vinhson)
  useEffect(() => {
    if (!isMenuOpen) return;

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

  // Logic tìm kiếm (develop)
  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/products");
    }
    setShowCategories(false);
  };

  // Logic chọn danh mục (develop)
  const openCategory = (category) => {
    setShowCategories(false);
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  // Logic đăng xuất (vinhson)
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

        {/* PHẦN DANH MỤC (Cập nhật từ develop) */}
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

        {/* PHẦN TÌM KIẾM (Cập nhật từ develop) */}
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

          <Link to="/support" className="btn btn-products">
            <span className="icon">💬</span> Hỗ trợ
          </Link>

          <button
            className="btn btn-cart"
            type="button"
            onClick={() => navigate("/cart")}
          >
            <span className="icon">🛒</span> Giỏ hàng
          </button>

          {/* PHẦN USER/LOGIN (Cập nhật từ vinhson) */}
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

              {isMenuOpen && (
                <div className="avatar-dropdown" role="menu">
                  <div className="avatar-email">{email}</div>
                  <Link
                    to="/profile"
                    className="avatar-dropdown-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Hồ sơ
                  </Link>
                  <Link
                    to="/orders"
                    className="avatar-dropdown-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đơn hàng của tôi
                  </Link>
                  <button
                    type="button"
                    className="avatar-dropdown-item"
                    onClick={handleLogoutClick}
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
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
