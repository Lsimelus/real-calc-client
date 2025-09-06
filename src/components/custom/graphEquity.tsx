"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { addcomma } from "../../utils/utils";
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
import { mortgageInsurance } from "@/utils/sliceUtil";
import { loanTypes } from "@/constants/types";

const chartConfig: ChartConfig = {
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
};

export interface equityChartInfo {
  data: any[];
  point: number;
}

interface GraphEquityProps {
  chartData: equityChartInfo;
}

export const GraphEquity: React.FC<GraphEquityProps> = ({ chartData }) => {
  const finance = useSelector((state: any) => state.finance.financeDetails);

  const [turningDate, setTurningDate] = React.useState("");
  React.useEffect(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + chartData.point);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based
    setTurningDate(`${month}/${year}`);
  }, [chartData.point]);

  return (
    <Card className="col-span-5 lg:col-span-3">
      <CardHeader>
        <CardTitle>Home Equity Graph</CardTitle>
        <CardDescription>
          A Home Equity Graph is a visual representation, often a line or bar
          chart, of a homeowner's home equity over time. It illustrates how home
          equity changes as a result of factors like principal mortgage
          payments. It does not include home value appreciation, extra principal
          payments, or property improvements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData.data}
            margin={{ left: 12, right: 12 }}
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
      {!!(chartData.point > -1 && finance.type !== loanTypes.FHA) && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <p className="gap-2 leading-none text-muted-foreground">
                During <span className="font-bold text-black">{turningDate}</span>, you will have <span className="font-bold text-black">20%</span> equity in your home,
                which means you will not have to make any additional payments.
                At that point, you will be able to remove the Mortgage Insurance
                from your mortgage payment and it will decrease by{" "}
                <span className="font-bold text-black">{addcomma(mortgageInsurance(finance))}</span> per year.
              </p>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
