import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

export default function AddToCart({ productId, quantity }) {
  const dispatch = useDispatch();
  const handleClick = (productId, quantity) => {
    dispatch(addToCart({ productId, quantity, userId: 1 }));
  };
  return (
    <button onClick={() => handleClick(productId, quantity)}>
      Add to cart
    </button>
  );
}
