import './CartSummary.css';

function formatPrice(value) {
  return `${new Intl.NumberFormat('vi-VN').format(value)} d`;
}

function CartSummary({ subtotal, shippingFee, additionalFee, total }) {
  return (
    <aside className="cart-summary" aria-label="Thong tin gio hang">
      <h2>Thong tin gio hang</h2>
      <dl>
        <div>
          <dt>Tong gia tri (tam tinh)</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Phi van chuyen</dt>
          <dd>{formatPrice(shippingFee)}</dd>
        </div>
        <div>
          <dt>Phu phi</dt>
          <dd>{formatPrice(additionalFee)}</dd>
        </div>
        <div className="cart-summary__total-row">
          <dt>Tong</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      <button type="button" className="cart-summary__checkout">
        Den thanh toan
      </button>
    </aside>
  );
}

export default CartSummary;
