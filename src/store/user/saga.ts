/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, call, put, takeEvery } from "redux-saga/effects";

import { changePasswordResult, createUserResult, deleteUserResult, deleteUsersResult, searchUsersPaginationResult, statisticalUserResult, updateAccountResult } from "./actions";
import { updateAccountApi, changePasswordApi, searchUsersPaginationApi, statisticalUsersApi, createUserApi, deleteUsersApi, deleteUserApi } from "./api";
import types from "./type";
import { ChangePasswordData, CreateUserData, DeleteUserData, DeleteUsersData, ResponseResult, StatisticalUserData, UpdateAccountData, UsersPaginationData } from "@/types/redux";
import { updateAuthResult } from "../auth/actions";

function* updateAccountSaga(props: any) {
  const { data, setError, setSuccess }: UpdateAccountData = props.payload;
  
  try {
    const res: ResponseResult = yield call(updateAccountApi, data);
    if (res.status === 200) {
      setSuccess(res);
      yield put(updateAccountResult({ data: res.data }));
      yield put(updateAuthResult({ data: res.data }));
    } else {
      const isSuccess = false;
      yield put(updateAccountResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(updateAccountResult(error, isSuccess));
  }
}

function* changePasswordSaga(props: any) {
  const { data, setError, setSuccess }: ChangePasswordData = props.payload;
  
  try {
    const res: ResponseResult = yield call(changePasswordApi, data);

    if (res.status === 201) {
      setSuccess(res);
      yield put(changePasswordResult(res));
    } else {
      const isSuccess = false;
      yield put(changePasswordResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(changePasswordResult(error, isSuccess));
  }
}

function* searchUsersPaginationSaga(props: any) {
  const { data, setError, setSuccess }: UsersPaginationData = props.payload;
  
  try {
    const res: ResponseResult = yield call(searchUsersPaginationApi, data);
    if (res.status === 200) {
      setSuccess(res);
      yield put(searchUsersPaginationResult(res));
    } else {
      const isSuccess = false;
      yield put(searchUsersPaginationResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(searchUsersPaginationResult(error, isSuccess));
  }
}

function* statisticalUsersSaga(props: any) {
  const { setError, setSuccess }: StatisticalUserData = props.payload;
  
  try {
    const res: ResponseResult = yield call(statisticalUsersApi);
    if (res.status === 200) {
      setSuccess(res);
      yield put(statisticalUserResult(res));
    } else {
      const isSuccess = false;
      yield put(statisticalUserResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(statisticalUserResult(error, isSuccess));
  }
}

function* createUserSaga(props: any) {
  const { data, setError, setSuccess }: CreateUserData = props.payload;
  
  try {
    const res: ResponseResult = yield call(createUserApi, data);
    if (res.status === 201) {
      setSuccess(res);
      yield put(createUserResult(res));
    } else {
      const isSuccess = false;
      yield put(createUserResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(createUserResult(error, isSuccess));
  }
}

function* deleteUsersSaga(props: any) {
  const { data, setError, setSuccess }: DeleteUsersData = props.payload;
  
  try {
    const res: ResponseResult = yield call(deleteUsersApi, data);
    if (res.status === 200) {
      setSuccess(res);
      yield put(deleteUsersResult(res));
    } else {
      const isSuccess = false;
      yield put(deleteUsersResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(deleteUsersResult(error, isSuccess));
  }
}

function* deleteUserSaga(props: any) {
  const { data, setError, setSuccess }: DeleteUserData = props.payload;
  
  try {
    const res: ResponseResult = yield call(deleteUserApi, data);

    if (res.status === 200) {
      setSuccess(res);
      yield put(deleteUserResult(res));
    } else {
      const isSuccess = false;
      yield put(deleteUserResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(deleteUserResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.UPDATE_ACCOUNT, updateAccountSaga),
    takeEvery(types.CHANGE_PASSWORD, changePasswordSaga),
    takeEvery(types.SEARCH_USERS_PAGINATION, searchUsersPaginationSaga),
    takeEvery(types.STATISTICAL_USERS, statisticalUsersSaga),
    takeEvery(types.CREATE, createUserSaga),
    takeEvery(types.DELETE_USERS, deleteUsersSaga),
    takeEvery(types.DELETE_USER, deleteUserSaga),
  ]);
}
