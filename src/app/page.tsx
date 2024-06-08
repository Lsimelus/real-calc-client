"use client";
import Image from "next/image";
import store from "../lib/storeProvider"
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/api/fetchhData";
import { increment, decrement, incrementByAmount } from "@/lib/locationSlice";
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox";
import { Car } from "lucide-react";
import { QuestionCard } from "@/components/ui/questioncard";
import { QuestionCarousel } from "@/components/ui/questioncarousel";
import { Progress } from "@/components/ui/progress"


export default function Home() {
  const price = useSelector((state) => state.location.locationDetails.rental);

  console.log(price)

  console.log(typeof price)
  const dispatch = useDispatch();


  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3" >title</div>
      <Progress value={33} />
      <QuestionCarousel/>
      <p>{price}</p>

      <Button onClick={() => dispatch(increment())}>increment</Button>
      <Button onClick={() => dispatch(decrement())}>decrement</Button>
      <Button onClick={() => dispatch(incrementByAmount(33))}>
        Increment by 33
      </Button>
      <Button onClick={() => dispatch(fetchUsers("MA"))}>
        Minus 7
      </Button>
      <Combobox></Combobox>
      <QuestionCard/>
      
      
    </div>
    
  );
}
