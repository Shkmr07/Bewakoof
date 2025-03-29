import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./reducers/signupSlice";
import authReducer from "./reducers/authSlice";
import userReducer from "./reducers/userSlice";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartSlice"


import logger from "redux-logger";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
    user: userReducer,
    product : productReducer,
    cart : cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

export default store;
