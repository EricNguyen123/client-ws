/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoriesPaginationData, CreateCategoriesData, DeleteCategoryData, GetCategoriesData, ResponseResult, UpdateCategoriesData } from "@/types/redux";
import types from "./type";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { createCategoryApi, deleteCategoryApi, getAllCategoriesApi, searchCategoriesPaginationApi, updateCategoryApi } from "./api";
import { createCategoriesResult, deleteCategoriesResult, getAllCategories, getAllCategoriesResult, getCategories, getCategoriesResult, updateCategoriesResult } from "./actions";
import { LIMIT } from "@/constant";
import { offset } from "@/utils";

const getCurrentPage = (state: any) => state.category.pages.currentPage;

function* searchCategoriesSaga(props: any) {
  const { data, setError, setSuccess }: CategoriesPaginationData = props.payload;
  
  try {
    const res: ResponseResult = yield call(searchCategoriesPaginationApi, data);

    if (res.status === 200) {
      setSuccess(res);
      yield put(getCategoriesResult(res));
      yield put(getAllCategories({
        setError: (error) => {},
        setSuccess: (success) => {}
      }));
    } else {
      const isSuccess = false;
      yield put(getCategoriesResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(getCategoriesResult(error, isSuccess));
  }
}

function* createCategoriesSaga(props: any) {
  const { data, setError, setSuccess }: CreateCategoriesData = props.payload;
  
  try {
    const res: ResponseResult = yield call(createCategoryApi, data);

    if (res.status === 201) {
      setSuccess(res);
      yield put(createCategoriesResult(res));
      yield put(getAllCategories({
        setError: (error) => {},
        setSuccess: (success) => {}
      }));
      const currentPage: number = yield select(getCurrentPage);
      yield put(getCategories({
        data: {
          limit: LIMIT,
          offset:  offset(currentPage),
        },
        setError: (error) => {},
        setSuccess: (success) => {}
      }));
    } else {
      const isSuccess = false;
      yield put(createCategoriesResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(createCategoriesResult(error, isSuccess));
  }
}

function* getCategoriesSaga(props: any) {
  const { setError, setSuccess }: GetCategoriesData = props.payload;
  
  try {
    const res: ResponseResult = yield call(getAllCategoriesApi);

    if (res.status === 200) {
      setSuccess(res);
      yield put(getAllCategoriesResult(res));
    } else {
      const isSuccess = false;
      yield put(getAllCategoriesResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(getAllCategoriesResult(error, isSuccess));
  }
}

function* updateCategoriesSaga(props: any) {
  const { data, setError, setSuccess }: UpdateCategoriesData = props.payload;
  
  try {
    const res: ResponseResult = yield call(updateCategoryApi, data);

    if (res.status === 200) {
      setSuccess(res);
      yield put(updateCategoriesResult(res));
      yield put(getAllCategories({
        setError: (error) => {},
        setSuccess: (success) => {}
      }));
      const currentPage: number = yield select(getCurrentPage);
      yield put(getCategories({
        data: {
          limit: LIMIT,
          offset:  offset(currentPage),
        },
        setError: (error) => {},
        setSuccess: (success) => {}
      }));
    } else {
      const isSuccess = false;
      yield put(updateCategoriesResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(updateCategoriesResult(error, isSuccess));
  }
}

function* deleteCategorySaga(props: any) {
  const { data, setError, setSuccess }: DeleteCategoryData = props.payload;
  
  try {
    const res: ResponseResult = yield call(deleteCategoryApi, data);

    if (res.status === 200) {
      setSuccess(res);
      yield put(deleteCategoriesResult(res));
      yield put(getAllCategories({
        setError: (error) => {},
        setSuccess: (success) => {}
      }));
      const currentPage: number = yield select(getCurrentPage);
      yield put(getCategories({
        data: {
          limit: LIMIT,
          offset:  offset(currentPage),
        },
        setError: (error) => {},
        setSuccess: (success) => {}
      }));
    } else {
      const isSuccess = false;
      yield put(deleteCategoriesResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(deleteCategoriesResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.GET_CATEGORIES, searchCategoriesSaga),
    takeEvery(types.CREATE_CATEGORY, createCategoriesSaga),
    takeEvery(types.GET_ALL_CATEGORIES, getCategoriesSaga),
    takeEvery(types.UPDATE_CATEGORY, updateCategoriesSaga),
    takeEvery(types.DELETE_CATEGORY, deleteCategorySaga),
  ]);
}
