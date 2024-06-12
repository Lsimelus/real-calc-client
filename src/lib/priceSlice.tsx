import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface price {
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  
  interface priceState {
    priceDetails: price;
  }

  const initialState: priceState = {
    priceDetails: {
      pending: false,
      error: [],
      complete: false
    },
  };

  export const priceSlice = createSlice({
    name: "price", 
    initialState,
    reducers: {
    clearState: (state) => {
        state = initialState
    }
    },
  });

  export const {} = priceSlice.actions;

