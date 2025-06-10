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
      complete: true
    },
  };

  export const taxSlice = createSlice({
    name: "tax", 
    initialState,
    reducers: {
    clearState: (state) => {
        state = initialState
    },
    selectExact: (state, action:PayloadAction<number>) => {

      state.taxDetails.exact = action.payload;
    },
    },
  });

  export const {selectExact} = taxSlice.actions;

