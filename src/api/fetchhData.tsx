import { createSlice, PayloadAction, createAsyncThunk,} from "@reduxjs/toolkit";


export const fetchStateInfo = createAsyncThunk(
  "location/StateInfo",
  async (state: string,  { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return  { state: "MA", tax: 186, cities: ["Boston", "Everett", "Medford"] }
  }
);

export const fetchCityInfo = createAsyncThunk(
  "location/fetchCityInfo",
  async (state: string,  { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return  { state: "MA", tax: 186, cities: ["Boston", "Everett", "Medford"] };
  }
);
