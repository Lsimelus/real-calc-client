import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

export interface insurance {
  pending: boolean;
  error: string[];
  complete: boolean;
  exact: number;
}

interface insuranceState {
  insuranceDetails: insurance;
}

// Todo: pull rate from env variable
// MOck API response
const initialState: insuranceState = {
  insuranceDetails: {
    pending: false,
    error: [],
    complete: true,
    exact: 0,
  },
};

export const insuranceSlice = createSlice({
  name: "insurance",
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState;
    },
    selectExact: (state, action: PayloadAction<number>) => {
      state.insuranceDetails.exact = action.payload;
    },
  },
});

export const { selectExact } = insuranceSlice.actions;
