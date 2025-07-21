import { createSlice } from "@reduxjs/toolkit";

const initialCart = [];
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter((element) => {
        element.name !== action.payload.name;
      });
    },
    incrementCartItem: (state, action) => {
      const cartItem = state.find(
        (element) => element.name === action.payload.name
      );
      if (cartItem) {
        cartItem.quantity += 1;
        cartItem.amount = cartItem.price * cartItem.quantity;
      }
    },
    decrementCartItem: (state, action) => {
      const cartItem = state.find(
        (element) => element.name === action.payload.name
      );
      if (cartItem) {
        cartItem.quantity -= 1;
        cartItem.amount = cartItem.price * cartItem.quantity;
      }
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectTotalItems = (state) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalAmount = (state) =>
  state.cart.reduce((sum, item) => sum + item.amount, 0);

export const {
  addToCart,
  removeFromCart,
  incrementCartItem,
  decrementCartItem,
} = cartSlice.actions;
export default cartSlice.reducer;
