"use client";
import { QuestionCard } from "@/components/ui/questioncard";
import { QuestionCarousel } from "@/components/ui/questioncarousel";
import { Progress } from "@/components/ui/progress"
import { Price } from "../components/questions/price"
import { Location } from "../components/questions/location"
import { Tax } from "../components/questions/tax";
import { Insurance } from "../components/questions/insurance"
import { Loan } from "../components/questions/loan"
import { Fees } from "../components/questions/fees"
import { useDispatch, useSelector } from "react-redux";


const questions = [<Location />,<Loan/>, <Price />,<Tax />,<Insurance/>, <Fees />]


export default function Home() {
  const locationCompleted = useSelector((state) => state.location.locationDetails.complete);
  const priceCompleted = useSelector((state) => state.price.priceDetails.complete);
  const loanCompleted = useSelector((state) => state.loan.loanDetails.complete);
  const taxCompleted = useSelector((state) => state.tax.taxDetails.complete);
  
  const completedQuestions = [locationCompleted, loanCompleted, priceCompleted, taxCompleted]//Todo: Add more questions
  
  const trueCount = completedQuestions.filter(question => question === true).length;
  const percentTrue = (trueCount / completedQuestions.length) * 100;



  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3" >title</div>
      <Progress value={percentTrue} />
      <QuestionCarousel completedQuestions={completedQuestions} questionPages={questions}/>
      
      <QuestionCard/>
    </div>
    
  );
}
