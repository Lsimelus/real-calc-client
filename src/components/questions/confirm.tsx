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
import { Label } from "../ui/label";
import { formatNumber } from "@/utils/utils";


  
type CardProps = React.ComponentProps<typeof Card>
 
export function Confirm({ className, ...props }: CardProps) {
  const location = useSelector((state) => state.location.locationDetails);
  const price = useSelector((state) => state.price.priceDetails);
  const finance  = useSelector((state) => state.finance.financeDetails );
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
      <Label>The property value is {formatNumber(price.homePrice)} and a {price.downPaymentPercent}%-{formatNumber(price.downPaymentAmount)} will be put down</Label>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
      {
          tax.exactOption ?
          <Label>The user given insurance is {tax.exact}.</Label>
          :
          <Label>The estimated yearly insurance premium is  {tax.national}</Label>
        }
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>{fees.fee > 0 ? `The total monthly fees are ${fees.fee}`: `There are no monthly fees`}</Label>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        {
          insurance.exactOption ?
          <Label>The user given insurance is {insurance.exact}.</Label>
          :
          <Label>The estimated yearly insurance premium is  {insurance.default}</Label>
        }

      </div>


      <Button onClick={() => dispatch(selectCompleteness(true))}>Confirm info</Button>
    </CardContent>
    </Card>
  )
}