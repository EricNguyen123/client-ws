/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  changeForgotPasswordResult,
  forgotPasswordResult,
  loginResult,
  loginWithGoogleResult,
  logoutResult,
  registerResult,
  verifyOTPResult,
} from "./actions";
import {
  changeForgotPasswordApi,
  forgotPasswordApi,
  loginApi,
  loginWithGoogleApi,
  logoutApi,
  registerApi,
  verifyOTPApi,
} from "./api";
import types from "./type";
import { checkTokenExpiration, setAuthToken } from "@/utils";
import { ChangeForgotPasswordData, LoginData, LoginResponseResult, RegisterData, RegisterResponseResult, ResponseResult } from "@/types/redux";
import { updateUserResult } from "../user/actions";
import { refreshStatusUser } from "@/utils/api";

function* registerSaga(props: any) {
  const { data, setError }: RegisterData = props.payload;
  try {
    const res: RegisterResponseResult = yield call(registerApi, data);
    if (res.status === 201) {
      yield put(registerResult({ data: res.data }));
      setAuthToken(res.headers);
      localStorage.setItem("headers", JSON.stringify(res.headers));
    } else {
      const isSuccess = false;
      yield put(registerResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(registerResult(error, isSuccess));
  }
}

function* loginSaga(props: any) {
  const { data, setError }: LoginData = props.payload;
  try {
    const res: LoginResponseResult = yield call(loginApi, data);

    if (res.status === 201) {
      const status = res.data.user.status;
      if (status) {
        const role = res.data.user.role
        yield put(loginResult({ data: res.data, role }));
        yield put(updateUserResult({ data: res.data.user }))
        localStorage.setItem("headers", JSON.stringify(res.headers));
        localStorage.setItem("token", res.data.token)
      } else {
        const isSuccess = false;
        yield put(loginResult(res, isSuccess));
      }
    } else {
      const isSuccess = false;
      yield put(loginResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(loginResult(error, isSuccess));
  };
}

function* loginWithGoogleSaga(props: any) {
  try {
    const { email } = props.payload;
    const res: LoginResponseResult = yield call(loginWithGoogleApi, { email: email });

    if (res.status === 201) {
      const status = res.data.user.role;
      if (status) {
        const role = res.data.user.role
        yield put(loginWithGoogleResult({ data: res.data, role }));
        yield put(updateUserResult({ data: res.data.user }))
        localStorage.setItem("headers", JSON.stringify(res.headers));
        localStorage.setItem("token", res.data.token)
      } else {
        const isSuccess = false;
        yield put(loginWithGoogleResult(res, isSuccess));
      }
    } else {
      const isSuccess = false;
      yield put(loginWithGoogleResult(res, isSuccess));
    }
  } catch (error) {
    const isSuccess = false;
    yield put(loginWithGoogleResult(error, isSuccess));
  };
}

function* logoutSaga(props: any) {
  try {
    const { handleRedirect } = props.payload;
    const token = localStorage.getItem('token');
    if (checkTokenExpiration(token)) {
      refreshStatusUser();
      yield handleRedirect();
    } else {
      const res: ResponseResult = yield call(logoutApi,{ token: localStorage.getItem('token') });
      localStorage.clear();
      yield handleRedirect();
      yield put(logoutResult(res.data));
    }
  } catch (error) {
    const isSuccess = false;
    yield put(logoutResult(error, isSuccess));
  }
}

function* forgotPassword(props: any) {
  const { data, setError, setSuccess } = props.payload;
  try {
    const res: ResponseResult = yield call(forgotPasswordApi, { email: data.email });
    
    if (res.status === 201) {
      setSuccess(res.data);
      yield put(forgotPasswordResult({ data: res.data }));
    } else {
      const isSuccess = false;
      yield put(forgotPasswordResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(forgotPasswordResult(error, isSuccess));
  }
}

function* verifyOTP(props: any) {
  const { data, setError, setSuccess } = props.payload;
  try {
    const res: ResponseResult = yield call(verifyOTPApi, { email: data.email, otp: data.otp });

    if (res.status === 201) {
      setSuccess(res.data);
      yield put(verifyOTPResult({ data: res.data }));
    } else {
      const isSuccess = false;
      yield put(verifyOTPResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(verifyOTPResult(error, isSuccess));
  }
}

function* changeForgotPasswordSaga(props: any) {
  const { data, setError, setSuccess }: ChangeForgotPasswordData = props.payload;

  try {
    const res: ResponseResult = yield call(changeForgotPasswordApi, data);

    if (res.status === 201) {
      setSuccess(res);
      yield put(changeForgotPasswordResult(res));
    } else {
      const isSuccess = false;
      yield put(changeForgotPasswordResult(res, isSuccess));
    }
  } catch (error) {
    setError(error);
    const isSuccess = false;
    yield put(changeForgotPasswordResult(error, isSuccess));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(types.REGISTER, registerSaga),
    takeEvery(types.LOGIN_WITH_GOOGLE, loginWithGoogleSaga),
    takeEvery(types.LOGIN, loginSaga),
    takeEvery(types.LOGOUT, logoutSaga),
    takeEvery(types.FORGOT_PASSWORD, forgotPassword),
    takeEvery(types.VERIFY_OTP, verifyOTP),
    takeEvery(types.CHANGE_FORGOT_PASSWORD, changeForgotPasswordSaga),
  ]);
}
