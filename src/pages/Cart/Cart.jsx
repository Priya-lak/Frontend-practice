import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../../features/cart/cartSlice";
import { useEffect } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartData(1));
  }, [dispatch]);
  const cartItems = useSelector((state) => state.cart.items);
  console.log("cartItems", cartItems);
  return (
    <div className="cart">
      <h1>Cart</h1>

      {cartItems.map((item) => {
        return (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>Quantity {item.quantity}</p>
            <p>Total price: {item.total}</p>
          </div>
        );
      })}
    </div>
  );
}
