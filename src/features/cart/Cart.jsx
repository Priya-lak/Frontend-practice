import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectTotalAmount } from "./cartSlice";
import OrderConfirmed from "../../components/order-confirmed-card/OrderConfirmedCard";

function Cart({ cartItems }) {
  const cartTotal = useSelector((state) => selectTotalAmount(state));
  const dispatch = useDispatch();

  let cartContent =
    cartItems.length > 0 ? (
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="item" key={item.name}>
            <span className="name">{item.name}</span>
            <div className="details">
              {item.quantity}x @${item.price} ${item.amount}
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
          Order Total <span>{cartTotal}</span>
        </div>
        <button
          className="order-confirm"
          onClick={() => {
            console.log("order confirmed");
          }}
        >
          Confirm Order
        </button>
        {/* <Order  Confirmed totalAmount={cartTotal} cartItems={cartItems} /> */}
      </div>
    ) : (
      <img
        src="../../../assets/images/illustration-empty-cart.svg"
        alt="Empty cart"
      />
    );

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartContent}
    </div>
  );
}
export default Cart;
