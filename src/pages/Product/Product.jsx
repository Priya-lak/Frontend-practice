import { useParams } from "react-router-dom";
import {
  fetchProductById,
  selectProduct,
} from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Product() {
  const { product: productIdParam } = useParams();
  const dispatch = useDispatch();
  const productId = Number(productIdParam);

  const { loading, error } = useSelector((state) => state.products);
  const productDetails = useSelector((state) =>
    selectProduct(state, productId)
  );

  useEffect(() => {
    if (!productDetails) {
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
    </div>
  );
}
