import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
