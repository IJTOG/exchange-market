import { configureStore } from "@reduxjs/toolkit";
import { pairSlice } from "./pairSlice";
import createSagaMiddleware from "redux-saga";
import { watchPairSaga } from "./saga/pair";

const sagaMiddleware = createSagaMiddleware();

const makeStore = configureStore({
  reducer: {
    [pairSlice.name]: pairSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production"
});

sagaMiddleware.run(watchPairSaga);

export const store = makeStore;
