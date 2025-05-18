"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {amortizationFormatter,  feesAmount, moneyToString, equityFormatter, addcomma} from "../../utils/utils"

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
import { amortizationSchedule, equitySchedule, mortgageInsurance, principalAndInterest } from "@/utils/sliceUtil"
import { loanTypes } from "@/constants/types"


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
} satisfies ChartConfig
export function GraphEquity() {
  const finance = useSelector((state) => state.finance.financeDetails);

  let mortgage = principalAndInterest(finance)
  let amortization = equitySchedule(finance, mortgage)
  let chartData = equityFormatter(amortization, finance)



  return (

    <Card className='col-span-5'>
      <CardHeader>
        <CardTitle>Home Equity Graph</CardTitle>
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
      {!!(chartData[1] != null & finance.type != loanTypes.FHA) &&
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              You will have 20% equity in your home in {chartData[1]} months without having to make any additonal payments. At that point, you will be able to remove the Mortgage Insurance from you Mortgage payment and it will deacrease by {addcomma(mortgageInsurance(finance))} per year
            </div>
          </div>
        </div>
      </CardFooter>
}
    </Card>
  )
}
