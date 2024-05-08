import { createSlice, Dispatch } from "@reduxjs/toolkit";

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
    }
    }
  });

  export const { increment, decrement } = cardSlice.actions;

