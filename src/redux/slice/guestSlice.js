import { createSlice } from "@reduxjs/toolkit";
import { loadLandsGuest, loadProductsGuest } from "../actions";

/* Reducer */
const initialState = {
  status: "idle",
  lands: [],
  products: [],
  error: null,
  success: false,
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLandsGuest.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadLandsGuest.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.lands = payload.data.map((val, i) => ({ id: i + 1, ...val }));
      })
      .addCase(loadLandsGuest.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(loadProductsGuest.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadProductsGuest.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.products = payload.data.map((val, i) => ({ id: i + 1, ...val }));
      })
      .addCase(loadProductsGuest.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      });
  },
});

export default guestSlice.reducer;
