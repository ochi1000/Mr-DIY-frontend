import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getData, postData, putData, removeData } from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";

const ATTRIBUTES_URL = "admin/attribute";

const fetchAttributes = createAsyncThunk(
  "admin/fetchAttribute",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(ATTRIBUTES_URL);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const addNewAttribute = createAsyncThunk(
  "addNewAttribute",
  async (AttributeData, { rejectWithValue }) => {
    try {
      const response = await postData(ATTRIBUTES_URL, AttributeData);
      // const { status, message } = response;
      // if (status >= 200 && status < 300) {
      //   toast.success(message);
      // }

      return response;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
    //   if (
    //     response?.status === 202 ||
    //     response?.status === 200 ||
    //     response?.status === 201 ||
    //     response?.status_code === 202 ||
    //     response?.status_code === 200 ||
    //     response?.status_code === 201
    //   ) {
    //     toast.success("Attribute created successfully!");
    //     // dispatch(
    //     //   openToast({
    //     //     type: "success",
    //     //     message: "Attribute created successfully",
    //     //   })
    //     // );
    //   }
    //   console.log("Attribute create response", response);
    //   dispatch(fetchAttributes());
    // } catch (error) {
    //   const errorMessage = error;
    //   console.log(errorMessage);
    //   return rejectWithValue(errorMessage?.response?.data);
    // }
  }
);

// Async thunk action creator for fetching a single Attribute
const fetchAttribute = createAsyncThunk(
  "getAttribute",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getData(`${ATTRIBUTES_URL}/${id}`);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const updateAttribute = createAsyncThunk(
  "updateAttribute",
  async ({ id, formData }, { rejectWithValue }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await putData(`${ATTRIBUTES_URL}/${id}`, formData);
      // if (
      //   response?.status === 202 ||
      //   response?.status === 200 ||
      //   response?.status === 201 ||
      //   response?.status_code === 202 ||
      //   response?.status_code === 200 ||
      //   response?.status_code === 201
      // ) {
      //   dispatch(fetchAttributes());
      //   toast.success("Attribute updated successfully!");
      //   // dispatch(
      //   //   openToast({
      //   //     type: "success",
      //   //     message: "Attribute account updated successfully",
      //   //   })
      //   // );
      // }
      // console.log("editing Response", response);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

const deleteAttribute = createAsyncThunk(
  "deleteAttribute",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(`${ATTRIBUTES_URL}/${id}`);
      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        dispatch(fetchAttributes());
        toast.success("Attribute deleted successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "Attribute has been deleted successfully",
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
  fetchAttributes,
  addNewAttribute,
  fetchAttribute,
  updateAttribute,
  deleteAttribute,
};
