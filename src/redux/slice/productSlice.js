import { createSlice } from "@reduxjs/toolkit";
import {
  addProducts,
  deleteProducts,
  loadDetailProducts,
  loadProductCategory,
  loadProductDetailTransaction,
  loadProducts,
  loadProductsUser,
  loadProductTransaction,
  loadProductTransactionAdmin,
  orderProducts,
  updateProducts,
  verifProducts,
  verifProductTransaction,
  addReviewProduct,
  loadProductsReview,
  loadProductsAdmin,
} from "../actions";

/* Reducer */
const initialState = {
  status: "idle",
  products: [],
  detail: null,
  category: [],
  transaction: [],
  review: [],
  error: null,
  success: false,
};

const productSlice = createSlice({
  name: "product",
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
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadProducts.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.products = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadProducts.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(loadProductsAdmin.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadProductsAdmin.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.products = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadProductsAdmin.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(loadProductsUser.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadProductsUser.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.products = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadProductsUser.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(loadDetailProducts.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadDetailProducts.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.detail = payload.data[0];
        } else {
          state.error = payload;
        }
      })
      .addCase(loadDetailProducts.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(loadProductCategory.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadProductCategory.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.category = payload.data;
        } else {
          state.error = payload;
        }
      })
      .addCase(loadProductCategory.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(loadProductTransactionAdmin.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadProductTransactionAdmin.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.transaction = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadProductTransactionAdmin.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(loadProductTransaction.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadProductTransaction.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.transaction = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadProductTransaction.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(loadProductDetailTransaction.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadProductDetailTransaction.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.detail = payload.data;
        } else {
          state.error = payload;
        }
      })
      .addCase(loadProductDetailTransaction.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(addProducts.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(addProducts.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.error = payload;
          state.success = false;
        }
      })
      .addCase(addProducts.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(deleteProducts.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(deleteProducts.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(deleteProducts.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(updateProducts.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(updateProducts.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(updateProducts.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(verifProducts.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(verifProducts.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(verifProducts.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(verifProductTransaction.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(verifProductTransaction.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload) {
          state.success = payload;
          state.error = null;
        }
      })
      .addCase(verifProductTransaction.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(addReviewProduct.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(addReviewProduct.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload) {
          state.success = payload;
          state.error = null;
        }
      })
      .addCase(addReviewProduct.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(orderProducts.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(orderProducts.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.success = payload;
          state.error = null;
        } else {
          state.success = false;
          state.error = payload;
        }
      })
      .addCase(orderProducts.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      })
      .addCase(loadProductsReview.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(loadProductsReview.fulfilled, (state, { payload }) => {
        state.status = "idle";
        if (payload.data) {
          state.review = payload.data.map((val, i) => ({ id: i + 1, ...val }));
        } else {
          state.error = payload;
        }
      })
      .addCase(loadProductsReview.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload?.status_message ? payload : { status_message: "Internal Server Error" };
      });
  },
});

/* Selectors */

export const { resetError, resetSuccess } = productSlice.actions;

export default productSlice.reducer;
