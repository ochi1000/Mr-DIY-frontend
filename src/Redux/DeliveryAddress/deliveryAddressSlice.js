import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDeliveryAddresss,
  addNewDeliveryAddress,
  fetchDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
} from "./deliveryAddressThunk";
// / Import the new thunk action creators

const initialState = {
  del_addresses: [],
  del_address: [],
  loading: false,
  error: null,
};

// Create the DeliveryAddress slice
const deliveryAddressSlice = createSlice({
  name: "delivery_address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchDeliveryAddress
      .addCase(fetchDeliveryAddresss.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryAddresss.fulfilled, (state, action) => {
        state.loading = false;
        state.del_addresses = action.payload;
      })

      .addCase(fetchDeliveryAddresss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch delivery address";
      })

      // addNewDeliveryAddress
      .addCase(addNewDeliveryAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewDeliveryAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.del_addresses = [...state.del_addresses, action.payload];
      })
      .addCase(addNewDeliveryAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add new delivery address";
      })

      // fetchDeliveryAddress
      .addCase(fetchDeliveryAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.del_address = action.payload;
      })
      .addCase(fetchDeliveryAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch delivery address";
      })

      // updateDeliveryAddress
      .addCase(updateDeliveryAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeliveryAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.del_address = action.payload;
      })
      .addCase(updateDeliveryAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update delivery address";
      })

      // deleteDeliveryAddress
      .addCase(deleteDeliveryAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeliveryAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.del_addresses)) {
          state.del_addresses = state.del_addresses.filter(
            (item) => item.id !== action.payload.id
          );
        }
      })
      .addCase(deleteDeliveryAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete delivery address";
      });
  },
});

// Export the reducer
export default deliveryAddressSlice.reducer;
