"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {schedule,  feesAmount, moneyToString} from "../../utils/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { selectPI, selectAmortization } from '@/lib/loanSlice';
import { useDispatch, useSelector } from "react-redux"; 
import React from 'react';
import { amortizationSchedule, principalAndInterest } from "@/utils/sliceUtil"

const chartConfig = {
  interest: {
    label: "Interest",
    color: "hsl(var(--chart-1))",
  },
  principal: {
    label: "Principal",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig
export function Graph() {
  const finance = useSelector((state) => state.finance.financeDetails);

  let mortgage = principalAndInterest(finance)
  let amortization = amortizationSchedule(finance, mortgage)
  let chartData = schedule(amortization)


  return (

    <Card className='col-span-5 lg:col-span-3'>
      <CardHeader>
        <CardTitle>Amortization Schedule Graph</CardTitle>
        <CardDescription>Monthly payment</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData[0]}
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
            <div className="flex items-center gap-2 font-medium leading-none">
             
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              The principal will be more than the interest rate on month {chartData[1]}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
