import { BellRing, Check } from "lucide-react"
 
import { useDispatch, useSelector } from "react-redux";
import { fetchCityInfo ,fetchStateInfo } from "@/api/fetchhData";
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
    const cityOptions = useSelector((state) => state.location.locationDetails.cityOptions);
  
    const dispatch = useDispatch();


    function pickState(state: string){
        dispatch(selectState(state))
        dispatch(fetchStateInfo(state))
        console.log(cityOptions)
    }
    
    function pickCity(){
        dispatch(selectCity("Everett"))
        dispatch(fetchCityInfo("Everett"))
    }
    

  return (
    <Card className={cn("h-[580px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Location</CardTitle>
        <CardDescription>Where is your next property?</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      <Combobox frameworks={states} onSelect={pickState} />
      <p>{city}</p>
      <Button onClick={() => pickCity()}>Pick City</Button>
  </CardContent>
    </Card>
  )
}