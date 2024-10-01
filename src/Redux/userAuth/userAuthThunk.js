import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../../utils/api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Async thunk action creator for login
const userLoginThunk = createAsyncThunk(
  "userAuthentication",
  async (diyUserData, { rejectWithValue }) => {
    try {
      // Make an HTTP POST request to the user endpoint with user data
      const response = await postData("auth", diyUserData);

      const userAuthResponse = response;
      console.log("user Auth Response", userAuthResponse);
      // toast.success(userAuthResponse?.message);

      const { data } = userAuthResponse;

      // Store the access token in a cookie with expiry, sameSite, and secure options
      Cookies.set("diy_user_token", data.token, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      // Store user information in a cookie
      const userAuthInfo = JSON.stringify(data?.user);
      // console.log("userAuthInfo", userAuthInfo);

      Cookies.set("diy_user_info", userAuthInfo, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      // Return the user data
      return response;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      console.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
    // } catch (error) {
    //   // Handle errors
    //   const errorMessage = error.response.data.message;
    //   // Reject the promise with the error message
    //   return rejectWithValue(errorMessage);
    // }
  }
);

// Create a userLogout thunk
const userLogoutThunk = createAsyncThunk(
  "authlogout",
  async (data, thunkAPI) => {
    try {
      // Make an HTTP POST request to the logout endpoint
      const response = await postData("user/logout", "");

      // Remove access token and user cookies
      Cookies.remove("diy_user_token");
      Cookies.remove("diy_user_info");

      // Return success message
      console.log("Logged out successfully");

      if (
        response?.status === 202 ||
        response?.status === 200 ||
        response?.status === 201 ||
        response?.status_code === 202 ||
        response?.status_code === 200 ||
        response?.status_code === 201
      ) {
        toast.success("Logged out successfully");
      }
      return response;
    } catch (error) {
      // Handle errors
      const errorMessage = error.response.data.message;
      // Reject the promise with the error message
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export { userLoginThunk, userLogoutThunk };
