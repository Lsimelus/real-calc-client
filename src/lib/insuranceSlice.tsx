import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

export interface insurance {
    pending: boolean;
    error: string[];
    complete: boolean;
    exact: number;
    exactOption: boolean;
    default: number;
  }
  
  
  interface insuranceState {
    insuranceDetails: insurance;
  }

  const initialState: insuranceState = {
    insuranceDetails: {
      pending: false,
      error: [],
      complete: true,
      exact: 0,
      exactOption: false,
      default: 0.01
    },
  };

  export const insuranceSlice = createSlice({
    name: "insurance", 
    initialState,
    reducers: {
    clearState: (state) => {
        state = initialState
    },
    selectExact: (state, action:PayloadAction<number>) => {

      state.insuranceDetails.exact = action.payload;
      state.insuranceDetails.complete = action.payload !== 0;
    },
    selectExactOption: (state, action:PayloadAction<boolean>) => {
      state.insuranceDetails.exactOption = action.payload;
      if (action.payload == false) {
        state.insuranceDetails.complete =  true;
        state.insuranceDetails.exact = 0.0;
      }else{
        state.insuranceDetails.complete =  false;
      }
    },
    },
  });

  export const {selectExact, selectExactOption} = insuranceSlice.actions;

