import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getData, postData, putData, removeData } from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";

const CATEGORY_URL = "admin/category";

const fetchCategorys = createAsyncThunk(
  "admin/fetchCategory",
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

const addNewCategory = createAsyncThunk(
  "addNewCategory",
  async (CategoryData, { rejectWithValue, dispatch }) => {
    try {
      const response = await postData(CATEGORY_URL, CategoryData);

      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        toast.success("Category created successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "Category created successfully",
        //   })
        // );
      }
      console.log("Category create response", response);
      dispatch(fetchCategorys("admin/category"));
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

// Async thunk action creator for fetching a single Category
const fetchCategory = createAsyncThunk(
  "getCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(`${CATEGORY_URL}/${id}`);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateCategory = createAsyncThunk(
  "updateCategory",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await putData(`${CATEGORY_URL}/${id}`, formData);
      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        dispatch(fetchCategorys("admin/category"));
        toast.success("Category updated successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "Category account updated successfully",
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

const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(`${CATEGORY_URL}/${id}`);
      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        dispatch(fetchCategorys("admin/category"));
        toast.success("Category deleted successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "Category has been deleted successfully",
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
  fetchCategorys,
  addNewCategory,
  fetchCategory,
  updateCategory,
  deleteCategory,
};
