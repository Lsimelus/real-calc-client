"use client";
import Image from "next/image";
import store from "../lib/storeProvider"
import { useDispatch, useSelector } from "react-redux";
import { fetchTax, fetchRent } from "@/api/fetchhData";
import { selectCity, selectState } from "@/lib/locationSlice";
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox";
import { Car } from "lucide-react";
import { QuestionCard } from "@/components/ui/questioncard";
import { QuestionCarousel } from "@/components/ui/questioncarousel";
import { Progress } from "@/components/ui/progress"


export default function Home() {
  const state = useSelector((state) => state.location.locationDetails.state);
  const city = useSelector((state) => state.location.locationDetails.city);
  const complete = useSelector((state) => state.location.locationDetails.complete);

  const tax = useSelector((state) => state.location.locationDetails.tax);
  const rental = useSelector((state) => state.location.locationDetails.rental);

  const dispatch = useDispatch();

  function pickState(){
    dispatch(selectState("MA"))
    dispatch(fetchTax("MA"))
  }

  function pickCity(){
    dispatch(selectCity("Everett"))
    dispatch(fetchRent("Everett"))
  }

  //Progress values needs call back info from carousel index


  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3" >title</div>
      <Progress value={33} />
      <QuestionCarousel/>
      
      <Combobox></Combobox>
      <QuestionCard/>
      
      
    </div>
    
  );
}
