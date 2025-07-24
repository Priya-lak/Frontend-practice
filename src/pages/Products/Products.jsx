import { Link, Outlet } from "react-router-dom";
import { instance } from "../../axiosInstance/axiosInstance";
import { useEffect, useState } from "react";

export default function Products() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance("products/");
        setProductData(response.data.products);
        // Remove this console.log as it will always show empty array
        // console.log("products", productData);
      } catch (err) {
        console.error("error", err);
      }
    };

    fetchData();
  }, []);

  // Add this to see the updated state
  useEffect(() => {
    console.log("Updated products:", productData);
  }, [productData]);
  return (
    <div>
      <h1>Products Page</h1>
      <div className="products-list">
        {productData.map((product) => {
          return (
            <Link to={`${product.id}`}>
              <div key={product.id} className="product-card">
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
