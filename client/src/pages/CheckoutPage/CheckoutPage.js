import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import './CheckoutPage.css';

function CheckoutPage() {
  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <div className="checkout-header__actions">
          {/* Nút đóng hoặc quay lại có thể thêm ở đây */}
        </div>
      </header>

      <main className="checkout-container">
        <section className="checkout-card">
          <CheckoutForm />
        </section>

        <section className="checkout-card checkout-card--summary">
          <OrderSummary 
            subtotal={10000000}
            shippingFee={20000}
            total={10020000}
          />
        </section>
      </main>
    </div>
  );
}

export default CheckoutPage;
