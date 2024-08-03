import { BellRing, Check } from "lucide-react"
 
import { useDispatch, useSelector } from "react-redux";
import { fetchTax, fetchRent } from "@/api/fetchhData";
import { selectCity, selectState } from "@/lib/locationSlice";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Combobox } from "@/components/ui/combobox";
import { states } from "../../constants/states";


  
type CardProps = React.ComponentProps<typeof Card>
 
export function Location({ className, ...props }: CardProps) {
    const state = useSelector((state) => state.location.locationDetails.state);
    const city = useSelector((state) => state.location.locationDetails.city);
    const tax = useSelector((state) => state.tax.taxDetails.national);
    const rental = useSelector((state) => state.location.locationDetails.rental);
  
    const dispatch = useDispatch();


    function pickState(state: string){
        dispatch(selectState(state))
        dispatch(fetchTax(state))
    }
    
    function pickCity(){
        dispatch(selectCity("Everett"))
        dispatch(fetchRent("Everett"))
    }
    

      
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      <p>state</p>
      <p>{state}</p>
      <Combobox frameworks={states} onSelect={pickState} />

      <p>city</p>
      <p>{city}</p>
      <Button onClick={() => pickCity()}>city</Button>

      <p>{tax}</p>
      <p>{rental}</p>
  </CardContent>
    </Card>
  )
}