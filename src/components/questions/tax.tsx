import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { addcomma, formatNumber } from "../../utils/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { selectExact } from "../../lib/taxSlice";
import { Label } from "../ui/label";
import {
  estimatePropertyTax,
  propertyTax,
} from "@/utils/sliceUtil";

type CardProps = React.ComponentProps<typeof Card>;

export function Tax({ className, ...props }: CardProps) {
  const finance = useSelector((state: any) => state.finance.financeDetails);
  const tax = useSelector((state: any) => state.tax.taxDetails);
  const location = useSelector((state: any) => state.location.locationDetails);

  const estimatedTax = estimatePropertyTax(finance, location);

  const initExact = tax.exact;
  const [exact, setExact] = React.useState(initExact);
  const [exactOption, setExactOption] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(selectExact(exact));
  }, [exact]);

  React.useEffect(() => {
    setExact(initExact);
  }, [exactOption, initExact]);

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

  return (
    <Card className={cn("h-[580px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Taxes</CardTitle>
        <CardDescription>Everyone's favorite part</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid max-w-sm items-center gap-1.5">
          <Label>
            Estimated yearly tax:{" "}
            <span className="font-bold">
              {addcomma(Number(estimatedTax[1]))}
            </span>
          </Label>
        </div>
        <div>
          <div className="grid max-w-sm items-center gap-1.5 mt-5">
            <Label className="mb-1">
              Do you have/want to use an exact yearly tax amount?{" "}
              {exact > 0 && formatNumber(exact)}
            </Label>
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
            </div>
            {exactOption && (
              <Input
                value={exact === 0 ? "" : exact}
                onChange={handleInputChange}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}