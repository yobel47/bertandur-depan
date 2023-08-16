import { createSlice } from "@reduxjs/toolkit";
import { addUsers, deleteUsers, loadUsers, updateUsers } from "../actions";

/* Reducer */
const initialState = {
  status: "idle",
  users: [], // for user object
  error: null,
  success: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadUsers.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.users = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadUsers.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(addUsers.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(addUsers.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.error = payload;
          state.success = false;
        }
      })
      .addCase(addUsers.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(deleteUsers.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(deleteUsers.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(updateUsers.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(updateUsers.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload) {
          state.success = payload;
          state.error = null;
        }
      })
      .addCase(updateUsers.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      });
  },
});

/* Selectors */
const selectUsersState = (rootState) => rootState.users;
export const selectUsersList = (rootState) => selectUsersState(rootState).users;
export const selectUsersStatus = (rootState) => selectUsersState(rootState).status;
export const selectUsersError = (rootState) => selectUsersState(rootState).error;

export const { resetError, resetSuccess } = usersSlice.actions;

export default usersSlice.reducer;
