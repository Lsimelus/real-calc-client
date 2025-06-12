import { configureStore } from "@reduxjs/toolkit";
import { locationSlice } from "../lib/locationSlice";
import { taxSlice } from "./taxSlice";
import { insuranceSlice } from "./insuranceSlice";
import { feesSlice } from "./feesSlice";
import { confirmSlice } from "./confirmSlice";
import { financeSlice } from "./financeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      location: locationSlice.reducer,
      tax: taxSlice.reducer,
      insurance: insuranceSlice.reducer,
      fees: feesSlice.reducer,
      confirm: confirmSlice.reducer,
      finance: financeSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
