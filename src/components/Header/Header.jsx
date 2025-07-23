import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="about">About</NavLink>
      <NavLink to="products">Products</NavLink>
      <NavLink to="login">Login</NavLink>
      <NavLink to="register">Register</NavLink>
    </nav>
  );
}
