import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface tax {
    national: number;
    local: number | null;
    exact: number| null;
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  
  interface taxState {
    taxDetails: tax ;
  }

  const initialState: taxState = {
    taxDetails: {
      national: .35,
      local: null,
      exact: null,
      pending: false,
      error: [],
      complete: false
    },
  };

  export const taxSlice = createSlice({
    name: "tax", 
    initialState,
    reducers: {
    clearState: (state) => {
        state = initialState
    },
    selectLocal: (state, action:PayloadAction<number>) => {
      state.taxDetails.local = action.payload;
    },
    selectExact: (state, action:PayloadAction<number>) => {
      state.taxDetails.exact = action.payload;
      state.taxDetails.complete = action.payload !== null;
    },
    },
  });

  export const {} = taxSlice.actions;

