"use client";
import { QuestionCarousel } from "@/components/ui/questioncarousel";
import { Progress } from "@/components/ui/progress"
import { Price } from "../components/questions/price"
import { Location } from "../components/questions/location"
import { Tax } from "../components/questions/tax";
import { Loan } from "../components/questions/loan"
import { useSelector } from "react-redux";
import Summary from "../components/ui/summary";

const questions = [<Location />,<Loan/>, <Price />,<Tax />]


export default function Home() {
  const locationCompleted = useSelector((state) => state.location.locationDetails.complete);
  const priceCompleted = useSelector((state) => state.price.priceDetails.complete);
  const loanCompleted = useSelector((state) => state.loan.loanDetails.complete);
  const taxCompleted = useSelector((state) => state.tax.taxDetails.complete);
  
  const completedQuestions = [locationCompleted, loanCompleted, priceCompleted, taxCompleted]
  
  const trueCount = completedQuestions.filter(question => question === true).length;
  const percentTrue = (trueCount / completedQuestions.length) * 100;

  console.log(percentTrue)



  return (
    <div className="grid grid-cols-5 gap-8 m-6 p-6">
      <div className="col-span-5 flex items-center text-5xl font-extrabold dark:text-white" >Find a home that makes sense</div>
      <>
    <Progress  value={percentTrue} />
          { percentTrue < 100 &&
          
          
        <QuestionCarousel completedQuestions={completedQuestions} questionPages={questions}/>
          }
        <Summary></Summary>
        { percentTrue == 100 &&
        <></>
          
            }
        
    </>      
    </div>
    
  );
}
