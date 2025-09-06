import { useDispatch, useSelector } from "react-redux";
import { fetchCityInfo, fetchStateInfo } from "@/api/fetchData";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { states } from "../../constants/states";
import { addcomma, cityOptionsList } from "../../utils/utils";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  selectPrice
} from "@/lib/financeSlice";
type CardProps = React.ComponentProps<typeof Card>;

export function Location({ className, ...props }: CardProps) {
  const location = useSelector((state: any) => state.location.locationDetails);
  const finance = useSelector((state: any) => state.finance.financeDetails);
  const dispatch = useDispatch<any>();

  const handleStateSelect = (selectedState: string) => {
    if (selectedState) {
      dispatch(fetchStateInfo(selectedState));
    }
  };

  const handleCitySelect = (selectedCity: string) => {
    if (selectedCity && location.state) {
      dispatch(fetchCityInfo(`${location.state}/${selectedCity}`));
    }
  };

  // Example: If you want to show a future date, you can keep this logic.
  const [currentDate, setCurrentDate] = React.useState("");
  React.useEffect(() => {
    const date = new Date();
    const futureDate = new Date(date.setMonth(date.getMonth() + 25));
    setCurrentDate(`${futureDate.getMonth()}/${futureDate.getFullYear()}`);
  }, []);

  
  React.useEffect(() => {
    if (location.medianValue !== 0 && finance.homePrice === 0) { //Todo: This might happen all the time. TBD
      dispatch(selectPrice(location.medianValue));
    }
  }, [location.medianValue]);

  return (
    <Card className={cn("h-[580px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Location</CardTitle>
        <CardDescription>Where is your next property?</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>State</Label>
          <Combobox
            frameworks={states}
            onSelect={handleStateSelect}
            defaultValue={location.state}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>City</Label>
          <Combobox
            frameworks={cityOptionsList(location.cityOptions)}
            onSelect={handleCitySelect}
            defaultValue={location.city}
          />
        </div>
        {!!location.medianValue && (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>
              Median home value in {location.county}:{" "}
              <span className="font-bold">
                {addcomma(location.medianValue)}
              </span>
            </Label>
          </div>
        )}
        {!!location.medianTax && (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>
              Median property tax in {location.county}:{" "}
              <span className="font-bold">{(location.medianTax*12).toFixed(2)}%</span>
            </Label>
          </div>
        )}
        {!!location.medianRent && (
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>
              Median unit rental in {location.city}:{" "}
              <span className="font-bold">{addcomma(location.medianRent)}</span>
            </Label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
