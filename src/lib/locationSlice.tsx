import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRent  } from "@/api/fetchhData";

// Define the interface for the location object
interface location {
    state: string;
    city: string;
    rental: number;
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
        state.locationDetails.city = ""
        state.locationDetails.complete = false
    },
    selectCity: (state,  action:PayloadAction<string>) => {
        state.locationDetails.city = action.payload;
        state.locationDetails.complete = true
    }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchRent.fulfilled, (state, action) => {
        state.locationDetails.rental = 1500;
      });
  
      builder.addCase(fetchRent.pending, (state, action) => {
        state.locationDetails.pending = true
      });

    }
  });

  export const { selectCity, selectState} = locationSlice.actions;

