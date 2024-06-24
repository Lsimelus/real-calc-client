"use client";

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Switch } from "@/components/ui/switch"
import { BellRing, Check } from "lucide-react"
import { Price } from "../questions/price"
import { Location } from "../questions/location"
import { Tax } from "../questions/tax";
import { Insurance } from "../questions/insurance"
import { Loan } from "../questions/loan"
import { Fees } from "../questions/fees"
import { useDispatch, useSelector } from "react-redux";


const questions = [<Location />,<Price />,<Tax />, <Loan/>,<Insurance/>, <Fees />]

export function QuestionCarousel() {
  const locationCompleted = useSelector((state) => state.location.locationDetails.complete);
  const priceCompleted = useSelector((state) => state.price.priceDetails.complete);
  const completedQuestions = [locationCompleted,priceCompleted]//Todo: Add more questions
  
  //Todo: How to implement this function?
  // Index determines next button functionality
  // Also progress bas
  // Array needs to be inside carousel content
  function completed(index:number){
    return !completedQuestions[index-1]
  }

  return (
    <Carousel className="w-full max-w-3xl ml-20 col-span-3">
      <CarouselContent>
        {Array.from({ length: questions.length }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              {questions[index]}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
