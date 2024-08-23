import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    signup: signupReducer,
  },
});
