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
import { selectExact, selectExactOption } from "../../lib/insuranceSlice";
import { Label } from "../ui/label";
import { formatNumber } from "@/utils/utils";

type CardProps = React.ComponentProps<typeof Card>
 
export function Insurance({ className, ...props }: CardProps) {
  const premium = useSelector((state) => state.finance.financeDetails.homePrice);
  const defaultRate = useSelector((state) => state.insurance.insuranceDetails.default);
  const initExactOption = useSelector((state) => state.insurance.insuranceDetails.exactOption);
  const exactAmount = useSelector((state) => state.insurance.insuranceDetails.exact);

  const [exact, setExact] = React.useState(exactAmount);
  const [exactOption, setExactOption] = React.useState(initExactOption);
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
    dispatch(selectExactOption(exactOption))
  }, [exactOption])



  const InsuranceInfo = () => (
    <>
      <p>Estimated Insurance Premium: ${premium * defaultRate}</p>
    </>
  );



  return (
    <Card className={cn("h-[580px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Insurance</CardTitle>
        <CardDescription>Where is your next property?</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
          <div className="grid  max-w-sm items-center gap-1.5">
          <Label className="mb-1">Estimated Insurance Premium: ${premium * defaultRate}</Label>
          <Label>Is there an exact insurance premium you would want use? {exact > 0 && formatNumber(exact)}</Label>
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