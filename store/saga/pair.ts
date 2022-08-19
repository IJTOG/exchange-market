import publicController from "@/services/api/public";
import { createAction } from "@reduxjs/toolkit";
import { call, put, all, takeLatest } from "redux-saga/effects";
import { setPairState } from "store/pairSlice";

export const fetch24hrsTicker = createAction<string>("saga/24hrsTicker");

function delay(duration: number) {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(true), duration);
  });
  return promise;
}

export function* fetchDataSaga({ payload }: { payload: string }): any {
  try {
    if (!payload) {
      return null;
    }
    let result = yield call(() => publicController().get24HrsTicker(payload));

    yield put(setPairState(result.data));
    yield call(delay, 5000);
    yield put(fetch24hrsTicker(payload));
  } catch (e) {
    console.log(e);
    // yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export function* watchPairSaga(): any {
  yield all([yield takeLatest(fetch24hrsTicker, fetchDataSaga)]);
}
