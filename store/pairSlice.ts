import { Pair } from "@/services/interfaces/pair";
import { createSlice } from "@reduxjs/toolkit";

export interface PairState {
  pairState: Pair;
}

const initialState: PairState = {
  pairState: {
    symbol: "",
    priceChange: "",
    priceChangePercent: "",
    weightedAvgPrice: "",
    prevClosePrice: "",
    lastPrice: "",
    lastQty: "",
    bidPrice: "",
    askPrice: "",
    openPrice: "",
    highPrice: "",
    lowPrice: "",
    volume: "",
    quoteVolume: "",
    openTime: 0,
    closeTime: 0,
    firstId: 0,
    lastId: 0,
    count: 0
  }
};

export const pairSlice = createSlice({
  name: "pair",
  initialState,
  reducers: {
    // Action to set the authentication status
    setPairState(state, action) {
      state.pairState = action.payload;
    }
  }
});

export const { setPairState } = pairSlice.actions;

export const selectPairState = (state: any): Pair => state.pair.pairState;

export default pairSlice.reducer;
