import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux";
import {  formatNumber } from "../../utils/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import React from 'react';
import { selectExact, taxSlice } from "../../lib/taxSlice";
import { Label } from "../ui/label";
import { estimatePropertyTax, locationPropertyTax, propertyTax } from "@/utils/sliceUtil";
import { financeSlice } from "@/lib/financeSlice";
import { locationSlice } from "@/lib/locationSlice";


type CardProps = React.ComponentProps<typeof Card>
 
export function Tax({ className, ...props }: CardProps) {
  const nation = useSelector((state) => state.tax.taxDetails.national);
  const tax = propertyTax(financeSlice, taxSlice, locationSlice)
  const estimatedTax = estimatePropertyTax(financeSlice, locationSlice)
  const price = useSelector((state) => state.finance.financeDetails.homePrice);
  const initExact = useSelector((state) => state.finance.financeDetails.exactRate);


  const localTax = tax > 0;
  const currentTax = localTax ? tax : nation;

  const [exact, setExact] = React.useState(currentTax * price);
  const [exactOption, setExactOption] = React.useState(false);
  const dispatch = useDispatch();


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
        setExact(0);
    } else {
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            setExact(intValue);
        }
    }
  }

  React.useEffect(() => {
    dispatch(selectExact(exact))
  }, [exact])

  React.useEffect(() => {
    setExact(initExact)
  }, [exactOption])
  

  return (
    <Card className={cn("h-[580px]", className)} {...props}>
          <CardHeader>
        <CardTitle>Taxes</CardTitle>
        <CardDescription>Everyones favorite part</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      <div className="grid  max-w-sm items-center gap-1.5">
       <Label>Estimated yearly tax: {estimatedTax[1]}</Label>

      </div>
        <div>
          <div className="grid  max-w-sm items-center gap-1.5 mt-5">
          <Label className="mb-1">Do you have/want to use a exact yearly tax amount? {exact > 0 && formatNumber(exact)}</Label>
          <div>
          <Button onClick={() => setExactOption(true)} variant={exactOption ? "default" : "ghost"} >Yes</Button>
          <Button onClick={() => setExactOption(false)}   variant={!exactOption ? "default" : "ghost"}>No</Button>

          </div>
          {exactOption && (
            <Input value={exact} onChange={handleInputChange} ></Input>
          ) }
          
          </div>
          


          </div>
          </CardContent>
      
    </Card>
  )
}