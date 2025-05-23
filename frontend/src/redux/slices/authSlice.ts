import type { AuthState, User } from "@/types/user";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
});
export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice;
