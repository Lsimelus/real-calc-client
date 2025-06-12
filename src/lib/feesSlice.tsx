import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

export interface fees {
  pending: boolean;
  error: string[];
  complete: boolean;
  fee: number;
}

interface feesState {
  feesDetails: fees;
}

const initialState: feesState = {
  feesDetails: {
    pending: false,
    error: [],
    complete: true,
    fee: 0,
  },
};

export const feesSlice = createSlice({
  name: "fees",
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState;
    },
    setFee: (state, action: PayloadAction<number>) => {
      state.feesDetails.fee = action.payload;
    },
  },
});

export const { setFee } = feesSlice.actions;
