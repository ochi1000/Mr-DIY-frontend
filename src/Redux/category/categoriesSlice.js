import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategorys,
  addNewCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
} from "./categoriesThunk";
// / Import the new thunk action creators

const initialState = {
  categories: [],
  category: [],
  loading: false,
  error: null,
};

// Create the category slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCategory
      .addCase(fetchCategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorys.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch Categories";
      })

      // addNewCategory
      .addCase(addNewCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = [...state.categories, action.payload];
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new category";
      })

      // fetchCategory
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch category";
      })

      // updatecategory
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update category";
      })

      // deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.categories)) {
          state.categories = state.categories.filter(
            (item) => item.id !== action.payload.id
          );
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete category";
      });
  },
});

// Export the reducer
export default categoriesSlice.reducer;
