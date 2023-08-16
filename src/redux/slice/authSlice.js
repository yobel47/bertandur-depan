import { createSlice } from "@reduxjs/toolkit";
import { loginUser, otpResend, registerUser, sendToken, verifUser } from "../actions";
import jwt from "jwt-decode";

/* Reducer */
const initialState = {
  status: "idle",
  notif: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
    logout: (state) => {
      state.status = "idle";
      state.userInfo = {};
      state.userToken = null;
      state.error = null;
      state.success = false;
      state.isLoggedIn = false;
      state.notif = false;
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = true;
        } else {
          state.error = payload;
        }
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(sendToken.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendToken.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.success = true;
        state.notif = true;
      })
      .addCase(sendToken.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(verifUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.status_code == 200) {
          state.status = payload;
        } else {
          state.error = payload;
        }
      })
      .addCase(verifUser.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          const user = jwt(payload.data.jwt);
          state.userToken = payload.data.jwt;
          state.userInfo = user;
          state.success = "login";
          state.isLoggedIn = true;
        } else {
          state.error = payload;
        }
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(otpResend.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(otpResend.fulfilled, (state, { payload }) => {
        state.status = payload;
      })
      .addCase(otpResend.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      });
  },
});

/* Selectors */
const selectAuthState = (rootState) => rootState.auth;
export const selectUserInfo = (rootState) => selectAuthState(rootState).userInfo;
export const selectUserToken = (rootState) => selectAuthState(rootState).userToken;
export const selectAuthStatus = (rootState) => selectAuthState(rootState).status;
export const selectAuthError = (rootState) => selectAuthState(rootState).error;
export const selectAuthSuccess = (rootState) => selectAuthState(rootState).success;

export const { resetError, resetSuccess, resetStatus, logout } = authSlice.actions;

export default authSlice.reducer;
