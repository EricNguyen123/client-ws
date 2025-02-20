/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateProductData, ResponseResult, UploadImageData } from "@/types/redux";
import types from "./type";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { createProductResult, updateImageResult } from "./actions";
import { createProductApi, updateImageApi } from "./api";

function* createProductsSaga(props: any) {
  const { data, setError, setSuccess }: CreateProductData = props.payload;
  
  try {
    const res: ResponseResult = yield call(createProductApi, data);

    if (res.status === 201) {
      setSuccess(res);
      yield put(createProductResult(res.data));
    } else {
      const isSuccess = false;
      yield put(createProductResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(createProductResult(error, isSuccess));
  }
}

function* updateImageSaga(props: any) {
  const { data, setError, setSuccess, updateImageProgress }: UploadImageData = props.payload;
  
  try {
    const response: ResponseResult = yield call(updateImageApi, data, (progress: number) => {
      updateImageProgress({ id: data.id, progress })
    });

    if (response.status === 201) {
      setSuccess(response);
      yield put(updateImageResult({ id: data.id }));
    } else {
      const isSuccess = false;
      yield put(createProductResult(response, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(createProductResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.CREATE_PRODUCT, createProductsSaga),
    takeEvery(types.UPDATE_IMAGE, updateImageSaga),
  ]);
}
