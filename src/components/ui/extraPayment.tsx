"use client";
import React from "react";
import { addcomma, feesAmount, moneyToString } from "../../utils/utils";

import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  calcDownDeposit,
  equityEvaluater,
  equitySchedule,
  homeInsurance,
  mortgageInsurance,
  pmInsurance,
  principalAndInterest,
  propertyTax,
} from "@/utils/sliceUtil";
import { CardDescription, CardHeader, CardTitle } from "./card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./input";

interface ExtraPaymentProps {
  equityRaw: any[][];
  mortgage: number;
}

export const ExtraPayment: React.FC<ExtraPaymentProps> = ({
  equityRaw,
  mortgage,
}: ExtraPaymentProps) => {
  const finance = useSelector((state: any) => state.finance.financeDetails);

  const [paymentAmount, setPaymentAmount] = React.useState(0);
  const [monthlyPaymentAmount, setMonthlyPaymentAmount] = React.useState(0);
  let equityRawExtraPayment = equitySchedule(
    finance,
    mortgage,
    paymentAmount,
    monthlyPaymentAmount,
  );
  let equityEvaluation = equityEvaluater(equityRaw, equityRawExtraPayment);

  const [turningDate, setTurninDate] = React.useState("");

  React.useEffect(() => {
    const date = new Date();
    const newDate = new Date(
      new Date(date).setMonth(date.getMonth() + equityEvaluation.months),
    );
    // Format the date as desired, for example:

    const year = newDate.getFullYear().toString(); // e.g., "7/10/2025"
    const month = newDate.getMonth().toString();
    // const formattedDate = date.toDateString(); // e.g., "Thu Jul 10 2025"

    if (month == "0") {
      setTurninDate(year);
    } else {
      setTurninDate(month + "/" + year);
    }
    //setTurninDate(month + "/" + year);
  }, [equityEvaluation.months]); // The empty dependency array ensures this runs only once on mount

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setPaymentAmount(0);
    } else {
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue)) {
        setPaymentAmount(intValue);
      }
    }
  };

  const handleMonthlyInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (value === "") {
      setMonthlyPaymentAmount(0);
    } else {
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue)) {
        setMonthlyPaymentAmount(intValue);
      }
    }
  };

  return (
    <div className="col-span-5 lg:col-span-2">
      <CardHeader>
        <CardTitle>
          What if I make an extra one time principal payment?
        </CardTitle>
        <CardDescription>You will save a bunch on interest!</CardDescription>
      </CardHeader>

      <div className="grid  max-w-sm items-center gap-1.5">
        <Label>What is the extra amount you would like to pay?</Label>
        <Input value={paymentAmount} onChange={handleInputChange} />
      </div>

      <div className="grid  max-w-sm items-center gap-1.5">
        <Label>What is the extra amount you would like to pay monthly?</Label>
        <Input
          value={monthlyPaymentAmount}
          onChange={handleMonthlyInputChange}
        />
      </div>

      {!!(paymentAmount + monthlyPaymentAmount > 0) && (
        <div className="grid  max-w-sm items-center gap-1.5 mt-4">
          <Label>New ending of the mortage: {turningDate}</Label>
          <Label>
            Saved in interest: {addcomma(equityEvaluation.interest)}
          </Label>
        </div>
      )}
    </div>
  );
};
