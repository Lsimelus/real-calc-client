import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux";
import { selectPrice, selectDownPayment, selectDownPaymentAmount } from "@/lib/financeSlice"
import { addcomma, formatNumber } from "../../utils/utils";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from "../ui/label";
type CardProps = React.ComponentProps<typeof Card>

export function Price({ className, ...props }: CardProps) {
    const min = useSelector((state: { finance: { financeDetails: { minDownpayment: any; }; }; }) => state.finance.financeDetails.minDownpayment);
    const max = 40 //Todo: Add max interest var
    const initPrice = useSelector((state: { finance: { financeDetails: { homePrice: any; }; }; }) => state.finance.financeDetails.homePrice);
    const initDownPayment = useSelector((state: { finance: { financeDetails: { downPaymentPercent: any; }; }; }) => state.finance.financeDetails.downPaymentPercent);
    
    const [downPayment, setDownPayment] = React.useState([initDownPayment])
    const [price, setPrice] = React.useState(initPrice)

    
    const dispatch = useDispatch();


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '') {
            setPrice(0);
        } else {
            const intValue = parseInt(value, 10);
            if (!isNaN(intValue)) {
                setPrice(intValue);
            }
        }
    }
    React.useEffect(() => {
      dispatch(selectPrice(price))
      dispatch(selectDownPaymentAmount(downPaymentValue))   
    }, [price])

    React.useEffect(() => {
        dispatch(selectDownPayment(downPayment[0]))
        dispatch(selectDownPaymentAmount(downPaymentValue))
    }, [downPayment])


    const downPaymentValue = (price * (downPayment[0])) / 100;
    const formattedDownPayment = addcomma(downPaymentValue);

    return (
        <Card className={cn("h-[580px]", className)} {...props}>
                        <CardHeader>
        <CardTitle>Budget</CardTitle>
        <CardDescription>Property price & downpayment</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      
      
      <div className="grid  max-w-sm items-center gap-1.5">
      <Label>Property price: {formatNumber(price)}</Label>
      <Input value={price} onChange={handleInputChange} ></Input>
        </div>

        {!!(price > 0) && (
                <div className="grid  max-w-sm items-center gap-1.5 mt-6">
                    <Label>Down payment</Label>
                    <Slider defaultValue={downPayment} min={min} max={max} step={.5} value={downPayment} onValueChange={(downPayment: React.SetStateAction<any[]>) => setDownPayment(downPayment)} />
                    <p>{downPayment + "%"}</p>
                    <p>{formattedDownPayment}</p>
                </div>
            )}

        </CardContent>
        </Card>
    )
}34