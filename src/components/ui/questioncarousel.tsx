"use client";

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Price } from "../questions/price"
import { Location } from "../questions/location"
import { Tax } from "../questions/tax";
import { Insurance } from "../questions/insurance"
import { Loan } from "../questions/loan"
import { Fees } from "../questions/fees"
import { useDispatch, useSelector } from "react-redux";
import { type CarouselApi } from "@/components/ui/carousel"


interface QuestionCarouselProps {
  completedQuestions: boolean[]
}


//Pass in setPage and React.useRef<HTMLElement> to each component
const questions = [<Location />,<Price />,<Loan/>,<Tax />,<Insurance/>, <Fees />]

//export const Combobox: React.FC<ComboboxProps> = ({ frameworks, onSelect }: ComboboxProps) => {

export const QuestionCarousel: React.FC<QuestionCarouselProps> = ({ completedQuestions }: QuestionCarouselProps) => {
  
    const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  //Todo: How to implement this function?
  // Index determines next button functionality
  // Also progress bas
  // Array needs to be inside carousel content


  return (
    <Carousel setApi={setApi} className="w-full max-w-3xl ml-20 col-span-3">
      <CarouselContent>
      {questions.map((question, index) => (
        <CarouselItem key={index}>
          <div className="p-1">
            {question}
          </div>
        </CarouselItem>
      ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext disabled={false}/>
    </Carousel>
  )
}
