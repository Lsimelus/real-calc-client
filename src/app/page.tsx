"use client";
import Image from "next/image";
import store from "../lib/storeProvider"
import { useDispatch, useSelector } from "react-redux";
import { fetchTax, fetchRental } from '../api';
import { increment, decrement } from "@/lib/locationSlice";


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
    </div>
    
  );
}
