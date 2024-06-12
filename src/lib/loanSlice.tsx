import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface loan {
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  
  interface loanState {
    taxDetails: loan;
  }

  const initialState: loanState = {
    taxDetails: {
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
    }
    },
  });

  export const {} = loanSlice.actions;

