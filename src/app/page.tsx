"use client";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { QuestionCarousel } from "../components/custom/questioncarousel";
import { Price } from "../components/custom/price";
import { Location } from "../components/custom/location";
import { Tax } from "../components/custom/tax";
import { Loan } from "../components/custom/loan";
import { Confirm } from "../components/custom/confirm";
import { GraphAmortization } from "@/components/custom/graphAmortization";
import { GraphEquity } from "@/components/custom/graphEquity";
import { Fees } from "@/components/custom/fees";
import { Insurance } from "@/components/custom/insurance";
import { Summary } from "../components/custom/summary";
import { selectCompleteness } from "@/lib/confirmSlice";
import { ExtraPayment } from "@/components/custom/extraPayment";
import {
  amortizationSchedule,
  equitySchedule,
  principalAndInterest,
} from "@/utils/sliceUtil";
import { amortizationFormatter, equityFormatter } from "@/utils/utils";
import { Footer, Header } from "@/components/custom/margins";

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
    <div className="relative min-h-screen bg-background">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-background max-h-[140px]">
        <Header />
      </div>

      {/* Scrollable grid content */}
      <div className="grid grid-cols-5 mt-[150px] mb-[100px] p-6  overflow-y-auto h-screen">
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
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-transparent p-5">
        <Footer />
      </div>
    </div>
  );
}
