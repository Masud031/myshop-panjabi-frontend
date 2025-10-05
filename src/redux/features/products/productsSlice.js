// src/redux/features/products/productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    category: "all",
    color: "all",
    minPrice: "",
    maxPrice: "",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
