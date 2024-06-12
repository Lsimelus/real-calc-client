import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface tax {
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  
  interface taxState {
    taxDetails: tax ;
  }

  const initialState: taxState = {
    taxDetails: {
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
    }
    },
  });

  export const {} = taxSlice.actions;

