"use client";
import React from "react";
import { addcomma, feesAmount, moneyToString } from "../../utils/utils";

import { useSelector } from "react-redux";
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
  calculateCashToClose,
  homeInsurance,
  mortgageInsurance,
  pmInsurance,
  principalAndInterest,
  propertyTax,
} from "@/utils/sliceUtil";

import { Label } from "../ui/label";
import { initSummary } from "@/constants/misc";
import { DebtToIncome } from "./debtToIncome";

interface SummaryProps {
  questionCompleted: boolean;
  editInfo: () => void;
}

export const Summary: React.FC<SummaryProps> = ({
  questionCompleted,
  editInfo,
}: SummaryProps) => {
  const finance = useSelector((state: any) => state.finance.financeDetails);
  const tax = useSelector((state: any) => state.tax.taxDetails);
  const insurance = useSelector(
    (state: any) => state.insurance.insuranceDetails,
  );

  // const toPrint = useSelector((state: any) => state);
  // console.log("~~~~~~~~~~~~~~~~~~~~")
  // console.log(toPrint)

  const fees = useSelector((state: any) => state.fees.feesDetails);
  const location = useSelector((state: any) => state.location.locationDetails);

  const [invoices, setInvoices] = React.useState(initSummary);

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

  const updateInvoiceRow = (index: number, value: number | any[]) => {
    setInvoices((prevInvoices) => {
      const newInvoices = [...prevInvoices];
      if (Array.isArray(value)) {
        value = Number(value[1]);
      }

      newInvoices[index].monthly = addcomma(value / 12);
      newInvoices[index].yearly = addcomma(value);
      return newInvoices;
    });
  };

  function getSumOfRows() {
    let sum = 0;
    for (let i = 0; i < 6; i++) {
      sum += moneyToString(invoices[i].monthly);
    }
    return sum;
  }

  function row0() {
    let mortgage = principalAndInterest(finance);
    let value = mortgage * 12;
    updateInvoiceRow(0, value);
  }

  function row1() {
    var value = propertyTax(finance, tax, location);
    updateInvoiceRow(1, value);
  }

  function row2() {
    var value = homeInsurance(finance, insurance);
    updateInvoiceRow(2, value);
  }

  function row3() {
    var value = mortgageInsurance(finance);
    updateInvoiceRow(3, value);
  }

  function row4() {
    var value = pmInsurance(finance);
    updateInvoiceRow(4, value);
  }

  function row5() {
    var value = feesAmount(fees);
    updateInvoiceRow(5, value);
  }

  function cashToClose() {
    return calculateCashToClose(finance);
  }

  React.useEffect(() => {
    row0();
    row1();
    row2();
    row3();
    row4();
    row5();
  }, [finance, insurance, tax, fees, location]);

  return (
    <div className="col-span-5 lg:col-span-2">
      <Table>
        <TableCaption>
          You are payments broken down. See your debt to income ratio, to see
          affordability
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">
              {!!questionCompleted && (
                <Button onClick={editInfo}>Edit info</Button>
              )}
            </TableHead>
            <TableHead className="w-[230px]">Monthly</TableHead>
            <TableHead>Yearly</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.cost}>
              <TableCell className="font-medium">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{invoice.cost}</TooltipTrigger>
                    <TooltipContent>
                      <p>{invoice.desc}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>

              <TableCell>{invoice.monthly}</TableCell>
              <TableCell>{invoice.yearly}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Mortgage</TableCell>
            <TableCell className="text-right">
              {addcomma(getSumOfRows())}
            </TableCell>
          </TableRow>
        </TableFooter>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Down Payment + Closing Cost</TableCell>
            <TableCell className="text-right">
              {addcomma(cashToClose())}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {questionCompleted && <DebtToIncome mortgage={getSumOfRows()} />}
    </div>
  );
};
