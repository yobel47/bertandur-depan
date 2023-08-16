import axios from "../../utils/axios";

export const getTutorial = () => axios.get("tutorial");

export const postTutorial = (payload) =>
  axios.post("tutorial", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateTutorial = (payload) =>
  axios.post("tutorial_update", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getTutorialDetail = (payload) => axios.get("tutorial_detail?id_tutorial=" + payload);

export const postTutorialDetail = (payload) =>
  axios.post("tutorial_detail", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateTutorialDetail = (payload) =>
  axios.post("tutorial_detail_update", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
