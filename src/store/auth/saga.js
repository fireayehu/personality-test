import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  loginStart,
  loginSuccess,
  loginError,
  signUpStart,
  signUpSuccess,
  signUpError,
} from "./reducer";

function* loginAsync({ payload: { phoneNumber } }) {
  try {
    const {
      data: { token, user },
    } = yield axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
      phoneNumber,
    });
    yield put(
      loginSuccess({
        user,
        token,
      })
    );
  } catch (error) {
    yield put(
      loginError({
        error,
      })
    );
  }
}

function* signUpAsync({ payload: { phoneNumber } }) {
  try {
    const {
      data: { token, user },
    } = yield axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, {
      phoneNumber,
    });
    yield put(
      signUpSuccess({
        user,
        token,
      })
    );
  } catch (error) {
    yield put(
      signUpError({
        error,
      })
    );
  }
}

function* onLogin() {
  yield takeLatest(loginStart.type, loginAsync);
}

function* onSignUp() {
  yield takeLatest(signUpStart.type, signUpAsync);
}
function* authSagas() {
  yield all([call(onLogin), call(onSignUp)]);
}
export default authSagas;
