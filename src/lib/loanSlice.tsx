import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { loanTypes } from "../constants/types";

//type loanTypes = "" | 'investment' | 'conventional' | 'fha' | 'va' | 'usda';



interface loan {
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
      state.loanDetails.complete = action.payload !== loanTypes.null;
    },
    selectRate: (state, action:PayloadAction<number>) => {
      state.loanDetails.rate = action.payload;
      state.loanDetails.complete = state.loanDetails.rate !== null;

    },
    selectExact: (state, action:PayloadAction<number>) => {
      state.loanDetails.exact = action.payload;
      state.loanDetails.complete = state.loanDetails.exact !== null;
    },
    selectExactOption: (state, action:PayloadAction<boolean>) => {
      state.loanDetails.exactOption = action.payload;
      if (action.payload == false) {
        state.loanDetails.complete =  false;
        state.loanDetails.exact = 0.0;
      }
      
    },
    },
  });

  export const {selectType, selectRate, selectExact} = loanSlice.actions;

