import { createSlice } from "@reduxjs/toolkit";
import {
  addTutorials,
  deleteTutorials,
  loadTutorials,
  updateTutorials,
  addTutorialsDetail,
  deleteTutorialsDetail,
  loadTutorialsDetail,
  updateTutorialsDetail,
} from "../actions";

/* Reducer */
const initialState = {
  status: "idle",
  tutorials: [],
  details: [],
  error: null,
  success: false,
};

const tutorialSlice = createSlice({
  name: "tutorial",
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
      .addCase(loadTutorials.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadTutorials.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.tutorials = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadTutorials.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(addTutorials.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(addTutorials.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.error = payload;
          state.success = false;
        }
      })
      .addCase(addTutorials.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(deleteTutorials.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(deleteTutorials.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(deleteTutorials.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(updateTutorials.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(updateTutorials.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(updateTutorials.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(loadTutorialsDetail.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadTutorialsDetail.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.details = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadTutorialsDetail.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(addTutorialsDetail.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(addTutorialsDetail.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.error = payload;
          state.success = false;
        }
      })
      .addCase(addTutorialsDetail.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(deleteTutorialsDetail.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(deleteTutorialsDetail.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(deleteTutorialsDetail.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(updateTutorialsDetail.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(updateTutorialsDetail.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = true;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(updateTutorialsDetail.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      });
  },
});

/* Selectors */

export const { resetError, resetSuccess } = tutorialSlice.actions;

export default tutorialSlice.reducer;
