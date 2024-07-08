import { configureStore } from '@reduxjs/toolkit'
import {locationSlice} from "../lib/locationSlice"
import { priceSlice } from './priceSlice'
import { taxSlice } from './taxSlice'
import { loanSlice } from './loanSlice'
import { insuranceSlice } from './insruanceSlice'
import {feesSlice} from './feesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      location: locationSlice.reducer,
      price: priceSlice.reducer,
      tax: taxSlice.reducer,
      loan: loanSlice.reducer,
      insurance: insuranceSlice.reducer,
      fees: feesSlice.reducer,
  },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']