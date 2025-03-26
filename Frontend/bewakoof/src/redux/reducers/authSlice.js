import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something Went Wrong");
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
      });
  },
});

export default authSlice.reducer;
