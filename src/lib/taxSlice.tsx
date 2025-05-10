import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
//import { fetchTax, fetchRent  } from "@/api/fetchhData";

export interface tax {
    exact: number;
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  
  interface taxState {
    taxDetails: tax ;
  }

  // Todo: Pull from env variable
  const initialState: taxState = {
    taxDetails: {
      exact: 0,
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
      state.taxDetails.complete = action.payload !== 0;
    },
    },
  });

  export const {selectExact} = taxSlice.actions;

