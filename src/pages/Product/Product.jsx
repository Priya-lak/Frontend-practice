import { useParams } from "react-router-dom";

export default function Product() {
  const { product } = useParams();
  console.log(product);
  return <h2>Product {product}</h2>;
}
