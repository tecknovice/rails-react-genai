import request from "@/lib/request";

import {
  type User,
  type LoginCredentials,
  type LoginResponse,
  type RegisterData,
  type UserUpdateData,
} from "@/types/user";

export const register = async (data: RegisterData) => {
  const response = await request("POST", "/register", { user: data });
  return response;
};
export const login = async (data: LoginCredentials) => {
  const response = await request<LoginResponse>("POST", "/login", {
    user: data,
  });
  if (response.payload) localStorage.setItem("token", response.payload.token);
  return response;
};
export const logout = async () => {
  const response = await request("POST", "/logout");
  localStorage.removeItem("token");
  return response;
};
export const getProfile = async () => {
  const response = await request<User>("GET", "/profile");
  return response;
};
export const updateProfile = async (data: UserUpdateData) => {
  const response = await request("PUT", "/profile", data);
  return response;
};
