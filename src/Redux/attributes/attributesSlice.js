import { createSlice } from "@reduxjs/toolkit";
// import { fetchAttributes } from "./AttributesThunk";
import {
  fetchAttributes,
  addNewAttribute,
  fetchAttribute,
  updateAttribute,
  deleteAttribute,
} from "./attributesThunk";
// / Import the new thunk action creators

const initialState = {
  attributes: [],
  attribute: [],
  createattribute: [],
  loading: false,
  error: null,
};

// Create the attribute slice
const attributesSlice = createSlice({
  name: "Attributes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchattribute
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttributes.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = action.payload;
      })

      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch attributes";
      })

      // addNewattribute
      .addCase(addNewAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.createattribute = [...state.createattribute, action.payload];
      })
      .addCase(addNewAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new attribute";
      })

      // fetchattribute
      .addCase(fetchAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.attribute = action.payload;
      })
      .addCase(fetchAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch attribute";
      })

      // updateattribute
      .addCase(updateAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.attribute = action.payload;
      })
      .addCase(updateAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update attribute";
      })

      // deleteattribute
      .addCase(deleteAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttribute.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.attributes)) {
          state.attributes = state.attributes.filter(
            (item) => item.id !== action.payload.id
          );
        }
      })
      .addCase(deleteAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete attribute";
      });
  },
});

// Export the reducer
export default attributesSlice.reducer;
