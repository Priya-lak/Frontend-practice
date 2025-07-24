import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosInstance/axiosInstance";

// Async thunk for fetching cart data
export const fetchCartData = createAsyncThunk(
  "cart/fetchCart",
  async (userId) => {
    const response = await instance.get(`carts/user/${userId}`);
    return response.data;
  }
);

// Async thunk for adding items to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await instance.post("carts/add", {
      userId,
      products: [{ id: productId, quantity }],
    });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      const item = state.items.find((item) => item.id === productId);
      state.totalQuantity -= item.quantity;
      state.totalAmount -= item.quantity * item.price;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        // Recalculate totals
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart cases
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;

        state.items.push(...(action.payload.products || []));
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add to cart cases
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(...(action.payload.products || []));
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCartItems = (state) => state.cart.items;
export const { clearCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
