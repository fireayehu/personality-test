import { all, call } from "redux-saga/effects";
import authSagas from "./auth/saga";
import questionSaga from "./question/saga";
import resultSaga from "./result/saga";

function* rootSaga() {
  yield all([call(authSagas), call(questionSaga), call(resultSaga)]);
}

export default rootSaga;
