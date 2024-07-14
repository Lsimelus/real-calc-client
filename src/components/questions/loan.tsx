import React from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectType, selectRate } from "../../lib/loanSlice";
import { loanTypes } from "../../constants/types";
import { Input } from "@/components/ui/input"

type CardProps = React.ComponentProps<typeof Card>;

type CustomHoverCardProps = {
  onClick: () => void;
  buttonText: string;
  contentText: string;
  active?: boolean;
};

const CustomHoverCard: React.FC<CustomHoverCardProps> = ({ onClick, buttonText, contentText, active = false }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant={active ? "default" : "ghost"} onClick={onClick}>{buttonText}</Button>
      </HoverCardTrigger>
      {active == false &&
        <HoverCardContent>
          {contentText}
        </HoverCardContent>
      }
    </HoverCard>
  );
}

export function Loan({ className, ...props }: CardProps) {

  const initType = useSelector((state) => state.loan.loanDetails.type);
  const initExact = useSelector((state) => state.loan.loanDetails.exact);
  const initExactOption = useSelector((state) => state.loan.loanDetails.exactOption);
  
  const [type, setType] = React.useState<loanTypes>(initType);
  const [exact, setExact] = React.useState(initExact);
  const [exactOption, setExactOption] = React.useState(initExactOption);

  const cardTypes: { [key in loanTypes]: { buttonText: string, contentText: string, rates: number } } = {
    [loanTypes.None]: { buttonText: 'None', contentText: 'No loan type selected', rates: 0 },
    [loanTypes.FHA]: { buttonText: 'FHA', contentText: 'fha specific adadsa', rates: 2.5 },
    [loanTypes.Conventional]: { buttonText: 'Convtest', contentText: 'conventional specific adasd', rates: 2.5 },
    [loanTypes.Investment]: { buttonText: 'Invest option', contentText: 'investment specific adasd', rates: 2.5 },
    [loanTypes.VA]: { buttonText: 'VA', contentText: 'va specific adadsa', rates: 2.5 },
    [loanTypes.USDA]: { buttonText: 'USDA', contentText: 'usda specific adadsa', rates: 2.5 },
  };

  const cards = Object.entries(cardTypes)
    .slice(1)
    .map(([cardType, { buttonText, contentText, rates }]) => ({
      buttonText,
      contentText,
      onClick: () => setType(prevType => prevType === cardType ? loanTypes.None : cardType as loanTypes),
      active: type === cardType,
    }));

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(selectType(type))
    if (type !== loanTypes.None) {
      dispatch(selectRate(cardTypes[type].rates))
    }
  }, [type])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (value.trim() === "") {
        setExact(0.0);
    } else {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
            setExact(parsedValue);
        }
    }
}

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <div className="flex h-5 items-center space-x-4 text-sm">
        {cards.map((card, index) => (
          <React.Fragment key={index}>
            <CustomHoverCard {...card} />
            {index < cards.length - 1 && <Separator orientation="vertical" />}
          </React.Fragment>
        ))}
      </div>
      {type !== loanTypes.None && (
        <div>
          <p>jgcjcjncj</p>
          <p>{cardTypes[type].rates}</p>
          <p>Do you have a prices quote?</p>
          <Button onClick={() => setExactOption(true)} variant={exactOption ? "default" : "ghost"} >Yes</Button>
          <Button onClick={() => setExactOption(false)}   variant={!exactOption ? "default" : "ghost"}>No</Button>
          {exactOption && (
            <Input
            step="0.1"
            min='0.1'
            max='30' value={exact} onChange={handleInputChange} ></Input>
          ) }

          
        </div>
      )}
    </Card>
  );
}