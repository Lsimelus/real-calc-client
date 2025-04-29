import {finance} from "../lib/financeSlice"
import {tax} from "../lib/taxSlice"
import { insurance } from "@/lib/insuranceSlice"
import { fees } from "../lib/feesSlice"
import { calculateMortgage, calculateHomeInsurance, calculateMortgageInsurance, calculatePropertyTax, calculatePMI } from "./math"
import { ComboboxItemProps } from "@/components/ui/combobox"

export const formatNumber = (num: number) => {
    if (num >= 1000000) {
        const mValue = num / 1000000;
        if (Number.isInteger(mValue)) {
            return '$' + mValue + 'M';
        } else {
            return '$' + mValue.toFixed(1) + 'M';
        }
    } else if (num >= 1000) {
        const kValue = num / 1000;
        if (Number.isInteger(kValue)) {
            return '$' + kValue + 'K';
        } else {
            return '$' + kValue.toFixed(1) + 'K';
        }
    } else {
        return '$' + num.toString();
    }
}

export const addcomma = (num: number) => {
    return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const moneyToString= (num: string) => {
    return parseFloat(num.replace(/[$,]/g, ''));
}

export const principalAndInterest = (financeSlice: finance) =>{

    if (!(financeSlice.loanComplete && financeSlice.priceComplete)) {
        return 0;
    }

    
    let principal = financeSlice.homePrice- financeSlice.downPaymentAmount;
    let annualInterestRate = financeSlice.exactRate > 0 ? financeSlice.exactRate : financeSlice.rate;
    let years = financeSlice.length;
    let monthlyPayment = calculateMortgage(principal, annualInterestRate, years);
    return monthlyPayment
}

export const amortizationSchedule = (financeSlice: finance, principalAndInterest:number) =>{
    var loanAmount = financeSlice.homePrice- financeSlice.downPaymentAmount;
    let annualInterestRate = financeSlice.exactRate > 0 ? financeSlice.exactRate : financeSlice.rate;
    let monthlyInterest = annualInterestRate / 1200

    
    
    var interestPayment = loanAmount * monthlyInterest
    var principalPaid = principalAndInterest - interestPayment


    let scheduleInfo = []
    var i = 1
    while (i <= financeSlice.length*12) {
        var interestPayment = loanAmount * monthlyInterest
        var principalPaid = principalAndInterest - interestPayment
        let payments = [principalPaid, interestPayment]
        scheduleInfo.push(payments)
        loanAmount -= principalPaid
        i++;
      }

    return scheduleInfo

}


export const propertyTax = (financeSlice: finance, currTax:tax) =>{
    if (!(financeSlice.loanComplete && financeSlice.priceComplete) || !currTax.complete) {
        return 0;
    }
    let propertyValue = financeSlice.homePrice
    let taxRate = financeSlice.exactRate > 0 ? financeSlice.exactRate : financeSlice.rate;

return calculatePropertyTax(propertyValue, taxRate);
}

export const homeInsurance = (financeSlice:finance, currInsurance:insurance) =>{
    if (!(financeSlice.loanComplete && financeSlice.priceComplete) || !currInsurance.complete) {
        return 0;
    }
    if (currInsurance.exactOption){
        return currInsurance.exact
    }else{
        let homeValue = financeSlice.homePrice;

        return calculateHomeInsurance(financeSlice.homePrice, currInsurance.default)
    }

}

export const mortgageInsurance = (financeSlice: finance) =>{
    if (!(financeSlice.loanComplete && financeSlice.priceComplete) ) {
        return 0;
    }
    let loanAmount = financeSlice.homePrice- financeSlice.downPaymentAmount; // $180,000 loan amount
let insuranceRate = 0.85; // 0.85% mortgage insurance rate

return calculateMortgageInsurance(loanAmount, insuranceRate);

}

export const pmInsurance = (financeSlice: finance) =>{
    if (!(financeSlice.loanComplete && financeSlice.priceComplete)) {
        return 0;
    }
    let loanAmount = calcLoanAmount(financeSlice) // $250,000 loan amount
let pmiRate = 0.75; // 0.75% PMI rate

return calculatePMI(loanAmount, pmiRate);

}

export const calcDownDeposit = (financeSlice: finance) =>{
    return calcLoanAmount(financeSlice) * 0.02;
}

const calcLoanAmount = (financeSlice: finance) =>{
    return financeSlice.homePrice- financeSlice.downPaymentAmount;
}  

export const feesAmount = (fees: fees) =>{
    return fees.fee * 12;
}

export const schedule = (unformatted_schdule: number[][]) =>{
    var chartData = []

    for (let i = 0; i < unformatted_schdule.length; i++) {
        var row = { month: (i+1).toString(), interest: unformatted_schdule[i][1], principal: unformatted_schdule[i][0] }
        chartData.push(row)
    }
    return chartData
}

const formatForCombo = (rawString:string) => {
    return rawString
} 

export const cityOptionsList = (cityOptions: string[]) => {
    var list: ComboboxItemProps[] = []
    for (let i = 0; i < cityOptions.length; i++) {
        list.push({
            value: cityOptions[i],
            label: cityOptions[i],
          })

    }
    return list
}

