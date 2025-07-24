import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../features/products/productSlice";

export default function Products() {
  const dispatch = useDispatch();
  const {
    items: productData,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 })); // page 1, limit 10
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productData.length) return <div>No products found</div>;

  return (
    <div>
      <h1>Products Page</h1>
      <div className="products-list">
        {productData.map((product) => {
          return (
            <Link to={`${product.id}`} key={product.id}>
              <div className="product-card">
                <img
                  src={product.images[0]}
                  alt=""
                  height="300px"
                  width="300px"
                />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating}/5</p>
              </div>
            </Link>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
}
