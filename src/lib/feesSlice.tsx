import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

export interface fees {
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  
  interface feesState {
    taxDetails: fees;
  }

  const initialState: feesState = {
    taxDetails: {
      pending: false,
      error: [],
      complete: false
    },
  };

  export const feesSlice = createSlice({
    name: "fees", 
    initialState,
    reducers: {
    clearState: (state) => {
        state = initialState
    }
    },
  });

  export const {} = feesSlice.actions;

