import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLandGuest, getProductGuest } from "../../service/Api/guest";

export const loadLandsGuest = createAsyncThunk("guest/land", async (payload, { rejectWithValue }) => {
  try {
    const response = await getLandGuest();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
export const loadProductsGuest = createAsyncThunk("guest/product", async (payload, { rejectWithValue }) => {
  try {
    const response = await getProductGuest();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
