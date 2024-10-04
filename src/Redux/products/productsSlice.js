import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  addNewProduct,
  fetchProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "./productsThunk";
// / Import the new thunk action creators

const initialState = {
  products: [],
  product: [],
  loading: false,
  error: null,
  addproducts: [],
  allProducts: [],
  loadingProduct: false,
  errorProduct: null,
};

// Create the products slice
const productsSlice = createSlice({
  name: "adminproducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch products";
      })

      // Get all Products
      .addCase(getAllProducts.pending, (state) => {
        state.loadingProduct = true;
        state.errorProduct = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.allProducts = action.payload;
      })

      .addCase(getAllProducts.rejected, (state, action) => {
        state.loadingProduct = false;
        state.errorProduct = action.payload ?? "Failed to get all products";
      })

      // addNewProduct
      .addCase(addNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.addproducts = [...state.addproducts, action.payload];
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new product";
      })

      // fetchProduct
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch product";
      })

      // updatecoupon
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update product";
      })

      // deleteProduct
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.products)) {
          state.products = state.products.filter(
            (item) => item.id !== action.payload.id
          );
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete product";
      });
  },
});

// Export the reducer
export default productsSlice.reducer;
