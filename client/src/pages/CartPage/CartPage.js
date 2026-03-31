import { useEffect, useMemo, useState } from 'react';
import CartItemCard from '../../components/CartItemCard/CartItemCard';
import CartSummary from '../../components/CartSummary/CartSummary';
import CartTopNav from '../../components/CartTopNav/CartTopNav';
import { getCart } from '../../services/cartService';
import './CartPage.css';

function CartPage() {
  const [viewStatus, setViewStatus] = useState('loading');
  const [cart, setCart] = useState({
    items: [],
    shippingFee: 0,
    additionalFee: 0
  });
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const loadCart = async () => {
    setViewStatus('loading');

    try {
      const response = await getCart();
      if (!response.success || !response.data) {
        setViewStatus('empty');
        return;
      }

      const { items = [], shippingFee = 0, additionalFee = 0 } = response.data;

      if (items.length === 0) {
        setCart({ items, shippingFee, additionalFee });
        setSelectedItemIds([]);
        setViewStatus('empty');
        return;
      }

      setCart({ items, shippingFee, additionalFee });
      setSelectedItemIds(items.map((item) => item.id));
      setViewStatus('success');
    } catch (error) {
      setViewStatus('error');
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const selectedItems = useMemo(() => {
    return cart.items.filter((item) => selectedItemIds.includes(item.id));
  }, [cart.items, selectedItemIds]);

  const subtotal = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [selectedItems]);

  const total = subtotal + cart.shippingFee + cart.additionalFee;

  const isAllSelected =
    cart.items.length > 0 && selectedItemIds.length === cart.items.length;

  const toggleItem = (itemId) => {
    setSelectedItemIds((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }

      return [...prev, itemId];
    });
  };

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedItemIds([]);
      return;
    }

    setSelectedItemIds(cart.items.map((item) => item.id));
  };

  return (
    <div className="cart-page">
      <CartTopNav />

      <main className="cart-page__content">
        {viewStatus === 'loading' ? (
          <section className="cart-page__state" aria-live="polite">
            Dang tai gio hang...
          </section>
        ) : null}

        {viewStatus === 'error' ? (
          <section className="cart-page__state cart-page__state--error" role="alert">
            <p>Khong the tai gio hang.</p>
            <button type="button" onClick={loadCart}>
              Thu lai
            </button>
          </section>
        ) : null}

        {viewStatus === 'empty' ? (
          <section className="cart-page__state" aria-live="polite">
            <p>Gio hang dang trong.</p>
            <button type="button" onClick={loadCart}>
              Tai lai
            </button>
          </section>
        ) : null}

        {viewStatus === 'success' ? (
          <section className="cart-page__panel">
            <div className="cart-page__head-row">
              <h1>Gio hang cua ban</h1>
              <p>{cart.items.length} san pham</p>
            </div>

            <div className="cart-page__grid">
              <div className="cart-page__items">
                {cart.items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    checked={selectedItemIds.includes(item.id)}
                    onToggle={toggleItem}
                  />
                ))}

                <div className="cart-page__actions">
                  <label htmlFor="select-all-cart">
                    <input
                      id="select-all-cart"
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleAll}
                    />
                    Chon tat ca ({cart.items.length})
                  </label>
                  <button type="button" className="cart-page__delete" disabled>
                    Xoa
                  </button>
                </div>
              </div>

              <CartSummary
                subtotal={subtotal}
                shippingFee={cart.shippingFee}
                additionalFee={cart.additionalFee}
                total={total}
              />
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

export default CartPage;
