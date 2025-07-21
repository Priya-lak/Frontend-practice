import "./OrderConfirmedCard.css";

function OrderConfirmedCard({ cartItems, totalAmount }) {
  return (
    <div className="order-confirmed-card">
      <div className="success-icon">
        <img
          src="../../../assets/images/icon-order-confirmed.svg"
          alt="Order confirmed"
        />
      </div>

      <h2 className="card-title">Order Confirmed!</h2>
      <p className="card-subtitle">Thank you for your purchase</p>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="items-list">
          {cartItems.map((item) => (
            <div key={item.name} className="order-item">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
              </div>
              <span className="item-price">${item.amount}</span>
            </div>
          ))}
        </div>

        <div className="total">
          <span>Total</span>
          <span>${totalAmount}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmedCard;
