"use client";
import { QuestionCarousel } from "@/components/ui/questioncarousel";
import { Price } from "../components/questions/price";
import { Location } from "../components/questions/location";
import { Tax } from "../components/questions/tax";
import { Loan } from "../components/questions/loan";
import { Confirm } from "../components/questions/confirm";
import { useSelector, useDispatch } from "react-redux";
import { GraphAmortization } from "@/components/ui/graphAmortization";
import { GraphEquity } from "@/components/ui/graphEquity";
import { Fees } from "@/components/questions/fees";
import { Insurance } from "@/components/questions/insurance";
import { Summary } from "../components/ui/summary";
import * as React from "react";
import { selectCompleteness } from "@/lib/confirmSlice";
import { ExtraPayment } from "@/components/ui/extraPayment";
import {
  amortizationSchedule,
  equitySchedule,
  principalAndInterest,
} from "@/utils/sliceUtil";
import { amortizationFormatter, equityFormatter } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const questions = [
  <Location />,
  <Loan />,
  <Price />,
  <Tax />,
  <Fees />,
  <Insurance />,
  <Confirm />,
];

export default function Home() {
  const locationCompleted = useSelector(
    (state: { location: { locationDetails: { complete: any } } }) =>
      state.location.locationDetails.complete,
  );
  const priceCompleted = useSelector(
    (state: { finance: { financeDetails: { priceComplete: any } } }) =>
      state.finance.financeDetails.priceComplete,
  );
  const loanCompleted = useSelector(
    (state: { finance: { financeDetails: { loanComplete: any } } }) =>
      state.finance.financeDetails.loanComplete,
  );
  const taxCompleted = useSelector(
    (state: { tax: { taxDetails: { complete: any } } }) =>
      state.tax.taxDetails.complete,
  );
  const confirmCompleted = useSelector(
    (state: { confirm: { confirmDetails: { complete: any } } }) =>
      state.confirm.confirmDetails.complete,
  );
  const feesCompleted = useSelector(
    (state: { fees: { feesDetails: { complete: any } } }) =>
      state.fees.feesDetails.complete,
  );
  const insuranceCompleted = useSelector(
    (state: { insurance: { insuranceDetails: { complete: any } } }) =>
      state.insurance.insuranceDetails.complete,
  );

  const completedQuestions = [
    locationCompleted,
    loanCompleted,
    priceCompleted,
    taxCompleted,
    feesCompleted,
    insuranceCompleted,
    confirmCompleted,
  ];

  const trueCount = completedQuestions.filter(
    (question) => question === true,
  ).length;
  const [percentTrue, setPercentTrue] = React.useState(0);
  const finance = useSelector((state: any) => state.finance.financeDetails);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setPercentTrue((trueCount / completedQuestions.length) * 100);
  }, [completedQuestions]);

  function editAfterCompletion() {
    dispatch(selectCompleteness(false));
  }

  let mortgage = principalAndInterest(finance);
  let equityRaw = equitySchedule(finance, mortgage);
  let equityData = equityFormatter(equityRaw, finance);

  let amortizationRaw = amortizationSchedule(finance, mortgage);
  let amortizationData = amortizationFormatter(amortizationRaw);

  return (
    <div className="grid grid-cols-5 gap-8 m-6 p-6">
      <div className="col-span-5 flex items-center text-5xl font-extrabold dark:text-white">
        Real property, Real Sense
      </div>
      <div className="col-span-5  text-2xl dark:text-white">
        <a className="group text-sky-600 transition duration-300"  href="https://github.com/Lsimelus"
          target='_blank'
          rel="noopener">coded</a> by <a className="group text-sky-600 transition duration-300" href="https://www.lyndbergh.net/"
          target='_blank'>Lyndbergh Simelus <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
</a>
      </div>
      <>
        {!!(percentTrue < 100) && (
          <>
            <QuestionCarousel
              completedQuestions={completedQuestions}
              questionPages={questions}
            />
          </>
        )}
        <Summary
          questionCompleted={percentTrue == 100}
          editInfo={() => editAfterCompletion()}
        ></Summary>
        {!!(percentTrue == 100) && (
          <>
            <GraphAmortization chartData={amortizationData} />
            <GraphEquity chartData={equityData} />
            <ExtraPayment equityRaw={equityRaw} mortgage={mortgage} />
          </>
        )}
      </>

      <Sheet>
        <SheetTrigger>
          <Avatar>
            <AvatarImage src="/prof.png" className="hover:bg-sky-700" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
