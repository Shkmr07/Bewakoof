import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

// Async thunk to add an item to the cart
export const addItemToCart = createAsyncThunk(
    "cart/add",
    async (cartItem, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;

            if (!accessToken) {
                return rejectWithValue("No Access Token Found");
            }

            const res = await api.post("/cart/add", cartItem, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to add item to cart"
            );
        }
    }
);

// Async thunk to get the cart data
export const getCartData = createAsyncThunk(
    "cart/get",
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;

            if (!accessToken) {
                return rejectWithValue("No Access Token Found");
            }

            const res = await api.get("/cart", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to get cart data"
            );
        }
    }
);

// Async thunk to remove an item from the cart
export const removeItemFromCart = createAsyncThunk(
    "cart/remove",
    async (productId, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;

            if (!accessToken) {
                return rejectWithValue("No Access Token Found");
            }

            const res = await api.post("/cart/remove", { productId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to remove item from cart"
            );
        }
    }
);

// Async thunk to delete all items from the cart
export const deleteShoppingCart = createAsyncThunk(
    "cart/delete",
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;

            if (!accessToken) {
                return rejectWithValue("No Access Token Found");
            }

            const res = await api.delete("/cart", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to delete cart"
            );
        }
    }
);

const addCartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], // Array to store cart items
        error: null,
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle addItemToCart lifecycle
        builder
            .addCase(addItemToCart.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Assuming the API returns the updated cart data
                state.items = action.payload?.cart || state.items;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

        // Handle getCartData lifecycle
        builder
            .addCase(getCartData.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCartData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload?.cart || [];
            })
            .addCase(getCartData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

        // Handle removeItemFromCart lifecycle
        builder
            .addCase(removeItemFromCart.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Assuming the API returns the updated cart data
                state.items = action.payload?.cart || state.items;
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });

        // Handle deleteShoppingCart lifecycle
        builder
            .addCase(deleteShoppingCart.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteShoppingCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = []; // Cart is now empty
            })
            .addCase(deleteShoppingCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default addCartSlice.reducer;

