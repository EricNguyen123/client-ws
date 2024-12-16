/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ChangeForgotPasswordData, ForgotPasswordData, LoginData, RegisterData, VerifyOTPData } from "@/types/redux";
import types from "./type";

export const register = (data: RegisterData): Action => ({
  type: types.REGISTER,
  payload: data,
});

export const registerResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.REGISTER_SUCCESS : types.REGISTER_FAILED,
  payload: result,
});

export const login = (data: LoginData): Action => ({
  type: types.LOGIN,
  payload: data,
});

export const loginResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.LOGIN_SUCCESS : types.LOGIN_FAILED,
  payload: result,
});

export const loginWithGoogle = (data: { email: string | null }): Action => ({
  type: types.LOGIN_WITH_GOOGLE,
  payload: data,
});

export const loginWithGoogleResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.LOGIN_WITH_GOOGLE_SUCCESS : types.LOGIN_WITH_GOOGLE_FAILED,
  payload: result,
});

export const logout = (data: any): Action => ({
  type: types.LOGOUT,
  payload: data,
});

export const logoutResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.LOGOUT_SUCCESS : types.LOGOUT_FAILED,
  payload: result,
});

export const forgotPassword = (data: ForgotPasswordData): Action => ({
  type: types.FORGOT_PASSWORD,
  payload: data,
});

export const forgotPasswordResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.FORGOT_PASSWORD_SUCCESS : types.FORGOT_PASSWORD_FAILED,
  payload: result,
});

export const verifyOTP = (data: VerifyOTPData): Action => ({
  type: types.VERIFY_OTP,
  payload: data,
});

export const verifyOTPResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.VERIFY_OTP_SUCCESS : types.VERIFY_OTP_FAILED,
  payload: result,
});

export const changeForgotPassword = (data: ChangeForgotPasswordData): Action => ({
  type: types.CHANGE_FORGOT_PASSWORD,
  payload: data,
});

export const changeForgotPasswordResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CHANGE_FORGOT_PASSWORD_SUCCESS : types.CHANGE_FORGOT_PASSWORD_FAILED,
  payload: result,
});

export const updateAuthResult = (result: any): Action => ({
  type: types.UPDATE_AUTH,
  payload: result,
});
