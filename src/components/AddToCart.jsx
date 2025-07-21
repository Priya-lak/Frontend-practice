import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addToCart,
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
  selectCartItem,
} from "../features/cart/cartSlice";

function AddToCart({ selected, item }) {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(selected);
  const cartItem = useSelector((state) => selectCartItem(state, item.name));
  if (!isSelected) {
    return (
      <>
        <div
          className="add-to-cart-btn"
          onClick={() => {
            console.log("add to cart clicked!!");
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
          <img src="../../../assets/images/icon-add-to-cart.svg" alt="" />
          <span className="text">Add to cart</span>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="add-to-cart-btn-selected">
        <button
          onClick={() => {
            console.log("decrement");
            if (cartItem.quantity == 1) {
              dispatch(removeFromCart({ name: item.name }));
              setIsSelected(false);
            } else dispatch(decrementCartItem({ name: item.name }));
          }}
        >
          <img
            src="../../../assets/images/icon-decrement-quantity.svg"
            alt="decrement"
          />
        </button>
        <span className="quantity">{cartItem.quantity}</span>
        <button
          onClick={() => {
            console.log("increment");
            dispatch(incrementCartItem({ name: item.name }));
          }}
        >
          <img
            src="../../../assets/images/icon-increment-quantity.svg"
            alt=""
          />
        </button>
      </div>
    </>
  );
}
export default AddToCart;
