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
      console.log("selectExact", action.payload)
      state.loanDetails.exact = action.payload;
      state.loanDetails.complete = state.loanDetails.exact !== 0.0;
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

  export const {selectType, selectRate, selectExact, selectExactOption} = loanSlice.actions;

