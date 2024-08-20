"use client";
import React from 'react';
import { QuestionCard } from "@/components/ui/questioncard";
import { QuestionCarousel } from "@/components/ui/questioncarousel";
import { Progress } from "@/components/ui/progress"

import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
  } from "@/components/ui/table"

  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


  
  const invoices = [
    { cost: "Principal & Interest",
        monthly: "jhvj",
        yearly: "hjvj",
        desc: "The principal is the amount of money you borrowed to buy the home. The interest is the cost of borrowing that money."
    },
    { cost: "Property Taxes",
        monthly: "",
        yearly: "",
        desc: "Property taxes are assessed by the local government and are based on the value of your home."
    },
    { cost: "Homeowners Insurance",
        monthly: "",
        yearly: "",
        desc: "Homeowners insurance protects your home and belongings from damage or theft."
    },
    { cost: "Mortgage Insurance",
        monthly: "",
        yearly: "",
        desc: "Mortgage insurance protects the lender if you stop making payments on your loan."
    },
    { cost: "Premium Mortgage Insurance",
        monthly: "",
        yearly: "",
        desc: "Premium mortgage insurance is a type of mortgage insurance that is only required for certain loans."
    },
    { cost: "HOA Dues + fees",
        monthly: "",
        yearly: "",
        desc: "HOA dues are fees that are paid to a homeowners association for the upkeep of common areas."
    }
  ]
  
export default function Summary() {

    React.useEffect(() => {
        invoices[0].monthly = "hjsddsfsvj";

      }, [])
    

    
  return (
    <>
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Category</TableHead>
          <TableHead className="w-[230px]">Monthly</TableHead>
          <TableHead  >Yearly</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.cost}>
            <TableCell className="font-medium"><TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{invoice.cost}</TooltipTrigger>
                <TooltipContent>
                <p>{invoice.desc}</p>
                </TooltipContent>
            </Tooltip>
            </TooltipProvider></TableCell>

            <TableCell>{invoice.monthly}</TableCell>
            <TableCell>{invoice.yearly}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Mortgage</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Down Payment + Closing Cost</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
      
    </Table>
    </>
    
  )
}
