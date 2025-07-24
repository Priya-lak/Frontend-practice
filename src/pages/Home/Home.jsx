import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../features/session/sessionSlice";
import { useNavigate } from "react-router";

export default function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  return (
    <div className="HomePage">
      <h1> Welcome to shopCart!</h1>
      {isLoggedIn ? (
        <div className="redirects">
          <button onClick={() => navigate("/products")}>
            View our prducts
          </button>
        </div>
      ) : (
        <div className="redirects">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      )}
    </div>
  );
}
