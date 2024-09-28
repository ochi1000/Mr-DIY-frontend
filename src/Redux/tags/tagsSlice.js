import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTags,
  addNewTag,
  fetchTag,
  updateTag,
  deleteTag,
} from "./tagsThunk";
// / Import the new thunk action creators

const initialState = {
  tags: [],
  tag: [],
  createtag: [],
  loading: false,
  error: null,
};

// Create the tag slice
const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTag
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })

      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch tags";
      })

      // addNewTag
      .addCase(addNewTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewTag.fulfilled, (state, action) => {
        state.loading = false;
        state.createtag = [...state.createtag, action.payload];
      })
      .addCase(addNewTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new tag";
      })

      // fetchTag
      .addCase(fetchTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tag = action.payload;
      })
      .addCase(fetchTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch tag";
      })

      // updateTag
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tag = action.payload;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update tag";
      })

      // deleteTag
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.tags)) {
          state.tags = state.tags.filter(
            (item) => item.id !== action.payload.id
          );
        }
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete tag";
      });
  },
});

// Export the reducer
export default tagsSlice.reducer;
