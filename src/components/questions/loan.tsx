import React from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";




type CardProps = React.ComponentProps<typeof Card>;

type CustomHoverCardProps = {
  onClick: () => void;
  buttonText: string;
  contentText: string;
  active?: boolean;
};

const CustomHoverCard: React.FC<CustomHoverCardProps> = ({ onClick, buttonText, contentText, active=false }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant={active? "default": "ghost"} onClick={onClick}>{buttonText}</Button>
      </HoverCardTrigger>
      {active ==  false &&
      
      <HoverCardContent>
        {contentText}
      </HoverCardContent>
}
    </HoverCard>
  );
}
export function Loan({ className, ...props }: CardProps) {

  const [type, setType] = React.useState("");

  const cards = [
    {
      buttonText: 'FHA',
      contentText: 'adadsa',
      onClick: () => setType("fha"),
      active: type === "fha",
    },
    {
      buttonText: 'Conv.',
      contentText: 'adasd',
      onClick: () => setType("conventional"),
      active: type === "conventional",
    },
    {
      buttonText: 'Invest.',
      contentText: 'adasd',
      onClick: () => setType("investment"),
      active: type === "investment",
    },
  ];
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
    </Card>
  );
}