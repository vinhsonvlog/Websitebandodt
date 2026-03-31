import './CartTopNav.css';

function CartTopNav() {
  return (
    <header className="cart-nav">
      <div className="cart-nav__title"></div>
      <div className="cart-nav__toolbar">
        <span className="cart-nav__logo">Logo</span>
        <button type="button" className="cart-nav__button">
          Danh muc
        </button>
        <label className="cart-nav__search" htmlFor="cart-search">
          <input
            id="cart-search"
            type="text"
            placeholder="Tim kiem san pham..."
            aria-label="Tim kiem san pham"
          />
        </label>
        <button type="button" className="cart-nav__button">
          Gio hang
        </button>
        <button
          type="button"
          className="cart-nav__avatar-button"
          aria-label="Trang ca nhan"
        >
          TK
        </button>
      </div>
    </header>
  );
}

export default CartTopNav;
