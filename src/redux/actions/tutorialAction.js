import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTutorial, getTutorialDetail, postTutorial, updateTutorial, postTutorialDetail, updateTutorialDetail } from "../../service/Api";
import axios from "../../utils/axios";
import qs from "qs";

/* Actions */
export const loadTutorials = createAsyncThunk("tutorial/load", async (payload, { rejectWithValue }) => {
  try {
    const response = await getTutorial();
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const addTutorials = createAsyncThunk("tutorial/add", async (payload, { rejectWithValue }) => {
  try {
    const response = await postTutorial(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const updateTutorials = createAsyncThunk("tutorial/update", async (payload, { rejectWithValue }) => {
  try {
    const response = await updateTutorial(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteTutorials = createAsyncThunk("tutorial/delete", async (payload, { rejectWithValue, dispatch }) => {
  return await axios({
    method: "delete",
    url: "tutorial",
    data: qs.stringify({ id_tutorial: payload }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((data) => {
      dispatch(loadTutorials());
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
});

export const loadTutorialsDetail = createAsyncThunk("tutorialDetail/load", async (payload, { rejectWithValue }) => {
  try {
    const response = await getTutorialDetail(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const addTutorialsDetail = createAsyncThunk("tutorialDetail/add", async (payload, { rejectWithValue }) => {
  try {
    const response = await postTutorialDetail(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const updateTutorialsDetail = createAsyncThunk("tutorialDetail/update", async (payload, { rejectWithValue }) => {
  try {
    const response = await updateTutorialDetail(payload);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteTutorialsDetail = createAsyncThunk("tutorialDetail/delete", async (payload, { rejectWithValue, dispatch }) => {
  return await axios({
    method: "delete",
    url: "tutorial_detail",
    data: qs.stringify({ id_td: payload.id_td }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((data) => {
      dispatch(loadTutorialsDetail(payload.id_tutorial));
      return data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
});
