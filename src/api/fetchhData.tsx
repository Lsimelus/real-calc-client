import { createSlice, PayloadAction, createAsyncThunk,} from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (state: string,  { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  }
);

// export const fetchTax = createAsyncThunk("fetchTax", 
// async (state: string,  { rejectWithValue }) => {
//   try {
//     if (state == "?"){
//       return rejectWithValue("")
//     }
//   const response = await axios.get('api/taxes?state='+ state)
//   console.log("fetchTax")
//   //console.log(response["data"]["index"])
//   return "Test";
// }catch (err) {
//   return rejectWithValue("")
// }
// });
