import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { fetchTax, fetchRent  } from "@/api/fetchhData";

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
      national: .30,
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
      console.log("Selecting Exact", action.payload)
      state.taxDetails.exact = action.payload;
      state.taxDetails.complete = action.payload !== 0;
    },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchTax.fulfilled, (state, action) => {
        state.taxDetails.local = .35;
        state.taxDetails.pending = false
      });
  
      builder.addCase(fetchTax.pending, (state, action) => {
        state.taxDetails.pending = true
      });
    }
  });

  export const {} = taxSlice.actions;

