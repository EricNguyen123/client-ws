/* eslint-disable @typescript-eslint/no-explicit-any */

import { Action, CreateProductData, UploadImageData } from "@/types/redux";
import types from "./type";

export const createProduct = (data: CreateProductData): Action => ({
  type: types.CREATE_PRODUCT,
  payload: data,
});

export const createProductResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.CREATE_PRODUCT_SUCCESS : types.CREATE_PRODUCT_FAILED,
  payload: result,
});

export const updateImage = (data: UploadImageData): Action => ({
  type: types.UPDATE_IMAGE,
  payload: data,
});

export const updateImageResult = (result: any, isSuccess = true): Action => ({
  type: isSuccess ? types.UPDATE_IMAGE_SUCCESS : types.UPDATE_IMAGE_FAILED,
  payload: result,
});
