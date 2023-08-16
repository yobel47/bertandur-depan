import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProvince, postLogin, postRegister, postToken, postVerif, resendOTP } from "../../service/Api";

/* Actions */
export const getDataProvince = createAsyncThunk("auth/province", async (payload, { rejectWithValue }) => {
  try {
    const response = await getProvince();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const registerUser = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const response = await postRegister(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const verifUser = createAsyncThunk("auth/verif", async (payload, { rejectWithValue }) => {
  try {
    const response = await postVerif(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const response = await postLogin(payload);
    if (response.data?.data?.jwt) {
      localStorage.setItem("userToken", response.data.data.jwt);
    }
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const sendToken = createAsyncThunk("auth/token", async (payload, { rejectWithValue }) => {
  try {
    const response = await postToken(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const otpResend = createAsyncThunk("auth/resend", async (payload, { rejectWithValue }) => {
  try {
    const response = await resendOTP(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});
