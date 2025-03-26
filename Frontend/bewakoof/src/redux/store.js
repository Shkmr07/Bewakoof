import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./reducers/signupSlice";
import authReducer from "./reducers/authSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

export default store;
