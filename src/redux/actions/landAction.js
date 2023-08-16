import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDetailLand,
  getDetailTransactionLand,
  getLand,
  getLandUser,
  getTransactionLand,
  getTransactionLandAdmin,
  postLand,
  updateLand,
  verificationLandTransaction,
  postRent,
  getLandAdmin,
  postReviewLand,
  getReviewLand,
} from "../../service/Api";
import axios from "../../utils/axios";
import qs from "qs";

/* Actions */
export const loadLands = createAsyncThunk("land/load", async (payload, { rejectWithValue }) => {
  try {
    const response = await getLand(payload && { params: { search: payload.search, sort: payload.sort} });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadLandsUser = createAsyncThunk("land/loadUser", async (payload, { rejectWithValue }) => {
  try {
    const response = await getLandUser(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadLandDetail = createAsyncThunk("land/loadDetail", async (payload, { rejectWithValue }) => {
  try {
    const response = await getDetailLand(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadLandTransaction = createAsyncThunk("land/loadTransaction", async (payload, { rejectWithValue }) => {
  try {
    const response = await getTransactionLand();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadLandTransactionAdmin = createAsyncThunk("land/loadTransactionAdmin", async (payload, { rejectWithValue }) => {
  try {
    const response = await getTransactionLandAdmin();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadLandDetailTransaction = createAsyncThunk("land/loadDetailTransaction", async (payload, { rejectWithValue }) => {
  try {
    const response = await getDetailTransactionLand(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const addLands = createAsyncThunk("land/add", async (payload, { rejectWithValue }) => {
  try {
    const response = await postLand(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const updateLands = createAsyncThunk("land/update", async (payload, { rejectWithValue }) => {
  try {
    const response = await updateLand(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteLands = createAsyncThunk("land/delete", async (payload, { rejectWithValue, dispatch }) => {
  return await axios({
    method: "delete",
    url: "land",
    data: qs.stringify({ id_land: payload }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((data) => {
      dispatch(loadLandsAdmin());
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
});

export const verifLands = createAsyncThunk("land/verif", async (payload, { rejectWithValue, dispatch }) => {
  return await axios({
    method: "put",
    url: "verify_land",
    data: qs.stringify({ id_land: payload }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((data) => {
      dispatch(loadLandsAdmin());
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
});

export const verifLandTransaction = createAsyncThunk("land/verifTransaction", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await verificationLandTransaction(payload);
    dispatch(loadLandTransaction());
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const rentLand = createAsyncThunk("land/rent", async (payload, { rejectWithValue }) => {
  try {
    const response = await postRent(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const addReviewLand = createAsyncThunk("land/addReview", async (payload, { rejectWithValue }) => {
  try {
    const response = await postReviewLand(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadLandsReview = createAsyncThunk("land/review", async (payload, { rejectWithValue }) => {
  try {
    const response = await getReviewLand(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const loadLandsAdmin = createAsyncThunk("land/admin", async (payload, { rejectWithValue }) => {
  try {
    const response = await getLandAdmin(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
