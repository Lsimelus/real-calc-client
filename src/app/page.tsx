"use client";
import { QuestionCarousel } from "@/components/ui/questioncarousel";
import { Progress } from "@/components/ui/progress"
import { Price } from "../components/questions/price"
import { Location } from "../components/questions/location"
import { Tax } from "../components/questions/tax";
import { Loan } from "../components/questions/loan"
import { Confirm } from "../components/questions/confirm"
import { useSelector, useDispatch } from "react-redux";
import { Graph } from "@/components/ui/graph";
import { Fees } from "@/components/questions/fees";
import { Insurance } from "@/components/questions/insurance";
import {Summary }from "../components/ui/summary";
import * as React from "react"
import { selectCompleteness } from "@/lib/confirmSlice";


const questions = [<Location />,<Loan/>, <Price />,<Tax />, <Fees/>, <Insurance/>, <Confirm />]


export default function Home() {
  const locationCompleted = useSelector((state) => state.location.locationDetails.complete);
  const priceCompleted = useSelector((state) => state.finance.financeDetails.priceComplete);
  const loanCompleted = useSelector((state) => state.finance.financeDetails.loanComplete);
  const taxCompleted = useSelector((state) => state.tax.taxDetails.complete);
  const confirmCompleted = useSelector((state) => state.confirm.confirmDetails.complete);
  const feesCompleted = useSelector((state) => state.fees.feesDetails.complete);
  const insuranceCompleted = useSelector((state) => state.insurance.insuranceDetails.complete);
  
  const completedQuestions = [locationCompleted, loanCompleted, priceCompleted, taxCompleted, feesCompleted, insuranceCompleted , confirmCompleted];
  
  const trueCount = completedQuestions.filter(question => question === true).length;
  const [percentTrue, setPercentTrue] = React.useState(0);

  const dispatch = useDispatch();


  React.useEffect(() => {
    setPercentTrue((trueCount / completedQuestions.length) * 100);
  }, [completedQuestions])


  function editAfterCompletion(){
    dispatch(selectCompleteness(false))
  }


  return (
    <div className="grid grid-cols-5 gap-8 m-6 p-6">
      <div className="col-span-5 flex items-center text-5xl font-extrabold dark:text-white" >Making real estate make sense</div>
      <>
      
    
          { percentTrue < 100 &&
          <>
          <Progress  value={percentTrue} />
          
          
        <QuestionCarousel completedQuestions={completedQuestions} questionPages={questions}/>
        </>
          }
        <Summary questionCompleted={percentTrue == 100} editInfo={() => editAfterCompletion()}></Summary>
        { percentTrue !== 100 &&
        <Graph/>
          
            }
        
    </>      
    </div>
    
  );
}
