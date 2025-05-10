import { createSlice, PayloadAction, createAsyncThunk,} from "@reduxjs/toolkit";


export const fetchStateInfo = createAsyncThunk(
  "location/StateInfo",
  async (state: string,  { rejectWithValue }) => {
    const response = await fetch("http://127.0.0.1:5000/cities/"+state);
    const data = await response.json();
    return  data
  }
);

export const fetchCityInfo = createAsyncThunk(
  "location/fetchCityInfo",
  async (url: string, { rejectWithValue }) => {
    const response = await fetch("http://127.0.0.1:5000/items/"+ url);
    const data = await response.json();
    return  data;
  }
);
