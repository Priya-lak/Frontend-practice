import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
  selectCartItem,
} from "../../features/cart/cartSlice";
import "./AddToCart.css";

function AddToCart({ isSelected, setIsSelected, item }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => selectCartItem(state, item.name));

  if (!isSelected || !cartItem) {
    return (
      <div
        className="add-to-cart-btn"
        onClick={() => {
          console.log("adding to cart");
          dispatch(
            addToCart({
              name: item.name,
              quantity: 1,
              price: item.price,
              amount: item.price,
            })
          );
          setIsSelected(true);
        }}
      >
        <img src="assets/images/icon-add-to-cart.svg" alt="Add to cart" />
        <span className="text">Add to cart</span>
      </div>
    );
  }

  return (
    <div className="selected add-to-cart-btn">
      <button
        onClick={() => {
          if (cartItem.quantity == 1) {
            dispatch(removeFromCart({ name: item.name }));
            setIsSelected(false);
          } else dispatch(decrementCartItem({ name: item.name }));
        }}
      >
        <img
          src="assets/images/icon-decrement-quantity.svg"
          alt="Decrease quantity"
        />
      </button>
      <span className="quantity">{cartItem.quantity}</span>
      <button
        onClick={() => {
          dispatch(incrementCartItem({ name: item.name }));
        }}
      >
        <img
          src="assets/images/icon-increment-quantity.svg"
          alt="Increase quantity"
        />
      </button>
    </div>
  );
}

export default AddToCart;
