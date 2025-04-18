import {price} from "../lib/priceSlice"
import {loan} from "../lib/loanSlice"
import {tax} from "../lib/taxSlice"
import { insurance } from "@/lib/insuranceSlice"
import { fees } from "../lib/feesSlice"
import { calculateMortgage, calculateHomeInsurance, calculateMortgageInsurance, calculatePropertyTax, calculatePMI } from "./math"

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

export const principalAndInterest = (currPrice: price, currLoan:loan) =>{

    if (!currPrice.complete || !currLoan.complete) {
        return 0;
    }

    
    let principal = currPrice.homePrice- currPrice.downPaymentAmount; // $200,000 loan
    let annualInterestRate = currLoan.exactOption ? currLoan.exact : currLoan.rate; // 5% annual interest rate
    let years = currLoan.length; // 30-year mortgage

    let monthlyPayment = calculateMortgage(principal, annualInterestRate, years);
    return monthlyPayment
}

export const amortizationSchedule = (currPrice: price, currLoan:loan, principalAndInterest:number) =>{
    var loanAmount = currPrice.homePrice- currPrice.downPaymentAmount;
    let annualInterestRate = currLoan.exactOption ? currLoan.exact : currLoan.rate;
    let monthlyInterest = annualInterestRate / 1200

    
    
    var interestPayment = loanAmount * monthlyInterest
    var principalPaid = principalAndInterest - interestPayment


    let scheduleInfo = []
    var i = 1
    while (i <= currLoan.length*12) {
        var interestPayment = loanAmount * monthlyInterest
        var principalPaid = principalAndInterest - interestPayment
        let payments = [principalPaid, interestPayment]
        scheduleInfo.push(payments)
        loanAmount -= principalPaid
        i++;
      }

    return scheduleInfo

}


export const propertyTax = (currPrice: price, currTax:tax) =>{
    if (!currPrice.complete || !currTax.complete) {
        return 0;
    }
    let propertyValue = currPrice.homePrice
    let taxRate = currTax.exactOption ? currTax.exact : currTax.local ? currTax.local: currTax.national;

return calculatePropertyTax(propertyValue, taxRate);
}

export const homeInsurance = (currPrice: price, currInsurance:insurance) =>{
    if (!currPrice.complete || !currInsurance.complete) {
        return 0;
    }
    if (currInsurance.exactOption){
        return currInsurance.exact
    }else{
        let homeValue = currPrice.homePrice;

        return calculateHomeInsurance(currPrice.homePrice, currInsurance.default)
    }

}

export const mortgageInsurance = (currPrice: price) =>{
    if (!currPrice.complete) {
        return 0;
    }
    let loanAmount = currPrice.homePrice- currPrice.downPaymentAmount; // $180,000 loan amount
let insuranceRate = 0.85; // 0.85% mortgage insurance rate

return calculateMortgageInsurance(loanAmount, insuranceRate);

}

export const pmInsurance = (currPrice: price, currLoan:loan) =>{
    if (!currPrice.complete || !currLoan.complete) {
        return 0;
    }
    let loanAmount = calcLoanAmount(currPrice) // $250,000 loan amount
let pmiRate = 0.75; // 0.75% PMI rate

return calculatePMI(loanAmount, pmiRate);

}

export const calcDownDeposit = (currPrice: price) =>{
    return calcLoanAmount(currPrice) * 0.02;
}

const calcLoanAmount = (currPrice: price) =>{
    return currPrice.homePrice- currPrice.downPaymentAmount;
}  

export const feesAmount = (fees: fees) =>{
    return fees.fee * 12;
}