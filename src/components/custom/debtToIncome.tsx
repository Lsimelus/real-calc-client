"use client";
import React from "react";
import { addcomma } from "../../utils/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface DebtToIncomeProps {
  mortgage: number;
}

export const DebtToIncome: React.FC<DebtToIncomeProps> = ({
  mortgage,
}: DebtToIncomeProps) => {
  const [debt, setDebt] = React.useState(0);
  const handleDebtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setDebt(0);
    } else {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        setDebt(floatValue);
      }
    }
  };

  const [income, setIncome] = React.useState(0);
  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setIncome(0);
    } else {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        setIncome(floatValue);
      }
    }
  };

  const ratioInfo: Record<1 | 2 | 3, { color: string; text: string }> = {
    1: {
      color: "green",
      text: "Low (less than 36%). Generally considered a healthy DTI",
    },
    2: {
      color: "yellow",
      text: "Fair (between 36% and 43%). A level that may cause some concern for lenders.",
    },
    3: {
      color: "red",
      text: "High (more than 43%). Often considered too high, which can affect your ability to qualify for certain loans",
    },
  };
  const [ratio, setRatio] = React.useState(0);
  const [ratioLevel, setRatioLevel] = React.useState<1 | 2 | 3>(1);

  React.useEffect(() => {
    if (income > 0 && debt > 0) {
      var newRatio = (debt / income) * 100;
      if (newRatio > 100) newRatio = 100;
      setRatio(newRatio);
      if (newRatio < 36) {
        setRatioLevel(1);
      } else if (newRatio < 44) {
        setRatioLevel(2);
      } else {
        setRatioLevel(3);
      }
    }
  }, [income, debt]);

  function getRatioLabel() {
    const colorMap: Record<string, string> = {
      green: "text-green-600",
      yellow: "text-yellow-400",
      red: "text-red-600",
    };
    const colorClass =
      colorMap[ratioInfo[ratioLevel]?.color] || "text-blue-600";
    const ratioText = ratioInfo[ratioLevel]?.text || "No info available";
    return (
      <>
        <Label className={`text-4xl font-bold m-2 ${colorClass}`}>
          {ratio.toFixed(0)}%
        </Label>
        {ratioText}
      </>
    );
  }

  const idealMortgage = income * 0.28;
  const validIncome = mortgage <= Number(idealMortgage);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Debt to Income Ratio</CardTitle>
        </CardHeader>
        <CardContent className="grid  grid-cols-2 gap-4 m-2">
          <div className="flex max-w-sm items-center gap-2">
            <Label>
              Total Monthly Debt: <span className="font-bold"></span>
            </Label>
            <Input value={debt === 0 ? "" : debt} onChange={handleDebtChange} />
          </div>
          <div className="flex max-w-sm items-center gap-2">
            <Label>Total Monethly Gross Income:</Label>
            <Input
              value={income === 0 ? "" : income}
              onChange={handleIncomeChange}
            />
          </div>

          {debt > 0 && income > 0 && (
            <>
              <div className="flex max-w-sm items-center gap-2">
                {getRatioLabel()}
              </div>
              <div className="flex max-w-sm items-center gap-2">
                <p>
                  28% of your gross monthly income should go to housing
                  expenses. Right now income suggests that you can afford a
                  monthly payment of{" "}
                  <span
                    className={`font-bold ${validIncome ? "text-green-600" : "text-red-600"}`}
                  >
                    {addcomma(Number(idealMortgage))}
                  </span>
                  .
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};
