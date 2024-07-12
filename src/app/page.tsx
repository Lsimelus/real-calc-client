"use client";
import { QuestionCard } from "@/components/ui/questioncard";
import { QuestionCarousel } from "@/components/ui/questioncarousel";
import { Progress } from "@/components/ui/progress"
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
  const locationCompleted = useSelector((state) => state.location.locationDetails.complete);
  const priceCompleted = useSelector((state) => state.price.priceDetails.complete);
  const completedQuestions = [locationCompleted, priceCompleted, false, false , false]//Todo: Add more questions
  
  const trueCount = completedQuestions.filter(question => question === true).length;
  const percentTrue = (trueCount / completedQuestions.length) * 100;



  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3" >title</div>
      <Progress value={percentTrue} />
      <QuestionCarousel completedQuestions={completedQuestions}/>
      
      <QuestionCard/>
    </div>
    
  );
}
