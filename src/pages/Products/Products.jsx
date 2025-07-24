import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../features/products/productSlice";

export default function Products() {
  const dispatch = useDispatch();
  const {
    items: productData,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchProducts({ page: page, limit: limit })); // page 1, limit 10
  }, [dispatch, page]);

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
      {page > 1 ? (
        <button onClick={() => setPage((page) => page - 1)}>Previous</button>
      ) : (
        <div></div>
      )}
      <button onClick={() => setPage((page) => page + 1)}>Next</button>

      <Outlet />
    </div>
  );
}
