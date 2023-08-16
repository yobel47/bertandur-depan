import { createSlice } from "@reduxjs/toolkit";
import {
  addLands,
  deleteLands,
  loadLandDetail,
  loadLandTransaction,
  loadLandTransactionAdmin,
  loadLands,
  loadLandsUser,
  updateLands,
  verifLands,
  loadLandDetailTransaction,
  verifLandTransaction,
  rentLand,
  loadLandsAdmin,
  addReviewLand,
  loadLandsReview,
} from "../actions";

/* Reducer */
const initialState = {
  status: "idle",
  lands: [],
  detail: null,
  transaction: [],
  review: [],
  error: null,
  success: false,
};

const landSlice = createSlice({
  name: "land",
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
      .addCase(loadLands.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadLands.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.lands = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadLands.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(loadLandsUser.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadLandsUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.lands = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadLandsUser.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(loadLandDetail.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadLandDetail.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.detail = payload.data[0];
        } else {
          state.error = payload;
        }
      })
      .addCase(loadLandDetail.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(loadLandTransactionAdmin.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadLandTransactionAdmin.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.transaction = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadLandTransactionAdmin.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(loadLandTransaction.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadLandTransaction.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.transaction = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadLandTransaction.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(loadLandDetailTransaction.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadLandDetailTransaction.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.detail = payload.data;
        } else {
          state.error = payload;
        }
      })
      .addCase(loadLandDetailTransaction.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(addLands.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(addLands.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.error = payload;
          state.success = false;
        }
      })
      .addCase(addLands.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(deleteLands.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(deleteLands.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(deleteLands.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(updateLands.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(updateLands.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(updateLands.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(verifLands.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(verifLands.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(verifLands.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(verifLandTransaction.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(verifLandTransaction.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload) {
          state.success = payload;
          state.error = null;
        }
      })
      .addCase(verifLandTransaction.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(rentLand.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(rentLand.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(rentLand.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(addReviewLand.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(addReviewLand.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload) {
          state.success = payload;
          state.error = null;
        }
      })
      .addCase(addReviewLand.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(loadLandsAdmin.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadLandsAdmin.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.lands = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadLandsAdmin.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      })
      .addCase(loadLandsReview.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadLandsReview.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.review = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadLandsReview.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Server Error" };
      });
  },
});

/* Selectors */

export const { resetError, resetSuccess } = landSlice.actions;

export default landSlice.reducer;
