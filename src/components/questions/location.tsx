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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const notifications = [
    {
      title: "Your call has been confirmed.",
      description: "1 hour ago",
    },
    {
      title: "You have a new message!",
      description: "1 hour ago",
    },
    {
      title: "Your subscription is expiring soon!",
      description: "2 hours ago",
    },
  ]
 
  
type CardProps = React.ComponentProps<typeof Card>
 
export function Location({ className, ...props }: CardProps) {
    const state = useSelector((state) => state.location.locationDetails.state);
    const city = useSelector((state) => state.location.locationDetails.city);
    const complete = useSelector((state) => state.location.locationDetails.complete);


    const tax = useSelector((state) => state.location.locationDetails.tax);
    const rental = useSelector((state) => state.location.locationDetails.rental);
  
    const dispatch = useDispatch();


    function pickState(){
        dispatch(selectState("MA"))
        dispatch(fetchTax("MA"))
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
      <Button onClick={() => pickState()}>state</Button>

      <p>city</p>
      <p>{city}</p>
      <Button onClick={() => pickCity()}>city</Button>

      <p>done boolean</p>
      <p>{complete ? "complete": "not compplete"}</p>
      <p>{tax}</p>
      <p>{rental}</p>


  </CardContent>
    </Card>
  )
}