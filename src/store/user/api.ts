/* eslint-disable @typescript-eslint/no-explicit-any */
import { Status } from "@/common/general";
import { ChangePasswordProps, RegisterProps, SearchProps, UserProps } from "@/types";
import api from "@/utils/api";
import { AxiosResponse } from "axios";

export const updateAccountApi = (data: UserProps): Promise<AxiosResponse> => {
  return api.put(`/users/update/account?id=${data.id}`, {
    email: data.email,
    role: data.role,
    name: data.name,
    zipcode: data.zipcode,
    phone: data.phone,
    prefecture: data.prefecture,
    city: data.city,
    street: data.street,
    building: data.building,
    status: data.status,
  });
};

export const changePasswordApi = (data: ChangePasswordProps): Promise<AxiosResponse> => {
  return api.post('/auth/update/password', {
    id: data.id,
    currentPassword: data.currentPassword,
    password: data.newPassword,
    confirmPassword: data.confirmPassword,
  })
}

export const searchUsersPaginationApi = (data: SearchProps): Promise<AxiosResponse> => {
  return api.get(`/users/search?${data.keyword ? `keyword=${data.keyword}` : ""}&limit=${data.limit}&offset=${data.offset}${Object.values(Status).includes(data.status as keyof typeof Status) ? `&status=${data.status}` : ""}`)
}

export const statisticalUsersApi = (): Promise<AxiosResponse> => {
  return api.get('/users/statistical_users')
}

export const createUserApi = (data: RegisterProps): Promise<AxiosResponse> => {
  return api.post("/users/register/user", {
    name: data.name,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  });
};

export const deleteUsersApi = (data: any): Promise<AxiosResponse> => {
  return api.delete("/users/delete/items", {
    data: data,
  });
};

export const deleteUserApi = (data: any): Promise<AxiosResponse> => {
  return api.delete(`/users/delete/item?id=${data.id}`);
};
