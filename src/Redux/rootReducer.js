import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

// Combine the slice reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

// No need to define RootState type in JavaScript
export default rootReducer;
