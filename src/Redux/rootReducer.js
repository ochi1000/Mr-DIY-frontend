import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userauthReducer from "./userAuth/userAuthSlice";
import productsReducer from "./products/productsSlice";
import categoryReducer from "./category/categoriesSlice";
import tagsReducer from "./tags/tagsSlice";
import attributesReducer from "./attributes/attributesSlice";

// Combine the slice reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  userauth: userauthReducer,
  products: productsReducer,
  category: categoryReducer,
  tags: tagsReducer,
  attributes: attributesReducer,
});

// No need to define RootState type in JavaScript
export default rootReducer;
