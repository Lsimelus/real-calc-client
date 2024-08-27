import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux";
import { selectPrice, selectDownPayment, selectDownPaymentAmount } from "@/lib/priceSlice"
import { addcomma, formatNumber } from "../../utils/utils";

type CardProps = React.ComponentProps<typeof Card>

export function Price({ className, ...props }: CardProps) {
    const min = 3.5
    const max = 75
    const initPrice = useSelector((state) => state.price.priceDetails.homePrice);
    const initDownPayment = useSelector((state) => state.price.priceDetails.downPaymentPercent);
    
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
        <Card className={cn("w-[380px]", className)} {...props}>
            <p>Price</p>
            <Input value={price} onChange={handleInputChange} ></Input>
            <p>price</p>
            <p>{formatNumber(price)}</p>
            {price > 0 && (
                <>
                    <Slider defaultValue={downPayment} min={min} max={max} step={.5} value={downPayment} onValueChange={(downPayment) => setDownPayment(downPayment)} />
                    <p>Down Payment</p>
                    <p>{downPayment + "%"}</p>
                    <p>{formattedDownPayment}</p>
                </>
            )}
        </Card>
    )
}