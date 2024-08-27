import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

export interface insurance {
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  
  interface insuranceState {
    insruanceDetails: insurance;
  }

  const initialState: insuranceState = {
    insuranceDetails: {
      pending: false,
      error: [],
      complete: false
    },
  };

  export const insuranceSlice = createSlice({
    name: "loan", 
    initialState,
    reducers: {
    clearState: (state) => {
        state = initialState
    }
    },
  });

  export const {} = insuranceSlice.actions;

