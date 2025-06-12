import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setFee } from "@/lib/feesSlice";
import { Label } from "../ui/label";
import { formatNumber } from "@/utils/utils";

type CardProps = React.ComponentProps<typeof Card>;

export function Fees({ className, ...props }: CardProps) {
  const initPrice = useSelector(
    (state: { fees: { feesDetails: { fee: any } } }) =>
      state.fees.feesDetails.fee,
  );
  const [feeAmount, setFeeAmount] = React.useState(initPrice);

  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setFeeAmount(0);
    } else {
      const intValue = parseInt(value, 10);
      if (!isNaN(intValue)) {
        setFeeAmount(intValue);
      }
    }
  };
  React.useEffect(() => {
    dispatch(setFee(feeAmount));
  }, [feeAmount]);

  return (
    <Card className={cn("h-[580px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Fees</CardTitle>
        <CardDescription>HOA and miscellaneous fees</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid  max-w-sm items-center gap-1.5">
          <Label>Total monthly fees: {formatNumber(feeAmount)}</Label>
          <Input value={feeAmount} onChange={handleInputChange} />
        </div>
      </CardContent>
    </Card>
  );
}
