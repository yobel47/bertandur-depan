import axios from "../../utils/axios";

export const getUser = (payload) => axios.get("user", payload);

export const postUser = (payload) =>
  axios.post("user", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateUser = (payload) =>
  axios.post("user_update", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
