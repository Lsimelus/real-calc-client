import { createSlice, PayloadAction, createAsyncThunk,} from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (thunkApi) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  }
);
