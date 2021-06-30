import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  fetchResultsStart,
  fetchResultsSuccess,
  fetchResultsError,
} from "./reducer";

function* fetchResultsAsync() {
  try {
    const token = yield select((state) => state.auth.token);
    const {
      data: { results },
    } = yield axios.get(`${process.env.REACT_APP_API_URL}/results`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(
      fetchResultsSuccess({
        results,
      })
    );
  } catch (error) {
    yield put(
      fetchResultsError({
        error,
      })
    );
  }
}

function* onFetchResults() {
  yield takeLatest(fetchResultsStart.type, fetchResultsAsync);
}

function* resultSagas() {
  yield all([call(onFetchResults)]);
}
export default resultSagas;
