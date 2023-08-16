import axios from "axios";
import config from "../../config";
import { logout } from "../../redux/slice/authSlice";
import { resetCart } from "../../redux/slice/cartSlice";
import { loginUser } from "../../redux/actions";

export const tokenSelector = (state) => state.auth.userToken;

const instance = axios.create({
  baseURL: config.backendApi,
  // timeout: 1000,
});

export const setAuthHeader = (token) => {
  const real = token ? token : "";
  instance.defaults.headers.common["Authorization"] = real;
};

export const interceptor = (store) => {
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Do something with response error
      if (error.response.status == 401) {
        store.dispatch(logout());
        store.dispatch(resetCart());
        store.dispatch(loginUser.fulfilled(error.response.data));
        // Redirect to the login page here
        window.location.href = "/masuk";
      }
      return Promise.reject(error);
    }
  );
};

export default instance;
