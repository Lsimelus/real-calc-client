"use client";
import React from 'react';
import {addcomma, principalAndInterest, propertyTax, homeInsurance, mortgageInsurance, pmInsurance, feesAmount, moneyToString, calcDownDeposit} from "../../utils/utils"

import { useSelector } from "react-redux";
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
  import { Button } from "@/components/ui/button"


  

  interface SummaryProps {
    questionCompleted: boolean;
  }
  
  
  export const Summary: React.FC<SummaryProps> = ({questionCompleted}: SummaryProps)=>{
  const price = useSelector((state) => state.price.priceDetails);
  const loan = useSelector((state) => state.loan.loanDetails);
  const tax = useSelector((state) => state.tax.taxDetails);
  const insurance = useSelector((state) => state.insurance.insuranceDetails);
  const fees = useSelector((state) => state.fees.feesDetails);

  const [invoices, setInvoices] = React.useState([
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
  ]);

  const updateInvoiceRow = (index: number, value: number) => {
    setInvoices(prevInvoices => {
      const newInvoices = [...prevInvoices];
      newInvoices[index].monthly = addcomma(value / 12);
      newInvoices[index].yearly = addcomma(value);
      return newInvoices;
    });
  };

  function getSumOfRows() {
    let sum = 0;
    for (let i = 0; i < 6; i++) {
        sum +=  moneyToString(invoices[i].monthly)
    }
    return sum;
}

function row0(){
  var value =  principalAndInterest(price, loan)*12
  updateInvoiceRow(0, value);
}

function row1(){
    var value = propertyTax(price, tax);
    updateInvoiceRow(1, value);
}

function row2(){
    var value = homeInsurance(price, insurance);
    updateInvoiceRow(2, value);
}

function row3(){
    var value = mortgageInsurance(price);
    updateInvoiceRow(3, value);
}

function row4(){
    var value = pmInsurance(price, loan);
    updateInvoiceRow(4, value);
}

function row5(){
    var value = feesAmount(fees);
    updateInvoiceRow(5, value);
}

function downDeposit(){
  return calcDownDeposit(price)
}

    React.useEffect(() => {
      row0();
      row1();
      row2();
      row3();
      row4();
      row5();
    }, [price, loan, insurance, tax, fees]);

    React.useEffect(() => {
      
    }, [invoices]);
    

  return (
    <div className='col-span-5 lg:col-span-2'>
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">
            {questionCompleted && 
            <Button>Edit</Button>
            }
            
            </TableHead>
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
          <TableCell className="text-right">{addcomma(getSumOfRows())}</TableCell>
        </TableRow>
      </TableFooter>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Down Payment + Closing Cost</TableCell>
          <TableCell className="text-right">{addcomma(getSumOfRows() + downDeposit())}</TableCell>
        </TableRow>
      </TableFooter>
      
    </Table>
    </div>
    
  )
}
