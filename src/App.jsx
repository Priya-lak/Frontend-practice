import "./App.css";
import Home from "./pages/Home/Home";
import Root from "./pages/Root/Root";
import About from "./pages/About/About";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:product" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    )
  );
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
