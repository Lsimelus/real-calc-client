import { createSlice } from "@reduxjs/toolkit";
import { fetchStateInfo, fetchCityInfo } from "@/api/fetchData";

// Define the interface for the location object
export interface location {
  state: string;
  city: string;
  rental: number;
  cityOptions: string[];
  county: string | null;
  medianValue: number;
  medianTax: number;
  medianRent: number;
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
    medianTax: 0,
    medianValue: 0,
    county: "",
    medianRent: 0,
    cityOptions: [],
    pending: false,
    error: [],
    complete: false,
  },
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStateInfo.fulfilled, (state, action) => {
      state.locationDetails.cityOptions = action.payload.cities;
      state.locationDetails.state = action.payload.state;
      state.locationDetails.pending = false;
      state.locationDetails.rental = 1500;
      state.locationDetails.city = "";
      state.locationDetails.medianTax = 0;
      state.locationDetails.medianValue = 0;
      state.locationDetails.medianRent = 0;
    });
    builder.addCase(fetchStateInfo.pending, (state, action) => {
      state.locationDetails.pending = true;
    });

    builder.addCase(fetchCityInfo.fulfilled, (state, action) => {
      state.locationDetails.county = action.payload.county;

      state.locationDetails.medianTax = parseFloat(action.payload.median_tax);
      state.locationDetails.medianValue = parseInt(action.payload.median_value);
      state.locationDetails.medianRent = parseInt(action.payload.median_rent);
      state.locationDetails.city = action.payload.city;
      state.locationDetails.complete = true;
    });
    builder.addCase(fetchCityInfo.pending, (state, action) => {
      state.locationDetails.pending = true;
    });
  },
});
