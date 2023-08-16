import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/usersSlice";
import authReducer from "./slice/authSlice";
import tutorialReducer from "./slice/tutorialSlice";
import productReducer from "./slice/productSlice";
import landReducer from "./slice/landSlice";
import guestReducer from "./slice/guestSlice";
import cartReducer from "./slice/cartSlice";
import favoriteReducer from "./slice/favoriteSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import { setAuthHeader, tokenSelector } from "../utils/axios";

const rootReducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
  tutorial: tutorialReducer,
  product: productReducer,
  land: landReducer,
  guest: guestReducer,
  cart: cartReducer,
  favorite: favoriteReducer,
});

const persistConfig = {
  key: "tandur",
  storage: storage,
  whitelist: ["auth", "cart", "favorite"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk,
      logger,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

store.subscribe(() => {
  const token = tokenSelector(store.getState());
  setAuthHeader(token);
});

export default store;
