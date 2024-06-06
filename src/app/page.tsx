"use client";
import Image from "next/image";
import store from "../lib/storeProvider"
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/api/fetchhData";
import { increment, decrement, incrementByAmount } from "@/lib/locationSlice";
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox";

export default function Home() {
  const price = useSelector((state) => state.location.cardDetails.price);

  console.log(price)

  console.log(typeof price)
  const dispatch = useDispatch();


  return (
    <div>
      <p>{price}</p>
      <p>gygkhuiohlkjg hjvy</p>

      <Button onClick={() => dispatch(increment())}>increment</Button>
      <Button onClick={() => dispatch(decrement())}>decrement</Button>
      <Button onClick={() => dispatch(incrementByAmount(33))}>
        Increment by 33
      </Button>
      <Button onClick={() => dispatch(fetchUsers("MA"))}>
        Minus 7
      </Button>
      <Combobox></Combobox>

    </div>
    
  );
}
