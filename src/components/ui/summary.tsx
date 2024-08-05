"use client";
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


  const invoices = [
    { cost: "Principal & Interest",
        monthly: "",
        yearly: "",
        test: ""
    },
    { cost: "Property Taxes",
        monthly: "",
        yearly: "",
        test: ""
    },
    { cost: "Homeowners Insurance",
        monthly: "",
        yearly: "",
        test: ""
    },
    { cost: "Mortgage Insurance",
        monthly: "",
        yearly: "",
        test: ""
    },
    { cost: "Premium Mortgage Insurance",
        monthly: "",
        yearly: "",
        test: ""
    },
    { cost: "HOA Dues + fees",
        monthly: "",
        yearly: "",
        test: ""
    }
  ]
  
export default function Summary() {
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
            <TableCell className="font-medium">{invoice.cost}</TableCell>
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
