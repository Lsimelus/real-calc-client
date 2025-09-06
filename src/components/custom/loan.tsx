import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectType,
  selectExactRate,
  selectLength,
} from "../../lib/financeSlice";
import { loanTypes } from "../../constants/misc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "../ui/slider";

type CardProps = React.ComponentProps<typeof Card>;

type CustomHoverCardProps = {
  onClick: () => void;
  buttonText: string;
  contentText: string;
  active?: boolean;
};

const CustomHoverCard: React.FC<CustomHoverCardProps> = ({
  onClick,
  buttonText,
  contentText,
  active = false,
}) => (
  <HoverCard>
    <HoverCardTrigger>
      <Button variant={active ? "default" : "ghost"} onClick={onClick}>
        {buttonText}
      </Button>
    </HoverCardTrigger>
    {!active && <HoverCardContent>{contentText}</HoverCardContent>}
  </HoverCard>
);

export const cardTypes: {
  [key in loanTypes]: {
    buttonText: string;
    contentText: string;
    rates: number;
    minDownpayment: number;
  };
} = {
  [loanTypes.None]: {
    buttonText: "None",
    contentText: "No loan type selected",
    rates: 0,
    minDownpayment: 0,
  },
  [loanTypes.FHA]: {
    buttonText: "F.H.A.",
    contentText:
      "First time home buyer. Great for those with low credit and low down payment. Typically refinanced within the first trimester of loan life time",
    rates: 6,
    minDownpayment: 2.5,
  },
  [loanTypes.Conventional]: {
    buttonText: "Conventional",
    contentText: "Typical loan. No hidden fees. Higher rate than FHA",
    rates: 7,
    minDownpayment: 5,
  },
  [loanTypes.Investment]: {
    buttonText: "Investment loan",
    contentText:
      "Investment loan. Works for 4+ unit property. Does not need to be owner occupied. Higher rate than conventional",
    rates: 8.5,
    minDownpayment: 15,
  },
};

export function Loan({ className, ...props }: CardProps) {
  const financeSlice = useSelector(
    (state: any) => state.finance.financeDetails,
  );
  const initType = financeSlice.type;
  const initExact = financeSlice.exactRate;
  const initLoanLength = financeSlice.length;

  const [loanLength, setLoanLength] = React.useState([initLoanLength]);
  const [type, setType] = React.useState<loanTypes>(initType);
  const [exact, setExact] = React.useState<number>(initExact);
  const [exactOption, setExactOption] = React.useState(initExact !== 0);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(selectType(type));
  }, [type, dispatch]);

  React.useEffect(() => {
    dispatch(selectExactRate(exact));
  }, [exact, dispatch]);

  React.useEffect(() => {
    dispatch(selectLength(loanLength[0]));
  }, [loanLength, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setExact(0);
    } else {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        setExact(floatValue);
      }
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let value = parseFloat(event.target.value);
    if (isNaN(value)) {
      value = 0.0;
    } else if (value < 0.0) {
      value = 0.0;
    } else if (value > 30.0) {
      value = 30.0;
    }
    setExact(Number(value.toFixed(1)));
  };

  const cards = Object.entries(cardTypes)
    .filter(([cardType]) => cardType !== loanTypes.None)
    .map(([cardType, { buttonText, contentText, rates }]) => ({
      buttonText,
      contentText,
      onClick: () =>
        setType((prevType) =>
          prevType === cardType ? loanTypes.None : (cardType as loanTypes),
        ),
      active: type === cardType,
    }));

  return (
    <Card className={cn("h-[580px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Loan Type</CardTitle>
        <CardDescription>Loan type, interest rate, and length</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex h-5 items-center space-x-4 text-sm ml-8">
          {cards.map((card, index) => (
            <React.Fragment key={index}>
              <CustomHoverCard {...card} />
              {index < cards.length - 1 && <Separator orientation="vertical" />}
            </React.Fragment>
          ))}
        </div>
        {type !== loanTypes.None && (
          <div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-10 mt-10">
              <Label>
                The length of the loan:{" "}
                <span className="font-bold">{loanLength}</span> years
              </Label>
              <Slider
                defaultValue={[30]}
                max={30}
                step={5}
                min={10}
                value={loanLength}
                onValueChange={setLoanLength}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>
                Typical rate for loan type:{" "}
                <span className="font-bold">{cardTypes[type].rates}</span>
                {"%"}
              </Label>
            </div>
            <div className="grid max-w-sm items-center gap-1.5">
              <Label>
                Do you want to use a specific interest rate instead?{" "}
                {exact > 0 && `${exact}%`}
              </Label>
            </div>
            <Button
              onClick={() => setExactOption(true)}
              variant={exactOption ? "default" : "ghost"}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setExactOption(false);
                setExact(0.0);
              }}
              variant={!exactOption ? "default" : "ghost"}
            >
              No
            </Button>
            {exactOption && (
              <Input
                type="number"
                step="0.1"
                min="0.0"
                max="30"
                value={exact === 0 ? "" : exact}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            )}
            <div className="grid w-full max-w-sm items-center gap-1.5"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
