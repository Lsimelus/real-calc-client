import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface confirm {
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  // Define the interface for the state managed by this slice
  interface confirmState {
    confirmDetails: confirm;
  }

  const initialState: confirmState = {
    confirmDetails: {
      pending: false,
      error: [],
      complete: false
    },
  };

  export const confirmSlice = createSlice({
    name: "confirm", 
    initialState,
    reducers: {
    clearState: (state) => {
        state = initialState
    }, 
    selectCompleteness: (state, action:PayloadAction<boolean>) => {
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~")
      console.log(action.payload)
      state.confirmDetails.complete = action.payload;
    }
    },
  });

  export const { selectCompleteness} = confirmSlice.actions;

