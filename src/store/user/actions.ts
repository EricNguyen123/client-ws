/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ChangePasswordData, CreateUserData, DeleteUserData, DeleteUsersData, StatisticalUserData, UpdateAccountData, UsersPaginationData } from "@/types/redux";
import types from "./type";

export const updateAccount = (data: UpdateAccountData): Action => ({
  type: types.UPDATE_ACCOUNT,
  payload: data,
});

export const updateAccountResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_ACCOUNT_SUCCESS : types.UPDATE_ACCOUNT_FAILED,
  payload: result,
});

export const updateUserResult = (result: any): Action => ({
  type: types.UPDATE_USER,
  payload: result,
});

export const changePassword = (data: ChangePasswordData): Action => ({
  type: types.CHANGE_PASSWORD,
  payload: data,
});

export const changePasswordResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CHANGE_PASSWORD_SUCCESS : types.CHANGE_PASSWORD_FAILED,
  payload: result,
});

export const searchUsersPagination = (data: UsersPaginationData): Action => ({
  type: types.SEARCH_USERS_PAGINATION,
  payload: data,
});

export const searchUsersPaginationResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.SEARCH_USERS_PAGINATION_SUCCESS : types.SEARCH_USERS_PAGINATION_FAILED,
  payload: result,
});

export const statisticalUser = (data: StatisticalUserData): Action => ({
  type: types.STATISTICAL_USERS,
  payload: data,
});

export const statisticalUserResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.STATISTICAL_USERS_SUCCESS : types.STATISTICAL_USERS_FAILED,
  payload: result,
});

export const createUser = (data: CreateUserData): Action => ({
  type: types.CREATE,
  payload: data,
});

export const createUserResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_SUCCESS : types.CREATE_FAILED,
  payload: result,
});

export const deleteUsers = (data: DeleteUsersData): Action => ({
  type: types.DELETE_USERS,
  payload: data,
});

export const deleteUsersResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_USERS_SUCCESS : types.DELETE_USERS_FAILED,
  payload: result,
});

export const deleteUser = (data: DeleteUserData): Action => ({
  type: types.DELETE_USER,
  payload: data,
});

export const deleteUserResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_USER_SUCCESS : types.DELETE_USER_FAILED,
  payload: result,
});
