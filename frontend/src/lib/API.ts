import axios, { AxiosError } from "axios";
import { API_URL } from "./config";

export const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let cleanError = {} as AxiosError;
    if (error && error.stack) {
      cleanError = { ...error, stack: "" };
    }
    return Promise.reject(cleanError);
  }
);