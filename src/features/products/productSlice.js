import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../axiosInstance/axiosInstance";

const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page, limit) => {
    let skip = (page - 1) * limit;
    const response = await instance.get(
      `/products?limit=${limit}&skip=${skip}`
    );
    return response.data;
  }
);

const searchProduct = createAsyncThunk(
  "products/searchProducts",
  async (searchQuery) => {
    const response = await instance.get(`/products/search?q=${searchQuery}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    total: 0,
    skip: 0,
    limit: 10,
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle searchProduct
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchProducts, searchProduct };
export default productSlice.reducer;
