import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

const options = {
  reducer: {
    cart: cartReducer,
  },
};

export const store = configureStore(options);
