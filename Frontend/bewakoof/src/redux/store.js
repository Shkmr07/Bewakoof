import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./reducers/signupSlice";
import authReducer from "./reducers/authSlice";
import userReducer from "./reducers/userSlice";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartSlice"




const store = configureStore({
  reducer: {
    signup: signupReducer,
    auth: authReducer,
    user: userReducer,
    product : productReducer,
    cart : cartReducer,
  },
 
});

export default store;
