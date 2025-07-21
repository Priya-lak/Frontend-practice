function Cart(props) {
  let cartContent =
    props.cartItems.length > 0 ? (
      <div className="cart-items"></div>
    ) : (
      <img src="" />
    );

  return (
    <>
      <h1>Your Cart</h1>
      {cartContent}
    </>
  );
}
export default Cart;
