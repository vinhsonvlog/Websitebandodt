import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const products = [
  {
    id: 1,
    name: "iPhone XS Max",
    brand: "Apple",
    ram: "16GB",
    price: 1000,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_xs_max_2_1.jpg",
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    brand: "Apple",
    ram: "32GB",
    price: 2000,
    rating: 5,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_15_pro_select_purple_1.jpg",
  },
  {
    id: 3,
    name: "Samsung S24",
    brand: "Samsung",
    ram: "16GB",
    price: 2400,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_s24_blue.jpg",
  },
  {
    id: 4,
    name: "Samsung A35",
    brand: "Samsung",
    ram: "8GB",
    price: 700,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_galaxy_a35.jpg",
  },
  {
    id: 5,
    name: "Laptop Sony",
    brand: "Sony",
    ram: "128GB",
    price: 2200,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop_sony.jpg",
  },
  {
    id: 6,
    name: "Laptop Dell",
    brand: "Dell",
    ram: "256GB",
    price: 3000,
    rating: 5,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop_dell.jpg",
  },
  {
    id: 7,
    name: "iPhone 15",
    brand: "Apple",
    ram: "16GB",
    price: 1500,
    rating: 5,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_15_select_black_1.jpg",
  },
  {
    id: 8,
    name: "Samsung S23 Ultra",
    brand: "Samsung",
    ram: "32GB",
    price: 2800,
    rating: 5,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_s23_ultra.jpg",
  },
  {
    id: 9,
    name: "iPad Air",
    brand: "Apple",
    ram: "8GB",
    price: 1200,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad_air.jpg",
  },
  {
    id: 10,
    name: "Google Pixel 8",
    brand: "Google",
    ram: "12GB",
    price: 1750,
    rating: 5,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google_pixel_8.jpg",
  },
  {
    id: 11,
    name: "MacBook Air M2",
    brand: "Apple",
    ram: "256GB",
    price: 3500,
    rating: 5,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_air_m2.jpg",
  },
  {
    id: 12,
    name: "Samsung Fold 5",
    brand: "Samsung",
    ram: "12GB",
    price: 4000,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_fold_5.jpg",
  },
  {
    id: 13,
    name: "iPhone 14 Pro Max",
    brand: "Apple",
    ram: "16GB",
    price: 1800,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_14_pro_max.jpg",
  },
  {
    id: 14,
    name: "Samsung Galaxy A54",
    brand: "Samsung",
    ram: "8GB",
    price: 900,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_a54.jpg",
  },
  {
    id: 15,
    name: "OnePlus 12",
    brand: "OnePlus",
    ram: "16GB",
    price: 1600,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/o/n/oneplus_12.jpg",
  },
  {
    id: 16,
    name: "Laptop ASUS VivoBook",
    brand: "ASUS",
    ram: "512GB",
    price: 2500,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/s/asus_vivobook.jpg",
  },
  {
    id: 17,
    name: "iPhone 13 Mini",
    brand: "Apple",
    ram: "16GB",
    price: 1100,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone_13_mini.jpg",
  },
  {
    id: 18,
    name: "Samsung Galaxy Z Flip",
    brand: "Samsung",
    ram: "8GB",
    price: 2300,
    rating: 5,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung_z_flip.jpg",
  },
  {
    id: 19,
    name: "Google Pixel Tablet",
    brand: "Google",
    ram: "8GB",
    price: 1400,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/o/google_pixel_tablet.jpg",
  },
  {
    id: 20,
    name: "Sony Xperia 1",
    brand: "Sony",
    ram: "12GB",
    price: 2100,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/o/sony_xperia_1.jpg",
  },
  {
    id: 21,
    name: "Nothing Phone",
    brand: "Nothing",
    ram: "16GB",
    price: 800,
    rating: 4,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:400:400/q:90/plain/https://cellphones.com.vn/media/catalog/product/n/o/nothing_phone.jpg",
  },
];

const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "Dell",
  "Google",
  "ASUS",
  "OnePlus",
  "Nothing",
];
const ramOptions = ["8GB", "12GB", "16GB", "32GB", "128GB", "256GB", "512GB"];
const ratingOptions = [3, 4, 5];

export default function ProductPage({ session, onLogout }) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRams, setSelectedRams] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [compareIds, setCompareIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const toggleFilter = (value, currentValues, setValues) => {
    setValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesRam =
        selectedRams.length === 0 || selectedRams.includes(product.ram);
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.includes(product.rating);
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesBrand && matchesRam && matchesRating && matchesPrice;
    });
  }, [selectedBrands, selectedRams, selectedRatings, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, selectedRams, selectedRatings, priceRange]);

  const handleCompareToggle = (productId) => {
    setCompareIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleGoToComparison = () => {
    if (compareIds.length >= 2) {
      const ids = compareIds.join(",");
      window.location.href = `/comparison?ids=${ids}`;
    }
  };

  return (
    <div className="product-category-page">
      <Header session={session} onLogout={onLogout} />
      <main className="category-layout container">
        <aside className="sidebar">
          <div className="sidebar-card">
            <h2>Bộ Lọc Tìm Kiếm</h2>
            <div className="filter-section">
              <div className="filter-title">Khoảng giá</div>
              <div className="price-range">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="4000"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="range-input"
              />
              <input
                type="range"
                min="0"
                max="4000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="range-input"
              />
            </div>

            <div className="filter-section">
              <div className="filter-title">Thương hiệu</div>
              {brands.map((brand) => (
                <label key={brand} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() =>
                      toggleFilter(brand, selectedBrands, setSelectedBrands)
                    }
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>

            <div className="filter-section">
              <div className="filter-title">RAM</div>
              {ramOptions.map((ram) => (
                <label key={ram} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedRams.includes(ram)}
                    onChange={() =>
                      toggleFilter(ram, selectedRams, setSelectedRams)
                    }
                  />
                  <span>{ram}</span>
                </label>
              ))}
            </div>

            <div className="filter-section">
              <div className="filter-title">Đánh Giá</div>
              {ratingOptions.map((rating) => (
                <label key={rating} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() =>
                      toggleFilter(rating, selectedRatings, setSelectedRatings)
                    }
                  />
                  <span>
                    {"★".repeat(rating)} {rating} sao
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <section className="product-listing">
          <div className="topbar-listing">
            <div>
              <p className="category-label">Bộ lọc danh mục</p>
              <h1>Kho Sản Phẩm</h1>
            </div>
            <div className="listing-actions">
              <div className="active-count">
                {filteredProducts.length} sản phẩm được tìm thấy
              </div>
              {compareIds.length >= 2 && (
                <button
                  className="btn-compare-view"
                  onClick={handleGoToComparison}
                >
                  So sánh {compareIds.length} sản phẩm →
                </button>
              )}
            </div>
          </div>

          <div className="product-grid">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="product-item">
                <Link to={`/product/${product.id}`} className="product-image">
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="product-body">
                  <span className="brand-label">{product.brand}</span>
                  <h2>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h2>
                  <div className="rating-row">
                    <span className="stars">
                      {"★".repeat(product.rating)}
                      {"☆".repeat(5 - product.rating)}
                    </span>
                    <span className="rating-text">{product.rating}.0</span>
                  </div>
                  <p className="price">
                    {product.price.toLocaleString("en-US")}đ
                  </p>
                </div>
                <div className="product-actions-row">
                  <Link to={`/product/${product.id}`} className="btn-primary">
                    Xem chi tiết
                  </Link>
                  <label className="compare-checkbox">
                    <input
                      type="checkbox"
                      checked={compareIds.includes(product.id)}
                      onChange={() => handleCompareToggle(product.id)}
                    />
                    So Sánh
                  </label>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Trang trước
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      className={`page-number ${currentPage === pageNum ? "active" : ""}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Trang sau →
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
