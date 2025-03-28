import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api"; // Assuming you have an `api.js` file for axios instance

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedProfile, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;
      if (!token) {
        return rejectWithValue("No access token available");
      }

      const response = await api.patch("/users/update-profile", updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Attach token
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update user profile"
      );
    }
  }
);

// 🔥 Async Thunk to Fetch User Profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get the current accessToken from Redux state
      const token = getState().auth.accessToken;

      if (!token) {
        return rejectWithValue("No access token available");
      }

      const response = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Attach token
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user profile"
      );
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null, // Stores user details
    loading: false,
    error: null,
  },
  reducers: {
    clearUserProfile: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.user;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For user profile update

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
