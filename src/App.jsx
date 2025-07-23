import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<Home />} />
          <Route path="products" element={<Products />}>
            <Route path=":product" element={<Product />} />
          </Route>
        </Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </BrowserRouter>
    </>
  );
}

export default App;
