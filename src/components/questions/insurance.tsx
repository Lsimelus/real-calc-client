import { cn } from "@/lib/utils"
import {
  Card
} from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux";
import { addcomma, formatNumber } from "../../utils/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import React from 'react';
import { selectExact, selectExactOption } from "../../lib/insuranceSlice";

type CardProps = React.ComponentProps<typeof Card>
 
export function Insurance({ className, ...props }: CardProps) {
  const premium = useSelector((state) => state.price.priceDetails.homePrice);
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
    <Card className={cn("w-[380px]", className)} {...props}>
      <p>Insurance</p>
      <InsuranceInfo/>

          <Button onClick={() => setExactOption(true)} variant={exactOption ? "default" : "ghost"} >Yes</Button>
          <Button onClick={() => setExactOption(false)}   variant={!exactOption ? "default" : "ghost"}>No</Button>
          {exactOption && (
            <Input value={exact} onChange={handleInputChange} ></Input>
          ) }
      
    </Card>
  )
}