import './CartItemCard.css';

function formatPrice(value) {
  return `${new Intl.NumberFormat('vi-VN').format(value)} d`;
}

function CartItemCard({ item, checked, onToggle }) {
  return (
    <article className="cart-item-card">
      <label className="cart-item-card__checkbox" htmlFor={`select-${item.id}`}>
        <input
          id={`select-${item.id}`}
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(item.id)}
          aria-label={`Chon ${item.name}`}
        />
      </label>

      <div className="cart-item-card__body">
        <img src={item.imageUrl} alt={item.name} className="cart-item-card__image" />
        <div className="cart-item-card__meta">
          <h3>{item.name}</h3>
          <p>{item.category}</p>
          <div className="cart-item-card__qty" aria-label="So luong">
            <span>{item.quantity}</span>
          </div>
        </div>
        <div className="cart-item-card__price">{formatPrice(item.price)}</div>
      </div>
    </article>
  );
}

export default CartItemCard;
