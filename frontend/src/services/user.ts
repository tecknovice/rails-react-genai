import request from "@/lib/request";

import type { UserUpdateData } from "@/types/user";

export const getUser = async () => {
  const response = await request("GET", "/admin/user");
  return response;
};
export const updateUser = async (data: UserUpdateData) => {
  const response = await request("PUT", "/admin/user", data);
  return response;
};

export const deleteUser = async () => {
  const response = await request("DELETE", "/admin/user");
  return response;
};
