import { ChangeForgotPasswordProps, ForgotPasswordProps, LoginProps, LoginWithGoogleProps, LogoutProps, RegisterProps, VerifyOTPProps } from "@/types";
import api from "@/utils/api";
import Axios, { AxiosResponse } from "axios";

export const registerApi = (data: RegisterProps): Promise<AxiosResponse> => {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  return Axios.post("/auth/register", {
    name: data.name,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  });
};

export const loginApi = (data: LoginProps): Promise<AxiosResponse> => {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  return Axios.post("/auth/login", {
    email: data.email,
    password: data.password,
  });
};

export const loginWithGoogleApi = (data: LoginWithGoogleProps): Promise<AxiosResponse> => {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  return Axios.post("/auth/callback/login", {
    email: data.email,
  });
};

export const logoutApi = (data: LogoutProps): Promise<AxiosResponse> => {
  return api.post("/auth/logout", {
    token: data.token,
  });
};

export const forgotPasswordApi = (data: ForgotPasswordProps): Promise<AxiosResponse> => {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  return Axios.post("/auth/otp", {
    email: data.email,
  });
};

export const verifyOTPApi = (data: VerifyOTPProps): Promise<AxiosResponse> => {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  return Axios.post("/auth/otp/verify", {
    email: data.email,
    otp: data.otp,
  });
};

export const changeForgotPasswordApi = (data: ChangeForgotPasswordProps): Promise<AxiosResponse> => {
  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  return Axios.post('/auth/update/forgot_password', {
    id: data.id,
    password: data.newPassword,
    confirmPassword: data.confirmPassword,
  })
}