import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getData, postData, putData, removeData } from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";

const CART_URL = "user/cart/";
// "user/cart/view-cart";
const fetchCarts = createAsyncThunk(
  "admin/fetchCarts",
  async (url, { rejectWithValue }) => {
    try {
      const response = await getData(url);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const addNewCart = createAsyncThunk(
  "addNewCart",
  async (CartData, { rejectWithValue }) => {
    try {
      const response = await postData(`${CART_URL}add-to-cart`, CartData);

      return response;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk action creator for fetching a single Cart
const fetchCart = createAsyncThunk(
  "getCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(`${CART_URL}/${id}`);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateCart = createAsyncThunk(
  "updateCart",
  async (formData, { rejectWithValue }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await putData(
        `user/cart/update-cart-item-quantity`,
        formData
      );

      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const deleteCart = createAsyncThunk(
  "deleteCart",
  async (_, { rejectWithValue }) => {
    try {
      // console.log(id);
      const response = await removeData(`user/cart/remove-from-cart`);
      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        // dispatch(fetchCarts("admin/Cart"));
        toast.success("Cart deleted successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "Cart has been deleted successfully",
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

export { fetchCarts, addNewCart, fetchCart, updateCart, deleteCart };
