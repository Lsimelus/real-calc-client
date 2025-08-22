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
  calcDownDeposit,
  homeInsurance,
  mortgageInsurance,
  pmInsurance,
  principalAndInterest,
  propertyTax,
} from "@/utils/sliceUtil";

interface SummaryProps {
  questionCompleted: boolean;
  editInfo: () => void;
}

const INVOICE_CONFIG = [
  {
    cost: "Principal & Interest",
    desc: "The principal is the amount of money you borrowed to buy the home. The interest is the cost of borrowing that money.",
    getValue: (finance: any) => principalAndInterest(finance) * 12,
  },
  {
    cost: "Property Taxes",
    desc: "Property taxes are assessed by the local government and are based on the value of your home.",
    getValue: (finance: any, tax: any, location: any) => propertyTax(finance, tax, location),
  },
  {
    cost: "Homeowners Insurance",
    desc: "Homeowners insurance protects your home and belongings from damage or theft.",
    getValue: (finance: any, insurance: any) => homeInsurance(finance, insurance),
  },
  {
    cost: "Mortgage Insurance",
    desc: "Mortgage insurance protects the lender if you stop making payments on your loan.",
    getValue: (finance: any) => mortgageInsurance(finance),
  },
  {
    cost: "Premium Mortgage Insurance",
    desc: "Premium mortgage insurance is a type of mortgage insurance that is only required for certain loans.",
    getValue: (finance: any) => pmInsurance(finance),
  },
  {
    cost: "HOA Dues + fees",
    desc: "HOA dues are fees that are paid to a homeowners association for the upkeep of common areas.",
    getValue: (_finance: any, _tax: any, _location: any, _insurance: any, fees: any) => feesAmount(fees),
  },
];

export const Summary: React.FC<SummaryProps> = ({ questionCompleted, editInfo }) => {
  const finance = useSelector((state: any) => state.finance.financeDetails);
  const tax = useSelector((state: any) => state.tax.taxDetails);
  const insurance = useSelector((state: any) => state.insurance.insuranceDetails);
  const fees = useSelector((state: any) => state.fees.feesDetails);
  const location = useSelector((state: any) => state.location.locationDetails);

  // Calculate invoice rows
  const invoices = React.useMemo(() => {
    return INVOICE_CONFIG.map((row, idx) => {
      let value;
      if (idx === 0) value = row.getValue(finance);
      else if (idx === 1) value = row.getValue(finance, tax, location);
      else if (idx === 2) value = row.getValue(finance, insurance);
      else if (idx === 3) value = row.getValue(finance);
      else if (idx === 4) value = row.getValue(finance);
      else value = row.getValue(finance, tax, location, insurance, fees);

      if (Array.isArray(value)) value = Number(value[1]);
      const monthly = addcomma(value / 12);
      const yearly = addcomma(value);
      return { ...row, monthly, yearly };
    });
  }, [finance, tax, insurance, fees, location]);

  const getSumOfRows = () =>
    invoices.reduce((sum, invoice) => sum + moneyToString(invoice.monthly), 0);

  const downDeposit = React.useMemo(() => calcDownDeposit(finance), [finance]);

  return (
    <div className="col-span-5 lg:col-span-2">
      <Table>
        <TableCaption>You are payments broken down</TableCaption>
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
              {addcomma(getSumOfRows() + downDeposit)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};