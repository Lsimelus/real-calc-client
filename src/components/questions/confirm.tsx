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


  
type CardProps = React.ComponentProps<typeof Card>
 
export function Confirm({ className, ...props }: CardProps) {
    const dispatch = useDispatch();


  return (
    <Card className={cn("h-[520px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Confirm these details</CardTitle>
        <CardDescription>Creative nonsenggcfse</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      <Button onClick={() => dispatch(selectCompleteness(true))}>Confirm info</Button>
  </CardContent>
    </Card>
  )
}