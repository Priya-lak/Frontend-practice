import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Products from "./components/Products/Products";
import Product from "./components/Product/Product";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />}>
            <Route path=":product" element={<Product />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
