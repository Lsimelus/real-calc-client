"use client";
import React from "react";
import { addcomma } from "../../utils/utils";
import { useSelector } from "react-redux";
import { equityEvaluater, equitySchedule } from "@/utils/sliceUtil";
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
}) => {
  const finance = useSelector((state: any) => state.finance.financeDetails);

  const [paymentAmount, setPaymentAmount] = React.useState<number>(0);
  const [monthlyPaymentAmount, setMonthlyPaymentAmount] =
    React.useState<number>(0);

  const equityRawExtraPayment = equitySchedule(
    finance,
    mortgage,
    paymentAmount,
    monthlyPaymentAmount,
  );
  const equityEvaluation = equityEvaluater(equityRaw, equityRawExtraPayment);

  const [turningDate, setTurningDate] = React.useState("");

  React.useEffect(() => {
    const date = new Date();
    const newDate = new Date(
      date.setMonth(date.getMonth() + equityEvaluation.months),
    );
    const year = newDate.getFullYear().toString();
    const month = (newDate.getMonth() + 1).toString(); // Month is zero-based

    setTurningDate(month === "1" ? year : `${month}/${year}`);
  }, [equityEvaluation.months]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setPaymentAmount(0);
    } else {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        setPaymentAmount(floatValue);
      }
    }
  };

  const handleMonthlyInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setMonthlyPaymentAmount(0);
    } else {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        setMonthlyPaymentAmount(floatValue);
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

      <div className="grid max-w-sm items-center gap-1.5">
        <Label>What is the extra amount you would like to pay?</Label>
        <Input
          value={paymentAmount === 0 ? "" : paymentAmount}
          onChange={handleInputChange}
          type="number"
          min="0"
          step="0.01"
        />
      </div>

      <div className="grid max-w-sm items-center gap-1.5">
        <Label>What is the extra amount you would like to pay monthly?</Label>
        <Input
          value={monthlyPaymentAmount === 0 ? "" : monthlyPaymentAmount}
          onChange={handleMonthlyInputChange}
          type="number"
          min="0"
          step="0.01"
        />
      </div>

      {!!(paymentAmount + monthlyPaymentAmount > 0) && (
        <div className="grid max-w-sm items-center gap-1.5 mt-4">
          <Label>New ending of the mortgage: {turningDate}</Label>
          <Label>
            Saved in interest: {addcomma(equityEvaluation.interest)}
          </Label>
        </div>
      )}
    </div>
  );
};
