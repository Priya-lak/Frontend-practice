import { Outlet } from "react-router-dom";

export default function Products() {
  return (
    <div>
      <h2>Products Page</h2>
      <Outlet />
    </div>
  );
}
