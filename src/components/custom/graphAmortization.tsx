"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
import React from "react";

export interface amortizationChartInfo {
  data: any[];
  point: string;
}

interface GraphAmortizationProps {
  chartData: amortizationChartInfo;
}

const chartConfig: ChartConfig = {
  interest: {
    label: "Interest",
    color: "hsl(var(--chart-1))",
  },
  principal: {
    label: "Principal",
    color: "hsl(var(--chart-2))",
  },
};

export const GraphAmortization: React.FC<GraphAmortizationProps> = ({
  chartData,
}) => (
  <Card className="col-span-5 lg:col-span-3">
    <CardHeader>
      <CardTitle>Amortization Schedule Graph</CardTitle>
      <CardDescription>
        An amortization calculator helps you understand how loan payments are
        broken down into principal and interest over time, providing a detailed
        payment schedule. You can use it to calculate your monthly payment, see
        how much interest you'll pay, and determine how quickly you can pay off
        a loan by making extra payments.
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
            tickMargin={12}
            tickFormatter={(value) => value.slice(0, 12)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="interest"
            type="monotone"
            stroke="var(--color-interest)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="principal"
            type="monotone"
            stroke="var(--color-principal)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
    <CardFooter>
      <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <p className="gap-2 leading-none text-muted-foreground">
            The principal paid per month will be more than the interest paid
            until{" "}
            <span className="font-bold text-black">{chartData.point}</span>. The
            only way to change this is be refinancing. Home improvements or
            extra payments will not make this happen sooner. Look at the Home
            Equity graph below to have a better understanding of your loan.
          </p>
        </div>
      </div>
    </CardFooter>
  </Card>
);
