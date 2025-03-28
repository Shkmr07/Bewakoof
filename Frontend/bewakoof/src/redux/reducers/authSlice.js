import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/login", userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something Went Wrong"
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("users/refresh-token", {});
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something Went Wrong"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState(); // Get the current state
      const accessToken = state.auth.accessToken; // Extract access token from state

      if (!accessToken) {
        return rejectWithValue("No Access Token Found");
      }

      const res = await api.post(
        "/users/logout",
        {}, // No body required
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send access token in Authorization header
          }
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Logout Failed"
      );
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    status: "idle",
    error: null,
    isAuth: false,
    refreshStatus : "idle"
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload?.accessToken || null;
        state.isAuth = !!action.payload?.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // For Refresh Token

      .addCase(refreshToken.pending, (state) => {
        state.refreshStatus = "loading";
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.refreshStatus = "succeeded";
        state.accessToken = action.payload?.accessToken || null;
        state.isAuth = !!action.payload?.accessToken;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.refreshStatus = "failed";
        state.accessToken = null;
        state.isAuth = false;
        state.error = action.payload;
      })

      // ✅ logout handler
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.isAuth = false;
        state.status = "idle";
        state.error = null;
      });
  },
});

export default authSlice.reducer;
