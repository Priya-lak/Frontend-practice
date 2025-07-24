import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productSlice";

const options = {
  reducer: {
    products: productReducer,
    // session:sessionReducer,
    cart: cartReducer,
  },
};

export const store = configureStore(options);
