import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux";
import { selectPrice, selectDownPayment, selectDownPaymentAmount } from "@/lib/priceSlice"
import { setFee } from "@/lib/feesSlice"

type CardProps = React.ComponentProps<typeof Card>

export function Fees({ className, ...props }: CardProps) {
    const initPrice = useSelector((state) => state.fees.feesDetails.fee);
    const [feeAmount, setFeeAmount] = React.useState(initPrice)


    const dispatch = useDispatch();


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '') {
            setFeeAmount(0);
        } else {
            const intValue = parseInt(value, 10);
            if (!isNaN(intValue)) {
                setFeeAmount(intValue);
            }
        }
    }
    React.useEffect(() => {
      dispatch(setFee(feeAmount)) 
    }, [feeAmount])


    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <p>Monthly fees</p>
            <Input value={feeAmount} onChange={handleInputChange} ></Input>
            
        </Card>
    )
}