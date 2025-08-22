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
import { chartInfo } from "./graphEquity";

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

interface GraphAmortizationProps {
  chartData: chartInfo;
}

export const GraphAmortization: React.FC<GraphAmortizationProps> = ({
  chartData,
}) => (
  <Card className="col-span-5 lg:col-span-3">
    <CardHeader>
      <CardTitle>Amortization Schedule Graph</CardTitle>
      <CardDescription>Monthly payment</CardDescription>
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
          <div className="flex items-center gap-2 font-medium leading-none"></div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            During <span className="font-bold">{chartData.point}</span>, the
            principal will be more than the interest.
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
);