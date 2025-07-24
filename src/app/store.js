import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productSlice";
import sessionReducer from "../features/session/sessionSlice";

const options = {
  reducer: {
    products: productReducer,
    session: sessionReducer,
    cart: cartReducer,
  },
};

const store = configureStore(options);
export default store;
