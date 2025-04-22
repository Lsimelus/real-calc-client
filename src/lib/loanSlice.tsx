import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { loanTypes } from "../constants/types";

//type loanTypes = "" | 'investment' | 'conventional' | 'fha' | 'va' | 'usda';



export interface loan {
    type: loanTypes;
    rate: number | null;
    exact: number | null;
    exactOption: boolean;
    pending: boolean;
    error: string[];
    complete: boolean;
    length: number;
    pi: number
    amortization: number[][];
  }
  
  
  interface loanState {
    loanDetails: loan;
  }

  const initialState: loanState = {
    loanDetails: {
      type: loanTypes.None,
      rate: null,
      exact: 0.0,
      exactOption: false,
      length: 30,
      pi: 0,
      amortization: [],
      pending: false,
      error: [],
      complete: false
    },
  };

  export const loanSlice = createSlice({
    name: "loan", 
    initialState,
    reducers: {
    clearState: (state) => {
        state = initialState
    },
    selectType: (state, action:PayloadAction<loanTypes>) => {
      state.loanDetails.type = action.payload;
      state.loanDetails.complete = action.payload !== "";
    },
    selectRate: (state, action:PayloadAction<number>) => {
      state.loanDetails.rate = action.payload;
      state.loanDetails.complete = state.loanDetails.rate !== null;

    },
    selectExact: (state, action:PayloadAction<number>) => {
      state.loanDetails.exact = action.payload;
      state.loanDetails.complete = state.loanDetails.exact !== 0.0;
    },
    selectPI: (state, action:PayloadAction<number>) => {
      state.loanDetails.pi = action.payload;
    },
    selectAmortization: (state, action:PayloadAction<any>) => {
      state.loanDetails.amortization = action.payload;
    },

    selectExactOption: (state, action:PayloadAction<boolean>) => {
      state.loanDetails.exactOption = action.payload;
      if (action.payload == false) {
        state.loanDetails.complete =  true;
        state.loanDetails.exact = 0.0;
      }else{
        state.loanDetails.complete =  false;
      }
    },
    },
  });

  export const {selectType, selectRate, selectExact, selectExactOption, selectAmortization, selectPI} = loanSlice.actions;

