import axios from "../../utils/axios";

export const getLand = (payload) => axios.get("land", payload);
export const getLandUser = (payload) => axios.get("land_user", payload);
export const getDetailLand = (payload) => axios.get("detailland?id_land=" + payload);
export const getTransactionLand = () => axios.get("rent");
export const getTransactionLandAdmin = () => axios.get("rent_web_admin");
export const getDetailTransactionLand = (payload) => axios.get("detailrent?id_rent=" + payload);
export const getReviewLand = (payload) => axios.get("review_land?id_land=" + payload);

export const postLand = (payload) =>
  axios.post("land", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateLand = (payload) =>
  axios.post("land_update", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const verificationLandTransaction = (payload) =>
  axios.post("verif_rent", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const postRent = (payload) =>
  axios.post("rent", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const postReviewLand = (payload) =>
  axios.post("review_land", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getLandAdmin = (payload) => axios.get("land_web_admin", payload);
