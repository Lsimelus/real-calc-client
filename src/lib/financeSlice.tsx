import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loanTypes } from "../constants/types";
import { cardTypes } from "../components/questions/loan";

export interface finance {
  type: loanTypes;
  rate: number;
  exactRate: number;
  length: number;
  priceComplete: boolean;
  loanComplete: boolean;
  homePrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  minDownpayment: number;
  pending: boolean;
  error: string[];
  complete: boolean;
}

interface financeState {
  financeDetails: finance;
}

const initialState: financeState = {
  financeDetails: {
    type: loanTypes.None,
    rate: -1,
    exactRate: 0,
    length: 30,
    priceComplete: false,
    loanComplete: false,
    homePrice: 0,
    downPaymentPercent: 3,
    downPaymentAmount: 0,
    minDownpayment: 0.0,
    pending: false,
    error: [],
    complete: false,
  },
};

export const financeSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState;
    },
    selectType: (state, action: PayloadAction<loanTypes>) => {
      state.financeDetails.type = action.payload;
      state.financeDetails.rate = cardTypes[action.payload].rates;
      state.financeDetails.minDownpayment =
        cardTypes[action.payload].minDownpayment;
      if (
        state.financeDetails.minDownpayment >
        state.financeDetails.downPaymentPercent
      ) {
        state.financeDetails.downPaymentPercent =
          state.financeDetails.minDownpayment;
      }

      state.financeDetails.loanComplete = action.payload !== "";
    },
    selectExactRate: (state, action: PayloadAction<number>) => {
      state.financeDetails.exactRate = action.payload;
    },
    selectLength: (state, action: PayloadAction<number>) => {
      state.financeDetails.length = action.payload;
    },

    selectPrice: (state, action: PayloadAction<number>) => {
      state.financeDetails.homePrice = action.payload;
      state.financeDetails.priceComplete = action.payload > 0;
    },
    selectDownPayment: (state, action: PayloadAction<number>) => {
      state.financeDetails.downPaymentPercent = action.payload;
    },
    selectDownPaymentAmount: (state, action: PayloadAction<number>) => {
      state.financeDetails.downPaymentAmount = action.payload;
    },
  },
});

export const {
  selectType,
  selectExactRate,
  selectPrice,
  selectDownPayment,
  selectDownPaymentAmount,
  selectLength,
} = financeSlice.actions;
