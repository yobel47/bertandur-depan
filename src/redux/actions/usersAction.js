import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, postUser, updateUser } from "../../service/Api";
import axios from "../../utils/axios";
import qs from "qs";

/* Actions */
export const loadUsers = createAsyncThunk("user/load", async (payload, { rejectWithValue }) => {
  try {
    const response = await getUser(payload && { params: { user_id: payload } });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const addUsers = createAsyncThunk("user/add", async (payload, { rejectWithValue }) => {
  try {
    const response = await postUser(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const updateUsers = createAsyncThunk("user/update", async (payload, { rejectWithValue }) => {
  try {
    const response = await updateUser(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteUsers = createAsyncThunk("user/delete", async (payload, { rejectWithValue, dispatch }) => {
  return await axios({
    method: "delete",
    url: "user",
    data: qs.stringify({ user_id: payload }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((data) => {
      dispatch(loadUsers());
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
});
