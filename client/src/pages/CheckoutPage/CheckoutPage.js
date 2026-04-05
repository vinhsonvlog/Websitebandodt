import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <div className="checkout-header__actions">
          <button type="button" onClick={() => navigate("/cart")}>
            Quay lại giỏ hàng
          </button>
        </div>
      </header>

      <main className="checkout-container">
        <section className="checkout-card">
          <h2>Thong tin giao hang</h2>
          <form>
            <label htmlFor="checkout-name">Ho va ten</label>
            <input
              id="checkout-name"
              type="text"
              placeholder="Nhap ho va ten"
            />

            <label htmlFor="checkout-phone">So dien thoai</label>
            <input
              id="checkout-phone"
              type="tel"
              placeholder="Nhap so dien thoai"
            />

            <label htmlFor="checkout-address">Dia chi</label>
            <input
              id="checkout-address"
              type="text"
              placeholder="Nhap dia chi nhan hang"
            />

            <button type="button" onClick={() => navigate("/orders")}>
              Dat hang
            </button>
          </form>
        </section>

        <section className="checkout-card checkout-card--summary">
          <h2>Tong quan don hang</h2>
          <p>Tam tinh: 10.000.000d</p>
          <p>Phi van chuyen: 20.000d</p>
          <p>
            <strong>Tong cong: 10.020.000d</strong>
          </p>
        </section>
      </main>
    </div>
  );
}

export default CheckoutPage;
