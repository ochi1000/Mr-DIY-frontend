/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getData, postData, putData, removeData } from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";
import { useNavigate } from "react-router-dom";

const useSignupNavigation = () => {
  const navigate = useNavigate();
  return (path) => navigate(path);
};

const PRODUCT_URL = "admin/product";

const fetchProducts = createAsyncThunk(
  "admin/fetchProduct",
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

const addNewProduct = createAsyncThunk(
  "addNewProduct",
  async (ProductData, { rejectWithValue }) => {
    try {
      const response = await postData(PRODUCT_URL, ProductData);
      // const { status, message } = response;
      // if (status >= 200 && status < 300) {
      //   toast.success(message);
      // }

      // dispatch(fetchProducts());
      return response;
    } catch (error) {
      // const errorMessage = error;
      const errorMessage = error.response?.data || error.message;
      console.log("thunk error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk action creator for fetching a single Product
const fetchProduct = createAsyncThunk(
  "getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(`${PRODUCT_URL}/${id}`);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    console.log("Edit Id Enter here", id);
    console.log("Edit formdata Enter here ", formData);
    try {
      const response = await postData(`${PRODUCT_URL}/${id}`, formData);

      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(`${PRODUCT_URL}/${id}`);
      // if (
      //   response?.status === 202 ||
      //   response?.status === 200 ||
      //   response?.status === 201 ||
      //   response?.status_code === 202 ||
      //   response?.status_code === 200 ||
      //   response?.status_code === 201
      // ) {
      //   dispatch(fetchProducts());
      //   toast.success("Product has been deleted successfully");
      //   // dispatch(
      //   //   openToast({
      //   //     type: "success",
      //   //     message: "Product has been deleted successfully",
      //   //   })
      //   // );
      // }
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);
const getAllProducts = createAsyncThunk(
  "admin/getProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData("product/get-all-products");
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const viewProduct = createAsyncThunk(
  "viewProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(`product/view-product/${id}`);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

export {
  fetchProducts,
  addNewProduct,
  fetchProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  viewProduct,
};
