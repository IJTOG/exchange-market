import { createSocketChannel, createWebSocketConnection } from "@/services/ws";
import { createAction } from "@reduxjs/toolkit";
import {
  call,
  put,
  all,
  takeLatest,
  cancelled,
  take
} from "redux-saga/effects";
import { setPairState } from "store/pairSlice";

export const tickerStream = createAction<string>("saga/tickerStream");

export function* fetchDataSaga({ payload }: { payload: string }): any {
  let socket;
  let socketChannel;

  try {
    socket = yield call(createWebSocketConnection);
    socketChannel = yield call(createSocketChannel, socket);

    while (true) {
      // wait for a message from the channel
      const pl = yield take(socketChannel);
      const result = pl.find((item: any) => item.s === payload.toLowerCase());

      // a message has been received, dispatch an action with the message payload
      yield put(
        setPairState({
          symbol: result.s,
          volume: result.v,
          lastPrice: result.c
        })
      );
    }
  } catch {
  } finally {
    if (yield cancelled()) {
      // close the channel
      socketChannel.close();

      // close the WebSocket connection
      socket.close();
    }
  }
}

export function* watchPairSaga(): any {
  yield all([yield takeLatest(tickerStream, fetchDataSaga)]);
}
