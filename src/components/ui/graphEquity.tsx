"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  addcomma
} from "../../utils/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";
import React from "react";
import {
  mortgageInsurance
} from "@/utils/sliceUtil";
import { loanTypes } from "@/constants/types";

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--chart-3))",
  },
  cumulativeInterest: {
    label: "Cumulative Interest",
    color: "hsl(var(--chart-4))",
  },
  principalPaid: {
    label: "Principal Paid",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export interface chartInfo {
  data: any[];
  point: string;
}

interface GraphEquityProps {
  chartData: chartInfo;
}

export const GraphEquity: React.FC<GraphEquityProps> = ({
  chartData,
}: GraphEquityProps) => {
  const finance = useSelector((state: any) => state.finance.financeDetails);

  const [turningDate, setTurninDate] = React.useState("");
  React.useEffect(() => {
    const date = new Date();
    const newDate = new Date(
      new Date(date).setMonth(date.getMonth() + chartData.point),
    );
    // Format the date as desired, for example:

    const year = newDate.getFullYear().toString(); // e.g., "7/10/2025"
    const month = newDate.getMonth().toString();
    // const formattedDate = date.toDateString(); // e.g., "Thu Jul 10 2025"
    setTurninDate(month + "/" + year);
  }, [chartData.point]); // The empty dependency array ensures this runs only once on mount

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Home Equity Graph</CardTitle>
        <CardDescription>Monthly payment</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData.data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="balance"
              type="monotone"
              stroke="var(--color-balance)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="cumulativeInterest"
              type="monotone"
              stroke="var(--color-cumulativeInterest)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="principalPaid"
              type="monotone"
              stroke="var(--color-principalPaid)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {!!(chartData.point > -1 && finance.type != loanTypes.FHA) && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                During {turningDate}, you will have 20% equity in your home,
                which means you will not have to make any additonal payments. At
                that point, you will be able to remove the Mortgage Insurance
                from you Mortgage payment and it will deacrease by{" "}
                {addcomma(mortgageInsurance(finance))} per year
              </div>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
