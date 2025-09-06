import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPrice,
  selectDownPayment,
  selectDownPaymentAmount,
} from "@/lib/financeSlice";
import { addcomma, formatNumber } from "../../utils/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../ui/label";

type CardProps = React.ComponentProps<typeof Card>;

export function Price({ className, ...props }: CardProps) {
  const min = useSelector(
    (state: any) => state.finance.financeDetails.minDownpayment,
  );
  const max = 40; // TODO: Add max interest var
  const initPrice = useSelector(
    (state: any) => state.finance.financeDetails.homePrice,
  );
  const initDownPayment = useSelector(
    (state: any) => state.finance.financeDetails.downPaymentPercent,
  );

  const [downPayment, setDownPayment] = React.useState([initDownPayment]);
  const [price, setPrice] = React.useState(initPrice);

  const dispatch = useDispatch();

  const downPaymentValue = React.useMemo(
    () => (price * downPayment[0]) / 100,
    [price, downPayment],
  );
  const formattedDownPayment = addcomma(downPaymentValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setPrice(0);
    } else {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        setPrice(floatValue);
      }
    }
  };

  React.useEffect(() => {
    dispatch(selectPrice(price));
    dispatch(selectDownPaymentAmount(downPaymentValue));
  }, [price, downPaymentValue, dispatch]);

  React.useEffect(() => {
    dispatch(selectDownPayment(downPayment[0]));
    dispatch(selectDownPaymentAmount(downPaymentValue));
  }, [downPayment, downPaymentValue, dispatch]);

  return (
    <Card className={cn("h-[580px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Budget</CardTitle>
        <CardDescription>Property price & downpayment</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid max-w-sm items-center gap-1.5">
          <Label>
            Property price:{" "}
            <span className="font-bold">{formatNumber(price)}</span>
          </Label>
          <Input
            value={price === 0 ? "" : price}
            onChange={handleInputChange}
            type="number"
            min="0"
            step="0.01"
          />
        </div>

        {!!(price > 0) && (
          <div className="grid max-w-sm items-center gap-1.5 mt-6">
            <Label>Down payment</Label>
            <Slider
              defaultValue={downPayment}
              min={min}
              max={max}
              step={0.5}
              value={downPayment}
              onValueChange={setDownPayment}
            />
            <p className="font-bold">{downPayment[0] + "%"}</p>
            <p className="font-bold">{formattedDownPayment}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
