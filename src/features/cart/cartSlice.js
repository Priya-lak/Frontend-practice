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
        if (cartItem.quantity > 1) {
          // If quantity > 1, decrease it
          cartItem.quantity -= 1;
          cartItem.amount = cartItem.price * cartItem.quantity;
        } else {
          // If quantity = 1, remove item from cart
          return state.filter((item) => item.name !== action.payload.name);
        }
      }
    },
  },
});

export const selectCartItem = (state, name) =>
  state.cart.find((item) => item.name === name);
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
