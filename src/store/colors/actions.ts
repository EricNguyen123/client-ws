import { Action, CreateColorData, DeleteColorData, GetColorsData } from "@/types/redux";
import types from "./type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createColor = (data: CreateColorData): Action => ({
  type: types.CREATE_COLOR,
  payload: data,
});

export const createColorResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_COLOR_SUCCESS : types.CREATE_COLOR_FAILED,
  payload: result,
});

export const getColors = (data: GetColorsData): Action => ({
  type: types.GET_ALL_COLORS,
  payload: data,
});

export const getColorsResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.GET_ALL_COLORS_SUCCESS : types.GET_ALL_COLORS_FAILED,
  payload: result,
});

export const deleteColor = (data: DeleteColorData): Action => ({
  type: types.DELETE_COLOR,
  payload: data,
});

export const deleteColorResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.DELETE_COLOR_SUCCESS : types.DELETE_COLOR_FAILED,
  payload: result,
});