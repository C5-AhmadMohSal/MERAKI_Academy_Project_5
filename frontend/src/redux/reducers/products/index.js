import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    oneProduct:[]
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setOneProduct: (state, action) => {
      state.oneProduct = action.payload;
    },
  },
});
export const { setProducts, setOneProduct } = productSlice.actions;
export default productSlice.reducer;
