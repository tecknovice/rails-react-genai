/* eslint-disable @typescript-eslint/no-explicit-any */
import client from "@/lib/client";
import axios from "axios";

export interface Response<T> {
  status: number;
  payload?: T;
  error?: string;
}

export default async function request<T>(
  method: string,
  url: string,
  data?: any
): Promise<Response<T>> {
  try {
    // Make the actual request
    const response = await client({
      method,
      url,
      data,
    });

    return { status: response.status, payload: response.data };
  } catch (error: unknown) {
    console.error("Request error:", error);
    // Handle expired token
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 403) {
        localStorage.removeItem("token");
        delete client.defaults.headers.common["Authorization"];
        window.location.href = "/login";
      }

      return {
        status: error.response.status,
        error:
          error.response.data.error || error.response.data.errors.join(","),
      };
    }

    return { status: 500, error: String(error) };
  }
}
