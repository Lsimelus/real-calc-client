"use client";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { QuestionCarousel } from "@/components/ui/questioncarousel";
import { Price } from "../components/questions/price";
import { Location } from "../components/questions/location";
import { Tax } from "../components/questions/tax";
import { Loan } from "../components/questions/loan";
import { Confirm } from "../components/questions/confirm";
import { GraphAmortization } from "@/components/ui/graphAmortization";
import { GraphEquity } from "@/components/ui/graphEquity";
import { Fees } from "@/components/questions/fees";
import { Insurance } from "@/components/questions/insurance";
import { Summary } from "../components/ui/summary";
import { selectCompleteness } from "@/lib/confirmSlice";
import { ExtraPayment } from "@/components/ui/extraPayment";
import {
  amortizationSchedule,
  equitySchedule,
  principalAndInterest,
} from "@/utils/sliceUtil";
import { amortizationFormatter, equityFormatter } from "@/utils/utils";
import { Footer, Header } from "@/components/ui/margins";

// Question components in order
const questions = [
  <Location key="location" />,
  <Loan key="loan" />,
  <Price key="price" />,
  <Tax key="tax" />,
  <Fees key="fees" />,
  <Insurance key="insurance" />,
  <Confirm key="confirm" />,
];

export default function Home() {
  const dispatch = useDispatch();

  // Select completion status for each question
  const completedQuestions = [
    useSelector((state: any) => state.location.locationDetails.complete),
    useSelector((state: any) => state.finance.financeDetails.loanComplete),
    useSelector((state: any) => state.finance.financeDetails.priceComplete),
    useSelector((state: any) => state.tax.taxDetails.complete),
    useSelector((state: any) => state.fees.feesDetails.complete),
    useSelector((state: any) => state.insurance.insuranceDetails.complete),
    useSelector((state: any) => state.confirm.confirmDetails.complete),
  ];

  // Calculate percent of completed questions
  const percentTrue = React.useMemo(() => {
    const trueCount = completedQuestions.filter(Boolean).length;
    return (trueCount / completedQuestions.length) * 100;
  }, [completedQuestions]);

  // Select finance details
  const finance = useSelector((state: any) => state.finance.financeDetails);

  // Chart data
  const mortgage = principalAndInterest(finance);
  const equityRaw = equitySchedule(finance, mortgage);
  const equityData = equityFormatter(equityRaw, finance);
  const amortizationRaw = amortizationSchedule(finance, mortgage);
  const amortizationData = amortizationFormatter(amortizationRaw);

  // Handler for editing after completion
  const editAfterCompletion = React.useCallback(() => {
    dispatch(selectCompleteness(false));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-5 gap-8 m-6 p-6">
      <Header />
      <>
        {percentTrue < 100 && (
          <QuestionCarousel
            completedQuestions={completedQuestions}
            questionPages={questions}
          />
        )}
        <Summary
          questionCompleted={percentTrue === 100}
          editInfo={editAfterCompletion}
        />
        {percentTrue === 100 && (
          <>
            <GraphAmortization chartData={amortizationData} />
            <GraphEquity chartData={equityData} />
            <ExtraPayment equityRaw={equityRaw} mortgage={mortgage} />
          </>
        )}
      </>
      <Footer />
    </div>
  );
}