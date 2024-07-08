import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTax, fetchRent  } from "@/api/fetchhData";

// Define the interface for the location object
interface location {
    state: string;
    city: string;
    rental: number;
    tax: number;
    pending: boolean;
    error: string[];
    complete: boolean;
  }
  
  // Define the interface for the state managed by this slice
  interface locationState {
    locationDetails: location;
  }

  const initialState: locationState = {
    locationDetails: {
      state: "",
      city: "",
      rental: 0,
      tax: 0,
      pending: false,
      error: [],
      complete: false
    },
  };

  export const locationSlice = createSlice({
    name: "location", 
    initialState,
    reducers: {
    clearState: (state) => {
        state = initialState
    }, 
    selectState: (state, action:PayloadAction<string>) => {
        state.locationDetails.state = action.payload;
        state.locationDetails.complete = state.locationDetails.city !== ""
    },
    selectCity: (state,  action:PayloadAction<string>) => {
        state.locationDetails.city = action.payload;
        state.locationDetails.complete = state.locationDetails.tax !== 0
    },
    incrementByAmount: (state, action:PayloadAction<number>) => {
      state.locationDetails.rental += action.payload;
    }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchTax.fulfilled, (state, action) => {
        state.locationDetails.tax = .35;
      });
  
      builder.addCase(fetchTax.pending, (state, action) => {
        console.log("loading")
        state.locationDetails.pending = true
      });
      builder.addCase(fetchRent.fulfilled, (state, action) => {
        state.locationDetails.rental = 1500;
      });
  
      builder.addCase(fetchRent.pending, (state, action) => {
        console.log("loading")
        state.locationDetails.pending = true
      });

    }
  });

  export const { selectCity, selectState} = locationSlice.actions;

