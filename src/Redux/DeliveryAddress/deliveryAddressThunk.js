import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getData, postData, putData, removeData } from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";

const DELIVERY_ADDRESS_URL = "user/delivery-address";

const fetchDeliveryAddresss = createAsyncThunk(
  "admin/fetchDeliveryAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(DELIVERY_ADDRESS_URL);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const addNewDeliveryAddress = createAsyncThunk(
  "addNewDeliveryAddress",
  async (DeliveryAddressData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(
        DELIVERY_ADDRESS_URL,
        DeliveryAddressData
      );

      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        toast.success("Delivery Address created successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "DeliveryAddress created successfully",
        //   })
        // );
      }
      console.log("Delivery Address create response", response);
      dispatch(fetchDeliveryAddresss());
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

// Async thunk action creator for fetching a single DeliveryAddress
const fetchDeliveryAddress = createAsyncThunk(
  "getDeliveryAddress",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(`${DELIVERY_ADDRESS_URL}/${id}`);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateDeliveryAddress = createAsyncThunk(
  "updateDeliveryAddress",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await putData(`${DELIVERY_ADDRESS_URL}/${id}`, formData);
      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        dispatch(fetchDeliveryAddresss());
        toast.success("Delivery Address updated successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "DeliveryAddress account updated successfully",
        //   })
        // );
      }
      // console.log("editing Response", response);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const deleteDeliveryAddress = createAsyncThunk(
  "deleteDeliveryAddress",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(`${DELIVERY_ADDRESS_URL}/${id}`);
      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        dispatch(fetchDeliveryAddresss());
        toast.success("Delivery Address deleted successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "DeliveryAddress has been deleted successfully",
        //   })
        // );
      }
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

export {
  fetchDeliveryAddresss,
  addNewDeliveryAddress,
  fetchDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
};
