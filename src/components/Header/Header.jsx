import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="about">About</NavLink>
      <NavLink to="products">Products</NavLink>
      <NavLink to="cart">Cart</NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="profile">Profile</NavLink>
          <NavLink onClick={logout}>Log out</NavLink>
        </>
      ) : (
        <>
          <NavLink to="login">Login</NavLink>
          <NavLink to="register">Register</NavLink>
        </>
      )}
    </nav>
  );
}
