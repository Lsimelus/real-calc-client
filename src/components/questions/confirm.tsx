import { BellRing, Check } from "lucide-react"
 
import { useDispatch, useSelector } from "react-redux";
//import { fetchTax, fetchRent } from "@/api/fetchhData";
import { selectCompleteness } from "@/lib/confirmSlice";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {homeInsurance, propertyTax} from "../../utils/sliceUtil"
import { Label } from "../ui/label";
import { addcomma, formatNumber } from "@/utils/utils";
import { financeSlice } from "@/lib/financeSlice";
import * as React from "react"

  
type CardProps = React.ComponentProps<typeof Card>
 
export function Confirm({ className, ...props }: CardProps) {
  const location = useSelector((state) => state.location.locationDetails);
  const finance = useSelector((state) => state.finance.financeDetails);
  const tax = useSelector((state) => state.tax.taxDetails);
  const insurance = useSelector((state) => state.insurance.insuranceDetails);
  const fees = useSelector((state) => state.fees.feesDetails);
  const dispatch = useDispatch();


  return (
    <Card className={cn("h-[520px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Confirm</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>Location: {location.city}, {location.state}</Label>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{finance.length} year {finance.type} with a {finance.exact > 0 ? finance.exact : finance.rate}%</Label>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>The property value is {formatNumber(finance.homePrice)} and a {finance.downPaymentPercent}%-{formatNumber(finance.downPaymentAmount)} will be put down</Label>
      </div>


      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>{fees.fee > 0 ? `The total monthly fees are ${addcomma(fees.fee)}`: `There are no monthly fees`}</Label>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>The total yearly premium for home insurance is  {addcomma(homeInsurance(finance, insurance)[1])}</Label>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>The total yearly taxes is {addcomma(propertyTax(finance, tax, location)[1])}</Label>
      </div> 

      <Button onClick={() => dispatch(selectCompleteness(true))}>Confirm info</Button>
    </CardContent>
    </Card>
  )
}