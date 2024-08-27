import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { fetchTax, fetchRent  } from "@/api/fetchhData";

export interface tax {
    national: number;
    local: number | null;
    exact: number| null;
    pending: boolean;
    error: string[];
    complete: boolean;
    exactOption: boolean;
  }
  
  
  interface taxState {
    taxDetails: tax ;
  }

  const initialState: taxState = {
    taxDetails: {
      national: .03,
      local: null,
      exact: null,
      exactOption: false,
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
    selectExactOption: (state, action:PayloadAction<boolean>) => {
      state.taxDetails.exactOption = action.payload;
      if (action.payload == false) {
        state.taxDetails.complete =  true;
        state.taxDetails.exact = 0.0;
      }else{
        state.taxDetails.complete =  false;
      }
    },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchTax.fulfilled, (state, action) => {
        state.taxDetails.local = .035;
        state.taxDetails.pending = false
      });
  
      builder.addCase(fetchTax.pending, (state, action) => {
        state.taxDetails.pending = true
      });
    }
  });

  export const {selectExact, selectExactOption} = taxSlice.actions;

