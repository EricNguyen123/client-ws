import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import userSaga from "./user/saga";
import categorySaga from "./categories/saga";
import bannerSaga from "./banners/saga";

export default function* rootSaga() {
  yield all([
    authSagas(),
    userSaga(),
    categorySaga(),
    bannerSaga(),
  ]);
}
