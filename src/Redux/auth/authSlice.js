import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, googleLoginThunk } from "./authThunk";
import Cookies from "js-cookie";

const getAdminRole = Cookies.get("diy_admin_roles")
  ? JSON.parse(Cookies.get("diy_admin_roles"))
  : null;

// console.log("get admin role", getAdminRole);

const hasAdmin = getAdminRole
  ? getAdminRole.some((role) => role.name === "admin")
  : null;

const hasUser = getAdminRole
  ? getAdminRole.some((role) => role.name === "user")
  : null;

// if (hasAdmin && hasUser) {
//   console.log("The role data contains both 'admin' and 'user'.");
// } else {
//   console.log(
//     "The role data does not contain both 'admin' and 'user'.",
//     hasAdmin,
//     hasUser
//   );
// }
// console.log(
//   "getAdminRole auth:",
//   Array.isArray(getAdminRole),
//   getAdminRole.find((item) => item.name === "admin")
// );

// if (Array.isArray(getAdminRole)) {
//   console.log("Data is an array.");
// } else {
//   console.log("Data is not an array.");
// }
const initialState = {
  currentUser: Cookies.get("diy_currentUser")
    ? JSON.parse(Cookies.get("diy_currentUser"))
    : null,
  isAuthenticated: !!Cookies.get("diy_admin_token"),
  isAdmin: hasAdmin && hasUser,
  loading: false,
  error: null,
  currentGoogleUser: [],
  googleLoading: false,
  googleError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on pending
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.isAdmin = true;
        state.loading = false;
        state.error = null; // Reset error state on success
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = action.payload; // Set error state from rejection value
      })

      .addCase(googleLoginThunk.pending, (state) => {
        state.googleLoading = true;
        state.googleError = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.googleLoading = false;
        state.currentGoogleUser = action.payload;
      })

      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.googleLoading = false;
        state.googleError = action.payload ?? "Failed to fetch Categories";
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
