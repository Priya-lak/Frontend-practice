import "./App.css";
import Home from "./components/Home/Home";
import Root from "./components/Root/Root";
import About from "./components/About/About";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
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
