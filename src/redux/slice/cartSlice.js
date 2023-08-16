import { createSlice } from "@reduxjs/toolkit";

/* Reducer */
const initialState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const index = state.cartList.findIndex((obj) => obj.id == action.payload.id);
      if (index !== -1) {
        state.cartList[index] = action.payload;
      } else {
        state.cartList.push(action.payload);
      }
    },
    removeCart: (state, action) => {
      state.cartList = state.cartList.filter((obj) => obj.id !== action.payload);
    },
    resetCart: (state) => {
      state.cartList = [];
    },
  },
});

export const { addCart, removeCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
