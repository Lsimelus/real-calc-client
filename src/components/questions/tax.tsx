import { cn } from "@/lib/utils"
import {
  Card
} from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux";

type CardProps = React.ComponentProps<typeof Card>
 
export function Tax({ className, ...props }: CardProps) {
  const nation = useSelector((state) => state.tax.taxDetails.national);
  const tax = useSelector((state) => state.tax.taxDetails.local);
  
  const state = useSelector((state) => state.location.locationDetails.state);
  const city = useSelector((state) => state.location.locationDetails.city);

  console.log("Tax", tax)
  console.log("Nation", nation)
  

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      {
        tax > 0 ? (
          <p>{tax}</p>
        ) : (
          <p>{nation}</p>
        )
      }
        <p>Tax</p>
    </Card>
  )
}