import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface price {
    homePrice: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  
  interface priceState {
    priceDetails: price;
  }

  const initialState: priceState = {
    priceDetails: {
      homePrice: 0,
      downPaymentPercent: 3.5,
      downPaymentAmount: 0,
      pending: false,
      error: [],
      complete: false
    },
  };

  export const priceSlice = createSlice({
    name: "price", 
    initialState,
    reducers: {
    clearState: (state) => {
        state = initialState
    },
    selectPrice: (state, action:PayloadAction<number>) => {
      state.priceDetails.homePrice = action.payload;
      state.priceDetails.complete = action.payload > 0
    },
    selectDownPayment: (state,  action:PayloadAction<number>) => {
        state.priceDetails.downPaymentPercent = action.payload;
        state.priceDetails.complete = true
    },
    selectDownPaymentAmount: (state,  action:PayloadAction<number>) => {
      state.priceDetails.downPaymentAmount = action.payload;
    }
    },
  });

  export const {selectPrice, selectDownPayment, selectDownPaymentAmount} = priceSlice.actions;

