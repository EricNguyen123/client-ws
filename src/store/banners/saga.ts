/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BannersPaginationData, CreateBannerData, DeleteBannerData, ResponseResult, UpdateBannerData } from "@/types/redux";
import types from "./type";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { createBannerApi, deleteBannerApi, searchBannersPaginationApi, updateBannerApi } from "./api";
import { createBannerResult, deleteBannerResult, getPageBanner, getPagerBannerResult, updateBannerResult } from "./actions";
import { LIMIT } from "@/constant";
import { offset } from "@/utils";

const getCurrentPage = (state: any) => state.banner.pages.currentPage;

function* createBannersSaga(props: any) {
  const { data, setError, setSuccess }: CreateBannerData = props.payload;
  const formData = new FormData();
  formData.append('descriptions', data.descriptions);
  formData.append('number_order', data.orderNumber);
  formData.append('start_date', data.startDate.toISOString());
  formData.append('end_date', data.endDate.toISOString());
  formData.append('file', data.image);
  try {
    const res: ResponseResult = yield call(createBannerApi, { formData });

    if (res.status === 201) {
      setSuccess(res);
      yield put(createBannerResult(res));
      const currentPage: number = yield select(getCurrentPage);
      yield put(getPageBanner({
        data: {
          limit: LIMIT,
          offset:  offset(currentPage),
        },
        setError: (error) => {},
        setSuccess: (success) => {}
      }));
    } else {
      const isSuccess = false;
      yield put(createBannerResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(createBannerResult(error, isSuccess));
  }
}

function* searchBannersSaga(props: any) {
  const { data, setError, setSuccess }: BannersPaginationData = props.payload;
  
  try {
    const res: ResponseResult = yield call(searchBannersPaginationApi, data);

    if (res.status === 200) {
      setSuccess(res);
      yield put(getPagerBannerResult(res));
    } else {
      const isSuccess = false;
      yield put(getPagerBannerResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(getPagerBannerResult(error, isSuccess));
  }
}

function* deleteBannerSaga(props: any) {
  const { data, setError, setSuccess }: DeleteBannerData = props.payload;
  
  try {
    const res: ResponseResult = yield call(deleteBannerApi, data);

    if (res.status === 200) {
      setSuccess(res);
      yield put(deleteBannerResult(res));
      const currentPage: number = yield select(getCurrentPage);
      yield put(getPageBanner({
        data: {
          limit: LIMIT,
          offset:  offset(currentPage),
        },
        setError: (error) => {},
        setSuccess: (success) => {}
      }));
    } else {
      const isSuccess = false;
      yield put(deleteBannerResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(deleteBannerResult(error, isSuccess));
  }
}

function* updateBannersSaga(props: any) {
  const { data, setError, setSuccess }: UpdateBannerData = props.payload;
  try {
    const res: ResponseResult = yield call(updateBannerApi, data);

    if (res.status === 200) {
      setSuccess(res);
      yield put(updateBannerResult(res));
      // const currentPage: number = yield select(getCurrentPage);
      // yield put(getPageBanner({
      //   data: {
      //     limit: LIMIT,
      //     offset:  offset(currentPage),
      //   },
      //   setError: (error) => {},
      //   setSuccess: (success) => {}
      // }));
    } else {
      const isSuccess = false;
      yield put(updateBannerResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(updateBannerResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.CREATE_BANNER, createBannersSaga),
    takeEvery(types.GET_BANNERS, searchBannersSaga),
    takeEvery(types.DELETE_BANNER, deleteBannerSaga),
    takeEvery(types.UPDATE_BANNER, updateBannersSaga),
  ]);
}
