/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LIMIT } from "@/constant";
import api from "./api";
import { jwtDecode } from "jwt-decode";

export const setAuthToken = (headers: any): void => {
  if (Object.keys(headers).length > 0 && typeof headers === "object") {
    api.defaults.headers.common = headers;
  }
};

export const checkTokenExpiration = (token: string | null) => {
  try {
    if (!token) return true;
    const { exp } = jwtDecode<{ exp: number }>(token);
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const offset = (page: number) => {
  return (page - 1) * LIMIT;
}

export const calculateTotalPages = (totalRecords: number, recordsPerPage: number): number => {
  if (recordsPerPage <= 0) {
    throw new Error("recordsPerPage must be greater than 0");
  }
  return Math.ceil(totalRecords / recordsPerPage);
}
