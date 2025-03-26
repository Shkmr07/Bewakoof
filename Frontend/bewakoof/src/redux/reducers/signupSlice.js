import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../api";

export const register = createAsyncThunk(
  "signup/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/register", userData);
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Something Went Wrong");
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState: { status: "idle", message: "", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default signupSlice.reducer
