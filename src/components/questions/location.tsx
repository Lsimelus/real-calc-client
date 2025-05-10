import { useDispatch, useSelector } from "react-redux";
import { fetchCityInfo ,fetchStateInfo } from "@/api/fetchhData";
import { selectCity, selectState } from "@/lib/locationSlice";
import { cn } from "@/lib/utils"
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
    const locationSlice =  useSelector((state) => state.location.locationDetails);
    const cityOptions = locationSlice.cityOptions
    const city = locationSlice.city;
    const state = locationSlice.state;
    const dispatch = useDispatch();


    function pickState(state: string){
      dispatch(fetchStateInfo(state))
    }
    
    function pickCity(city:string){
        dispatch(fetchCityInfo(state+ "/"+city))
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
      <Combobox frameworks={states} onSelect={pickState} defaultValue={state} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>City</Label>
      <Combobox frameworks={cityOptionsList(cityOptions)} onSelect={pickCity}  defaultValue={city}/>
      </div>
  </CardContent>
    </Card>
  )
}