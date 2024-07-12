import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

type loanTypes = "" | 'investment' | 'conventional' | 'fha' | 'va' | 'usda';

interface loan {
    type: loanTypes;
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  
  interface loanState {
    loanDetails: loan;
  }

  const initialState: loanState = {
    loanDetails: {
      type: "",
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
      state.priceDetails.homePrice = action.payload;
      state.priceDetails.complete = action.payload > 0
    },
    },
  });

  export const {} = loanSlice.actions;

