/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateColorData, DeleteColorData, GetColorsData, ResponseResult } from "@/types/redux";
import types from "./type";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { createColorApi, deleteColorApi, getColorsApi } from "./api";
import { createColorResult, deleteColorResult, getColors, getColorsResult } from "./actions";

function* createColorsSaga(props: any) {
  const { data, setError, setSuccess }: CreateColorData = props.payload;
  
  try {
    const res: ResponseResult = yield call(createColorApi, data);

    if (res.status === 201) {
      setSuccess(res);
      yield put(createColorResult(res.data));
      yield put(getColors({
        setError: (error) => {},
        setSuccess: (success) => {}
      }))
    } else {
      const isSuccess = false;
      yield put(createColorResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(createColorResult(error, isSuccess));
  }
}

function* getColorsSaga(props: any) {
  const { setError, setSuccess }: GetColorsData = props.payload;
  
  try {
    const res: ResponseResult = yield call(getColorsApi);

    if (res.status === 200) {
      setSuccess(res);
      yield put(getColorsResult(res.data));
    } else {
      const isSuccess = false;
      yield put(getColorsResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(getColorsResult(error, isSuccess));
  }
}

function* deleteColorSaga(props: any) {
  const { data, setError, setSuccess }: DeleteColorData = props.payload;
  
  try {
    const res: ResponseResult = yield call(deleteColorApi, data);

    if (res.status === 200) {
      setSuccess(res);
      yield put(deleteColorResult(res));
      yield put(getColors({
        setError: (error) => {},
        setSuccess: (success) => {}
      }))
    } else {
      const isSuccess = false;
      yield put(deleteColorResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(deleteColorResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.CREATE_COLOR, createColorsSaga),
    takeEvery(types.GET_ALL_COLORS, getColorsSaga),
    takeEvery(types.DELETE_COLOR, deleteColorSaga),
  ]);
}
