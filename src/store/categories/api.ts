import { AccountProps, CreateCategoriesProps, SearchProps, UpdateCategoriesProps } from "@/types"
import api from "@/utils/api"
import { AxiosResponse } from "axios"

export const searchCategoriesPaginationApi = (data: SearchProps): Promise<AxiosResponse> => {
  return api.get(`/categories/page?${data.keyword ? `keyword=${data.keyword}` : ""}&limit=${data.limit}&offset=${data.offset}`)
}

export const createCategoryApi = (data: CreateCategoriesProps): Promise<AxiosResponse> => {
  return api.post("/categories", data)
}

export const getAllCategoriesApi = (): Promise<AxiosResponse> => {
  return api.get("/categories")
}

export const updateCategoryApi = (data: UpdateCategoriesProps): Promise<AxiosResponse> => {
  return api.put(`/categories/update?id=${data.id}`, data.data)
}

export const deleteCategoryApi = (data: AccountProps): Promise<AxiosResponse> => {
  return api.delete(`/categories/delete/item?id=${data.id}`)
}
