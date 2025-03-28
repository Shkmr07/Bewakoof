import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

export const getProduct = createAsyncThunk(
  "product/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/products");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error not getting products"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (productData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        return rejectWithValue("No Access Token Found");
      }

      const res = await api.post("/products/add-product", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, // Send access token in Authorization header
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    error: null,
    status: "idle",
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload?.product || {});
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // getting the product details
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
