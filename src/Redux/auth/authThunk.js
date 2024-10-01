import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { postData } from "../../utils/api";
// import axios from "axios";

// Async thunk action creator for login
const loginThunk = createAsyncThunk(
  "admin/auth",
  async (userData, { rejectWithValue }) => {
    try {
      // Make an HTTP POST request to the login endpoint with user data
      const response = await postData("admin/auth", userData);

      // Assert the type of 'response' to 'LoginResponse'
      const loginResponse = response;
      // console.log("loginResponse", loginResponse);

      // if (loginResponse?.status === 202) {
      //   toast.success(loginResponse?.message);
      // }

      const adminRole = response?.data?.user?.roles;

      const checkRole = JSON.stringify(adminRole);

      Cookies.set("diy_admin_roles", checkRole, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      // Extract user data and access token from the response
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { user, token } = loginResponse?.data;

      // console.log(access_token);

      // Store the access token in a cookie with expiry, sameSite, and secure options
      Cookies.set("diy_admin_token", token, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      // Store user information in a cookie
      const userInfo = JSON.stringify(user);
      Cookies.set("diy_currentUser", userInfo, {
        expires: 7,
        sameSite: "None",
        secure: true,
      });

      //         const { status, message } = response;
      //   if (status >= 200 && status < 300) {
      //     toast.success(message);
      //   }
      //   return response;
      // } catch (error) {
      //   // Handle errors
      //   const errorMessage = error.response.data.message;
      //   // Reject the promise with the error message
      //   return thunkAPI.rejectWithValue(errorMessage);
      // }

      // Return the user data
      return response;
    } catch (error) {
      // Handle errors
      const errorMessage = error.response.data.message;

      console.log(" LOGIN ERROR:", error);
      if (
        error.status === 400 ||
        error.status === 401 ||
        error.status === 402 ||
        error.status === 403 ||
        error.status === 404
      ) {
        toast.error(errorMessage);
      }
      // Reject the promise with the error message
      return rejectWithValue(errorMessage);
    }
  }
);

const googleLoginThunk = createAsyncThunk(
  "auth/google",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await getData("auth/google");
      const response = (window.location.href =
        "https://phplaravel-1329305-4863390.cloudwaysapps.com/auth/google");

      // await axios.get(
      //   "https://phplaravel-1329305-4863390.cloudwaysapps.com/auth/google"
      // );
      console.log("google login:", response);
      return response;
    } catch (error) {
      const errorMessage = error;
      console.log(errorMessage);
      return rejectWithValue(errorMessage?.response?.data);
    }
  }
);

// Create a logout thunk
const logoutThunk = createAsyncThunk("admin/logout", async (data, thunkAPI) => {
  try {
    // Make an HTTP POST request to the logout endpoint
    const response = await postData("admin/logout", "");

    // Remove access token and user cookies
    Cookies.remove("diy_admin_token");
    Cookies.remove("diy_currentUser");
    Cookies.remove("diy_admin_roles");

    // Return success message
    // return "Logged out successfully";
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
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export { loginThunk, logoutThunk, googleLoginThunk };
