import { useParams } from "react-router-dom";
import {
  fetchProductById,
  selectProduct,
} from "../../features/products/productSlice";
import AddToCart from "../../components/addToCart/addToCart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Product() {
  const { product: productIdParam } = useParams();
  const dispatch = useDispatch();
  const productId = Number(productIdParam);
  const [quantity, setQuantity] = useState(1);

  const { loading, error } = useSelector((state) => state.products);
  const productDetails = useSelector((state) =>
    selectProduct(state, productId)
  );

  useEffect(() => {
    if (!productDetails) {
      console.log("api call for product");
      dispatch(fetchProductById({ productId }));
    }
  }, [dispatch, productId, productDetails]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!productDetails) return <p>Loading product details...</p>;
  return (
    <div className="product-details">
      <h2>Product {productId}</h2>
      <h3>{productDetails.title}</h3>
      <p>{productDetails.description}</p>
      <p>${productDetails.price}</p>
      <p>stock {productDetails.stock}</p>
      {quantity > 1 ? (
        <button onClick={() => setQuantity((quantity) => quantity - 1)}>
          -
        </button>
      ) : (
        <div></div>
      )}
      {quantity}
      {quantity < productDetails.stock ? (
        <button onClick={() => setQuantity((quantity) => quantity + 1)}>
          +
        </button>
      ) : (
        <div></div>
      )}
      <AddToCart productId={productId} quantity={quantity} />
    </div>
  );
}
