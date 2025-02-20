/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LIMIT, TIME_OUT_INTERVAL } from "@/constant";
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

export const validateImageUrl = async ({ url, defaultUrl }: {url: string, defaultUrl: string}): Promise<string> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) return url;
    return defaultUrl;
  } catch {
    return defaultUrl;
  }
};

export const numbering = (page: number, index: number): number => {
  return (page - 1) * LIMIT + index + 1;
}

export const formatCurrencyMoney = (value: number): string => {
  if (!value) return "0";
  return new Intl.NumberFormat("vi-VN").format(value);
};

export const parseCurrencyMoney = (value: string): number => {
  const num = value.replace(/\D/g, "");
  return num === "" ? 0 : Number(num);
};

export const formatPercent = (value: number): string => {
  return isNaN(value) ? "" : String(Math.round(value * 100));
};

export const parsePercent = (value: string): number => {
  const num = parseFloat(value.replace(/[^\d.]/g, ""));
  return isNaN(num) ? 0 : num / 100;
};

export const parseMultiplicationRate = (value: number, price: number): number => {
  return Math.round(price * value / 100); 
}

export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function isNewItem(createdDate: string, thresholdMinutes: number = TIME_OUT_INTERVAL): boolean {
  const createdTime = new Date(createdDate).getTime();
  const currentTime = Date.now();
  const diffMinutes = (currentTime - createdTime) / (1000 * 60);
    
  return diffMinutes <= thresholdMinutes;
}
  