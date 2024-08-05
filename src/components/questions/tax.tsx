import { cn } from "@/lib/utils"
import {
  Card
} from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux";
import { addcomma, formatNumber } from "../../constants/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import React from 'react';
import { selectExact, selectExactOption } from "../../lib/taxSlice";


type CardProps = React.ComponentProps<typeof Card>
 
export function Tax({ className, ...props }: CardProps) {
  const nation = useSelector((state) => state.tax.taxDetails.national);
  const tax = useSelector((state) => state.tax.taxDetails.local);
  
  const price = useSelector((state) => state.price.priceDetails.homePrice);
  const initExact = useSelector((state) => state.loan.loanDetails.exact);


  const initExactOption = useSelector((state) => state.loan.loanDetails.exactOption);

  const localTax = tax > 0;
  const currentTax = localTax ? tax : nation;

  const [exact, setExact] = React.useState(currentTax * price);
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
    setExact(initExact)
  }, [exactOption])
  

  const TaxInfo = () => (
    <>
      <p>{currentTax}</p>
      {
        localTax ? (
          <p>Local Tax:</p>
        ) : (
          <p>National Tax:</p>
        )
      }
      <p>Estimated yearly Tax:</p>
      <p>{addcomma(currentTax * price)}</p>
    </>
  );


  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <TaxInfo />

          <Button onClick={() => setExactOption(true)} variant={exactOption ? "default" : "ghost"} >Yes</Button>
          <Button onClick={() => setExactOption(false)}   variant={!exactOption ? "default" : "ghost"}>No</Button>
          {exactOption && (
            <Input value={exact} onChange={handleInputChange} ></Input>
          ) }
      
    </Card>
  )
}