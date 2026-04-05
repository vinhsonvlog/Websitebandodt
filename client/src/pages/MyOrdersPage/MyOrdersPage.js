import './MyOrdersPage.css';

const MOCK_ORDERS = [
  {
    id: 1,
    productName: 'Lenovo Legion R7000P 2025 Ryzen 9-8945HX, RAM 16GB, SSD 1TB, RTX 5070 8GB, 16" 2K+ 240Hz (No.4443)',
    status: 'Đang vận chuyển',
    totalPrice: '36.990.000đ',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80',
  },
  {
    id: 2,
    productName: 'Tai nghe HyperX Cloud III Wireless Black Red',
    status: 'Đang vận chuyển',
    totalPrice: '3.290.000đ',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
  }
];

function MyOrdersPage() {
  return (
    <div className="my-orders">
      <div className="my-orders__search-bar">
        <span className="my-orders__search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Vui lòng nhập thông tin đơn hàng ......." 
        />
      </div>

      <div className="my-orders__list">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card__header">
              <span className="order-card__status">{order.status}</span>
            </div>
            
            <div className="order-card__body">
              <img src={order.image} alt={order.productName} className="order-card__img" />
              <div className="order-card__info">
                <h3 className="order-card__title">{order.productName}</h3>
              </div>
            </div>

            <div className="order-card__footer">
              <div className="order-card__total">
                <span className="order-card__total-icon">💰</span> 
                Thành tiền: {order.totalPrice}
              </div>
              <div className="order-card__actions">
                <button className="btn btn--red">Xem chi tiết</button>
                <button className="btn btn--gray">Huỷ đơn hàng</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrdersPage;
