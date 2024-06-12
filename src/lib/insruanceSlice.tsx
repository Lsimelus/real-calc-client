import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface insurance {
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  
  interface insuranceState {
    taxDetails: insurance;
  }

  const initialState: insuranceState = {
    taxDetails: {
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

