import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  fetchSingleQuestionStart,
  fetchSingleQuestionSuccess,
  fetchSingleQuestionError,
  fetchQuestionStart,
  fetchQuestionSuccess,
  fetchQuestionError,
  submitAnswerStart,
  submitAnswerSuccess,
  submitAnswerError,
} from "./reducer";

function* fetchSingleQuestionAsync() {
  try {
    const token = yield select((state) => state.auth.token);
    const {
      data: { question },
    } = yield axios.get(`${process.env.REACT_APP_API_URL}/questions/single`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(
      fetchSingleQuestionSuccess({
        question,
      })
    );
  } catch (error) {
    yield put(
      fetchSingleQuestionError({
        error,
      })
    );
  }
}

function* fetchQuestionAsync({ payload: { id } }) {
  try {
    const token = yield select((state) => state.auth.token);
    const {
      data: { question },
    } = yield axios.get(`${process.env.REACT_APP_API_URL}/questions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(
      fetchQuestionSuccess({
        id,
        question,
      })
    );
  } catch (error) {
    yield put(
      fetchQuestionError({
        id,
        error,
      })
    );
  }
}

function* submitAnswerAsync({ payload: { id, answers } }) {
  try {
    const token = yield select((state) => state.auth.token);
    const {
      data: { result },
    } = yield axios.post(
      `${process.env.REACT_APP_API_URL}/questions/submit`,
      {
        question: id,
        answers,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    yield put(
      submitAnswerSuccess({
        result,
      })
    );
  } catch (error) {
    yield put(
      submitAnswerError({
        id,
        error,
      })
    );
  }
}

function* onFetchSingleQuestion() {
  yield takeLatest(fetchSingleQuestionStart.type, fetchSingleQuestionAsync);
}

function* onFetchQuestion() {
  yield takeLatest(fetchQuestionStart.type, fetchQuestionAsync);
}

function* onSubmitAnswer() {
  yield takeLatest(submitAnswerStart.type, submitAnswerAsync);
}

function* questionSagas() {
  yield all([
    call(onFetchSingleQuestion),
    call(onFetchQuestion),
    call(onSubmitAnswer),
  ]);
}
export default questionSagas;
