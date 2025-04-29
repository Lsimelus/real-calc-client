"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {schedule,addcomma, principalAndInterest, propertyTax, homeInsurance, mortgageInsurance, pmInsurance, feesAmount, moneyToString, calcDownDeposit, amortizationSchedule, prin} from "../../utils/utils"

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

// from function
const chartData3 = [
  { month: "January", interest: 186, principal: 80 },
  { month: "January", interest: 286, principal: 180 },
  { month: "February", interest: 305, principal: 200 },
  { month: "March", interest: 237, principal: 120 },
  { month: "", interest: 73, principal: 190 },
  { month: "May", interest: 209, principal: 130 },
  { month: "June", interest: 214, principal: 140 },
]
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



  React.useEffect(() => {
    console.log("!!!!!!")
    let mortgage = principalAndInterest(finance, finance)
  //dispatch(selectPI(mortgage))
    let value =  mortgage*12

    let amortization = amortizationSchedule(finance, finance, mortgage)
    console.log(amortization)
    //dispatch(selectAmortization(amortization))
    

  }, []);
  
  let mortgage = principalAndInterest(finance, finance)
  //dispatch(selectPI(mortgage))
    let value =  mortgage*12

    let amortization = amortizationSchedule(finance, finance, mortgage)

    let chartData = schedule(amortization)
    //console.log(chartData2)

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
            data={chartData}
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
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
