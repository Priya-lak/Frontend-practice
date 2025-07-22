import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart, selectTotalAmount } from "./cartSlice";
import OrderConfirmed from "../../components/order-confirmed/OrderConfirmed";
import "./Cart.css";
import { useState } from "react";

function Cart({ cartItems }) {
  const cartTotal = useSelector((state) => selectTotalAmount(state));
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  let cartContent =
    cartItems.length > 0 ? (
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="item" key={item.name}>
            <span className="name">{item.name}</span>
            <div className="details">
              <span className="quantity">{item.quantity}x</span>
              <span className="price">@${item.price}</span>
              <span className="amount">${item.amount}</span>
            </div>
            <button
              onClick={() => {
                dispatch(removeFromCart({ name: item.name }));
              }}
            >
              <img
                src="../../../assets/images/icon-remove-item.svg"
                alt="remove"
              />
            </button>
          </div>
        ))}

        <div className="total">
          <span>Order Total</span>
          <span>${cartTotal}</span>
        </div>
        <button
          className="order-confirm"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Confirm Order
        </button>
      </div>
    ) : (
      <img
        src="../../../assets/images/illustration-empty-cart.svg"
        alt="Empty cart"
      />
    );

  return (
    <>
      <div className="cart">
        <h1 data-count={cartItems.length}>Your Cart</h1>
        {cartContent}
        {cartItems.length > 0 && (
          <div className="carbon-neutral">
            <img
              src="../../../assets/images/icon-carbon-neutral.svg"
              alt="Carbon neutral"
            />
            <span>This is a carbon-neutral delivery</span>
          </div>
        )}
      </div>

      {/* Order confirmation dialog outside the cart */}
      <OrderConfirmed
        isOpen={isVisible}
        onClose={() => setIsVisible(false)}
        onConfirm={() => {
          dispatch(clearCart());
          setIsVisible(false);
        }}
        totalAmount={cartTotal}
        cartItems={cartItems}
      />
    </>
  );
}
export default Cart;
