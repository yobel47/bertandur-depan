import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDetailProduct,
  getDetailTransactionProduct,
  getProduct,
  getProductUser,
  getProductCategory,
  getTransactionProduct,
  getTransactionProductAdmin,
  postProduct,
  purchaseProduct,
  updateProduct,
  verificationProductTransaction,
  postReviewProduct,
  getReviewProduct,
  getProductAdmin,
} from "../../service/Api";
import axios from "../../utils/axios";
import qs from "qs";

/* Actions */
export const loadProducts = createAsyncThunk("product/load", async (payload, { rejectWithValue }) => {
  try {
    const response = await getProduct(payload && { params: { search: payload.search, sort: payload.sort, id_product_category: payload.category } });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadProductsAdmin = createAsyncThunk("product/loadAdmin", async (payload, { rejectWithValue }) => {
  try {
    const response = await getProductAdmin();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadProductsUser = createAsyncThunk("product/loadUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await getProductUser();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadDetailProducts = createAsyncThunk("product/loadDetail", async (payload, { rejectWithValue }) => {
  try {
    const response = await getDetailProduct(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadProductCategory = createAsyncThunk("product/category", async (payload, { rejectWithValue }) => {
  try {
    const response = await getProductCategory(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadProductTransaction = createAsyncThunk("product/loadTransaction", async (payload, { rejectWithValue }) => {
  try {
    const response = await getTransactionProduct();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
export const loadProductTransactionAdmin = createAsyncThunk("product/loadTransactionAdmin", async (payload, { rejectWithValue }) => {
  try {
    const response = await getTransactionProductAdmin();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadProductDetailTransaction = createAsyncThunk("product/loadDetailTransaction", async (payload, { rejectWithValue }) => {
  try {
    const response = await getDetailTransactionProduct(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const addProducts = createAsyncThunk("product/add", async (payload, { rejectWithValue }) => {
  try {
    const response = await postProduct(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const updateProducts = createAsyncThunk("product/update", async (payload, { rejectWithValue }) => {
  try {
    const response = await updateProduct(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const orderProducts = createAsyncThunk("product/purchase", async (payload, { rejectWithValue }) => {
  try {
    const response = await purchaseProduct(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const addReviewProduct = createAsyncThunk("product/addReview", async (payload, { rejectWithValue }) => {
  try {
    const response = await postReviewProduct(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteProducts = createAsyncThunk("product/delete", async (payload, { rejectWithValue, dispatch }) => {
  return await axios({
    method: "delete",
    url: "product",
    data: qs.stringify({ id_product: payload }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((data) => {
      dispatch(loadProductsAdmin());
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
});

export const verifProducts = createAsyncThunk("product/verif", async (payload, { rejectWithValue, dispatch }) => {
  return await axios({
    method: "put",
    url: "verify_product",
    data: qs.stringify({ id_product: payload }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((data) => {
      dispatch(loadProductsAdmin());
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
});

export const verifProductTransaction = createAsyncThunk("product/verifTransaction", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await verificationProductTransaction(payload);
    dispatch(loadProductTransactionAdmin());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadProductsReview = createAsyncThunk("product/review", async (payload, { rejectWithValue }) => {
  try {
    const response = await getReviewProduct(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
