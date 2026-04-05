import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { products } from "../../data/products";
import "./ProductListPage.css";

const categories = ["Laptop", "Tablet", "Điện thoại", "Âm thanh", "Phụ kiện"];

export default function ProductListPage({ session, onLogout }) {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim() ?? "";
  const category = searchParams.get("category") ?? "";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !category || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, category]);

  return (
    <div className="product-list-page">
      <Header session={session} onLogout={onLogout} />

      <main className="container product-list-container">
        <section className="page-header">
          <div>
            <h1>Danh sách sản phẩm</h1>
            <p>
              {category
                ? `Bạn đang xem ${category}`
                : searchTerm
                  ? `Kết quả tìm kiếm cho “${searchTerm}”`
                  : "Khám phá sản phẩm công nghệ hot nhất hôm nay."}
            </p>
          </div>
          <div className="product-filters">
            <span>Danh mục:</span>
            <div className="filter-list">
              <Link
                to="/products"
                className={`filter-chip ${category === "" ? "active" : ""}`}
              >
                Tất cả
              </Link>
              {categories.map((item) => (
                <Link
                  key={item}
                  to={`/products?category=${encodeURIComponent(item)}`}
                  className={`filter-chip ${item === category ? "active" : ""}`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <article key={product.id} className="product-card">
                <Link to={`/products/${product.id}`} className="product-link">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-meta">
                    <h2>{product.name}</h2>
                    <p className="product-category">{product.category}</p>
                  </div>
                </Link>
                <div className="product-footer">
                  <div>
                    <div className="product-price">{product.priceText}</div>
                    {product.oldPriceText && (
                      <div className="product-old-price">
                        {product.oldPriceText}
                      </div>
                    )}
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-details"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              Không tìm thấy sản phẩm phù hợp. Vui lòng thử từ khóa khác hoặc
              chọn danh mục.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
