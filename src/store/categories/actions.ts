/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, CategoriesPaginationData, CreateCategoriesData, DeleteCategoryData, GetCategoriesData, UpdateCategoriesData } from "@/types/redux";
import types from "./type";

export const getCategories = (data: CategoriesPaginationData): Action => ({
  type: types.GET_CATEGORIES,
  payload: data,
});

export const getCategoriesResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_CATEGORIES_SUCCESS : types.GET_CATEGORIES_FAILED,
  payload: result,
});

export const createCategories = (data: CreateCategoriesData): Action => ({
  type: types.CREATE_CATEGORY,
  payload: data,
});

export const createCategoriesResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_CATEGORY_SUCCESS : types.CREATE_CATEGORY_FAILED,
  payload: result,
});

export const getAllCategories = (data: GetCategoriesData): Action => ({
  type: types.GET_ALL_CATEGORIES,
  payload: data,
});

export const getAllCategoriesResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_CATEGORIES_SUCCESS : types.GET_ALL_CATEGORIES_FAILED,
  payload: result,
});

export const updateCategories = (data: UpdateCategoriesData): Action => ({
  type: types.UPDATE_CATEGORY,
  payload: data,
});

export const updateCategoriesResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_CATEGORY_SUCCESS : types.UPDATE_CATEGORY_FAILED,
  payload: result,
});

export const deleteCategories = (data: DeleteCategoryData): Action => ({
  type: types.DELETE_CATEGORY,
  payload: data,
});

export const deleteCategoriesResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_CATEGORY_SUCCESS : types.DELETE_CATEGORY_FAILED,
  payload: result,
});
