import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    productInCart: [],
    subTotal: 0,
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      state.productInCart = state.cart.map((element) => {
        return element.product_id;
      });
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
      state.productInCart = state.cart.map((element) => {
        return element.product_id;
      });
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((element) => {
        return element.product_id !== action.payload.product_id;
      });
      state.productInCart = state.productInCart.filter((element) => {
        return element !== action.payload.product_id;
      });
    },
    changeQuantity: (state, action) => {
      state.cart = state.cart.map((element) => {
        if (element.product_id === action.payload.product_id) {
          console.log(action.payload, "PAY");
          return { ...element, quantityInCart: action.payload.quantityInCart };
        }
        return element;
      });
      console.log(state.cart, "====");
    },
  },
});

export const { addToCart, setCart, removeFromCart, changeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
