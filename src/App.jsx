import Desserts from "./features/desserts/Desserts";
import Cart from "./features/cart/Cart";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  return (
    <>
      <div id="app">
        <Desserts />
        {console.log(useSelector((state) => state.cart))}
        <Cart cartItems={useSelector((state) => state.cart)}></Cart>
      </div>
    </>
  );
}

export default App;
