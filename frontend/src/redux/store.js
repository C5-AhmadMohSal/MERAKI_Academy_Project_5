import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
// Dina
// Taha
export default configureStore({
  reducer: {
    auth: authReducer,
    //  Dina
    // Taha
  },
});
