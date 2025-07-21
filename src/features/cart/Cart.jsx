function Cart({ cartItems }) {
  let cartContent =
    cartItems.length > 0 ? (
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="item" key={item.name}>
            <span className="name">{item.name}</span>
            <div className="details">
              {item.quantity}
              {item.price}
              {item.amount}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <img
        src="../../../assets/images/illustration-empty-cart.svg"
        alt="Empty cart"
      />
    );

  return (
    <>
      <h1>Your Cart</h1>
      {cartContent}
    </>
  );
}
export default Cart;
