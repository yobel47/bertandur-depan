import axios from "../../utils/axios";

export const postRegister = (payload) =>
  axios.post("register", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const postVerif = ({ email, otp }) => axios.get(`verify?email=${email}&otp=${otp}`);

export const postLogin = (payload) =>
  axios.post("login", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const postToken = (payload) =>
  axios.put("update_token", payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

export const resendOTP = (payload) =>
  axios.post("resendOTP", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
