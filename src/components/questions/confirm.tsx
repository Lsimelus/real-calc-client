import { BellRing, Check } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
//import { fetchTax, fetchRent } from "@/api/fetchhData";
import { selectCompleteness } from "@/lib/confirmSlice";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { homeInsurance, propertyTax } from "../../utils/sliceUtil";
import { Label } from "../ui/label";
import { addcomma, formatNumber } from "@/utils/utils";
import { financeSlice } from "@/lib/financeSlice";
import * as React from "react";

type CardProps = React.ComponentProps<typeof Card>;

export function Confirm({ className, ...props }: CardProps) {
  const location = useSelector(
    (state: { location: { locationDetails: any } }) =>
      state.location.locationDetails,
  );
  const finance = useSelector(
    (state: { finance: { financeDetails: any } }) =>
      state.finance.financeDetails,
  );
  const tax = useSelector(
    (state: { tax: { taxDetails: any } }) => state.tax.taxDetails,
  );
  const insurance = useSelector(
    (state: { insurance: { insuranceDetails: any } }) =>
      state.insurance.insuranceDetails,
  );
  const fees = useSelector(
    (state: { fees: { feesDetails: any } }) => state.fees.feesDetails,
  );
  const dispatch = useDispatch();

  return (
    <Card className={cn("h-[520px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Confirm</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>
            Location: <span className="font-bold">{location.city}</span>, <span className="font-bold">{location.state}</span>
          </Label>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>
            {finance.length} year {finance.type} with a{" "}
            <span className="font-bold">{finance.exact > 0 ? finance.exact : finance.rate}%</span>
          </Label>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>
            The property value is <span className="font-bold">{formatNumber(finance.homePrice)}</span> and a{" "}
            <span className="font-bold">{finance.downPaymentPercent}%-
            {formatNumber(finance.downPaymentAmount)}</span> will be put down
          </Label>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>
            {fees.fee > 0
              ? `The total monthly fees are ${addcomma(fees.fee)}`
              : `There are no monthly fees`}
          </Label>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>
            The total yearly premium for home insurance is{" "}
            <span className="font-bold">{addcomma(Number(homeInsurance(finance, insurance)[1]))}</span>
          </Label>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>
            The total yearly taxes is{" "}
            <span className="font-bold">{addcomma(Number(propertyTax(finance, tax, location)[1]))}</span>
          </Label>
        </div>

        <Button onClick={() => dispatch(selectCompleteness(true))}>
          Confirm info
        </Button>
      </CardContent>
    </Card>
  );
}
