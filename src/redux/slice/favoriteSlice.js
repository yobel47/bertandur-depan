import { createSlice } from "@reduxjs/toolkit";

/* Reducer */
const initialState = {
  lands: [],
  products: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addLand: (state, action) => {
      const index = state.lands.findIndex((obj) => obj.id == action.payload.id);
      if (index !== -1) {
        state.lands[index] = action.payload;
      } else {
        state.lands.push(action.payload);
      }
    },
    removeLand: (state, action) => {
      state.lands = state.lands.filter((obj) => obj.ID_LAND !== action.payload);
    },
    addProduct: (state, action) => {
      const index = state.products.findIndex((obj) => obj.id == action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      } else {
        state.products.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((obj) => obj.ID_PRODUCT !== action.payload);
    },
    resetFavorite: (state) => {
      state.lands = [];
      state.products = [];
    },
  },
});

export const { addLand, removeLand, addProduct, removeProduct, resetFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
