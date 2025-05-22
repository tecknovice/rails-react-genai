/* eslint-disable @typescript-eslint/no-explicit-any */
import client from "./client";

export async function request<T>(
  method: string,
  url: string,
  data?: any
): Promise<T> {
  try {
    // Make the actual request
    const response = await client({
      method,
      url,
      data,
    });

    return response.data;
  } catch (error: any) {
    // Handle expired token
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      delete client.defaults.headers.common["Authorization"];
      window.location.href = "/login";
    }

    throw error;
  }
}
