import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { selectExact } from "../../lib/insuranceSlice";
import { Label } from "../ui/label";
import { addcomma, formatNumber } from "@/utils/utils";
import { estimatedHomeInsurance } from "@/utils/sliceUtil";

type CardProps = React.ComponentProps<typeof Card>;

export function Insurance({ className, ...props }: CardProps) {
  const financeSlice = useSelector((state: any) => state.finance.financeDetails);
  const insuranceSlice = useSelector((state: any) => state.insurance.insuranceDetails);
  const exactAmount = insuranceSlice.exact;

  const [exact, setExact] = React.useState(exactAmount);
  const [exactOption, setExactOption] = React.useState(exactAmount > 0);
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setExact(0);
    } else {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        setExact(floatValue);
      }
    }
  };

  React.useEffect(() => {
    dispatch(selectExact(exact));
  }, [exact, dispatch]);

  React.useEffect(() => {
    if (!exactOption) {
      setExact(0);
    }
  }, [exactOption]);

  return (
    <Card className={cn("h-[580px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Insurance</CardTitle>
        <CardDescription>Just in case</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid max-w-sm items-center gap-1.5">
          <Label className="mb-1">
            Estimated Insurance Premium:{" "}
            <span className="font-bold">
              {addcomma(Number(estimatedHomeInsurance(financeSlice)[1]))}
            </span>
          </Label>
          <Label>
            Is there an exact insurance premium you would want to use?{" "}
            {exact > 0 && formatNumber(exact)}
          </Label>
        </div>
        <div>
          <Button
            onClick={() => setExactOption(true)}
            variant={exactOption ? "default" : "ghost"}
          >
            Yes
          </Button>
          <Button
            onClick={() => setExactOption(false)}
            variant={!exactOption ? "default" : "ghost"}
          >
            No
          </Button>
          {exactOption && (
            <Input
              value={exact === 0 ? "" : exact}
              onChange={handleInputChange}
              type="number"
              min="0"
              step="0.01"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}