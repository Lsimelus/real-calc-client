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
import {cityOptionsList } from "../../utils/utils"
import { Label } from "@/components/ui/label"

  
type CardProps = React.ComponentProps<typeof Card>
 
export function Location({ className, ...props }: CardProps) {
    const cityOptions = useSelector((state) => state.location.locationDetails.cityOptions);
    const dispatch = useDispatch();


    function pickState(state: string){
      dispatch(fetchStateInfo(state))
      dispatch(selectState(state))
        
    }
    
    function pickCity(){
        dispatch(selectCity("Everett"))
        dispatch(fetchCityInfo("Everett"))
    }
    

  return (
    <Card className={cn("h-[580px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Location</CardTitle>
        <CardDescription>Just incase</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>State</Label>
      <Combobox frameworks={states} onSelect={pickState} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>City</Label>
      <Combobox frameworks={cityOptionsList(cityOptions)} onSelect={pickCity} />
      </div>
  </CardContent>
    </Card>
  )
}