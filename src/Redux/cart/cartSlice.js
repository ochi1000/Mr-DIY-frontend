import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCarts,
  addNewCart,
  fetchCart,
  updateCart,
  deleteCart,
} from "./cartThunk";
// / Import the new thunk action creators

const initialState = {
  carts: [],
  cart: [],
  createcart: [],
  loading: false,
  error: null,
};

// Create the cart slice
const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })

      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch carts";
      })

      // addNewCart
      .addCase(addNewCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewCart.fulfilled, (state, action) => {
        state.loading = false;
        state.createcart = [...state.createcart, action.payload];
      })
      .addCase(addNewCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new cart";
      })

      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch cart";
      })

      // updateCart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update cart";
      })

      // deleteCart
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.carts)) {
          state.carts = state.carts.filter(
            (item) => item.id !== action.payload.id
          );
        }
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete cart";
      });
  },
});

// Export the reducer
export default cartsSlice.reducer;
