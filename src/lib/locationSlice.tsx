import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "@/api/fetchhData";

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
    name: "cards", // Name of the slice
    initialState, // Initial state
    reducers: {
    increment: (state) => {
      console.log("increment")
        state.locationDetails.rental += 1;
    },
    decrement: (state) => {
      console.log("decrement")
        state.locationDetails.rental  -= 1;
    },
    incrementByAmount: (state, action:PayloadAction<number>) => {
      state.locationDetails.rental += action.payload;
    }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.locationDetails.rental -= 100;
      });
  
      builder.addCase(fetchUsers.pending, (state, action) => {
        console.log("loading")
      });
    }
  });

  export const { increment, decrement, incrementByAmount } = locationSlice.actions;

