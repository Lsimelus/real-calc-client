import { createSlice, PayloadAction, createAsyncThunk,} from "@reduxjs/toolkit";


export const fetchTax = createAsyncThunk(
  "location/fetchTax",
  async (state: string,  { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  }
);

export const fetchRent = createAsyncThunk(
  "location/fetchRent",
  async (state: string,  { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  }
);
