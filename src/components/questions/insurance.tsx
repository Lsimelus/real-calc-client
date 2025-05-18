import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import React from 'react';
import { selectExact } from "../../lib/insuranceSlice";
import { Label } from "../ui/label";
import { addcomma, formatNumber } from "@/utils/utils";
import { estimatedHomeInsurance, homeInsurance } from "@/utils/sliceUtil";

type CardProps = React.ComponentProps<typeof Card>
 
export function Insurance({ className, ...props }: CardProps) {
  const financeSlice = useSelector((state) => state.finance.financeDetails);
  const insuranceSlice =  useSelector((state) => state.insurance.insuranceDetails);
  const exactAmount = insuranceSlice.exact;

  const [exact, setExact] = React.useState(exactAmount);
  const [exactOption, setExactOption] = React.useState(exactAmount >0 );
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
    if (!exactOption){
      setExact(0)
    }

  }, [exactOption])







  return (
    <Card className={cn("h-[580px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Insurance</CardTitle>
        <CardDescription>Where is your next property?</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
          <div className="grid  max-w-sm items-center gap-1.5">
          <Label className="mb-1">Estimated Insurance Premium: {addcomma(estimatedHomeInsurance(financeSlice, insuranceSlice)[1])}</Label>
          <Label>Is there an exact insurance premium you would want use? {!!(exact > 0) && formatNumber(exact)}</Label>
          </div>
          <div>
          <Button onClick={() => setExactOption(true)} variant={exactOption ? "default" : "ghost"} >Yes</Button>
          <Button onClick={() => setExactOption(false)} variant={!exactOption ? "default" : "ghost"}>No</Button>
          {exactOption && (
            <Input value={exact} onChange={handleInputChange} ></Input>
          ) }

          </div>
          
          </CardContent>
          
      
    </Card>
  )
}