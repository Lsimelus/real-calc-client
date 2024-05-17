import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "@/api/fetchhData";




interface Card {
    activity: string;
    type: string;
    participants: number;
    price: number;
    link: string;
    key: string;
    accessibility: number;
  }
  
  // Define the interface for the state managed by this slice
  interface CardState {
    cardDetails: Card;
  }

  const initialState: CardState = {
    cardDetails: {
      activity: "",
      type: "",
      participants: 0,
      price: 0,
      link: "",
      key: "",
      accessibility: 0,
    },
  };

  export const cardSlice = createSlice({
    name: "cards", // Name of the slice
    initialState, // Initial state
    reducers: {
    increment: (state) => {
      console.log("increment")
        state.cardDetails.price += 1;
    },
    decrement: (state) => {
      console.log("decrement")
        state.cardDetails.price -= 1;
    },
    incrementByAmount: (state, action:PayloadAction<number>) => {
      state.cardDetails.price += action.payload;
    }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.cardDetails.price -= 100;
      });
  
      builder.addCase(fetchUsers.pending, (state, action) => {
        console.log("loading")
      });
    }
  });

  export const { increment, decrement, incrementByAmount } = cardSlice.actions;

