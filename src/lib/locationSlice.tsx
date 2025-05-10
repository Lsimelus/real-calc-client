import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStateInfo, fetchCityInfo  } from "@/api/fetchhData";

// Define the interface for the location object
export interface location {
    state: string;
    city: string;
    rental: number;
    cityOptions: string[]
    county: string | null;
    medianValue: number;
    medianTax: string;
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
      medianTax: "",
      medianValue: 0,
      county: "",
      cityOptions: [],
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
    // selectState: (state, action:PayloadAction<string>) => {
    //     state.locationDetails.state = action.payload;
    //     state.locationDetails.city = ""
    //     state.locationDetails.complete = false
    // },
    // selectCity: (state,  action:PayloadAction<string>) => {
    //     state.locationDetails.city = action.payload;
    //     state.locationDetails.complete = !(action.payload == "");
    // }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchStateInfo.fulfilled, (state, action) => {
        state.locationDetails.cityOptions = action.payload.cities
        state.locationDetails.state = action.payload.state;
        state.locationDetails.pending = false
        state.locationDetails.rental = 1500;
        state.locationDetails.city = "";
      });
      builder.addCase(fetchStateInfo.pending, (state, action) => {
        state.locationDetails.pending = true
      });

      builder.addCase(fetchCityInfo.fulfilled, (state, action) => {
        state.locationDetails.county = action.payload.county;
        state.locationDetails.medianTax = action.payload.median_ax || "";
        state.locationDetails.medianValue = action.payload.median_value;
        state.locationDetails.city = action.payload.city;
        state.locationDetails.complete = true
      });
      builder.addCase(fetchCityInfo.pending, (state, action) => {
        state.locationDetails.pending = true
      });
    }
  });

  export const { selectCity, selectState} = locationSlice.actions;

