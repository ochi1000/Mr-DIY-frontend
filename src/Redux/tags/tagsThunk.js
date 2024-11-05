import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getData, postData, putData, removeData } from "../../utils/api";
// import { openToast } from "../Toast/toastSlice";

const TAGS_URL = "admin/tag";

const fetchTags = createAsyncThunk(
  "admin/fetchTag",
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

const addNewTag = createAsyncThunk(
  "addNewTag",
  async (TagData, { rejectWithValue }) => {
    try {
      const response = await postData(TAGS_URL, TagData);
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
    //     toast.success("Tag created successfully!");
    //     // dispatch(
    //     //   openToast({
    //     //     type: "success",
    //     //     message: "Tag created successfully",
    //     //   })
    //     // );
    //   }
    //   console.log("Tag create response", response);
    //   dispatch(fetchTags("admin/tag"));
    // } catch (error) {
    //   const errorMessage = error;
    //   console.log(errorMessage);
    //   return rejectWithValue(errorMessage?.response?.data);
    // }
  }
);

// Async thunk action creator for fetching a single Tag
const fetchTag = createAsyncThunk("getTag", async (id, { rejectWithValue }) => {
  try {
    const response = await getData(`${TAGS_URL}/${id}`);
    return response;
  } catch (error) {
    const errorMessage = error;
    console.log(errorMessage);
    return rejectWithValue(errorMessage?.response?.data);
  }
});

const updateTag = createAsyncThunk(
  "updateTag",
  async ({ id, formData }, { rejectWithValue }) => {
    // console.log("Edit Id Enter here", id);
    // console.log("Edit formdata Enter here ", formData);
    try {
      const response = await putData(`${TAGS_URL}/${id}`, formData);
      // if (
      //   response?.status === 202 ||
      //   response?.status === 200 ||
      //   response?.status === 201 ||
      //   response?.status_code === 202 ||
      //   response?.status_code === 200 ||
      //   response?.status_code === 201
      // ) {
      //   dispatch(fetchTags("admin/tag"));
      //   toast.success("Tag updated successfully!");
      //   // dispatch(
      //   //   openToast({
      //   //     type: "success",
      //   //     message: "Tag account updated successfully",
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

const deleteTag = createAsyncThunk(
  "deleteTag",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      // console.log(id);
      const response = await removeData(`${TAGS_URL}/${id}`);
      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        dispatch(fetchTags("admin/tag"));
        toast.success("Tag deleted successfully!");
        // dispatch(
        //   openToast({
        //     type: "success",
        //     message: "Tag has been deleted successfully",
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

export { fetchTags, addNewTag, fetchTag, updateTag, deleteTag };
