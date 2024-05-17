"use client";
import Image from "next/image";
import store from "../lib/storeProvider"
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/api/fetchhData";
import { increment, decrement, incrementByAmount } from "@/lib/locationSlice";


export default function Home() {
  const price = useSelector((state) => state.location.cardDetails.price);

  console.log(price)

  console.log(typeof price)
  const dispatch = useDispatch();


  return (
    <div>
      <p>{price}</p>
      <p>gygkhuiohlkjg hjvy</p>

      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(incrementByAmount(33))}>
        Increment by 33
      </button>
      <button onClick={() => dispatch(fetchUsers("MA"))}>
        Minus 7
      </button>
    </div>
    
  );
}
