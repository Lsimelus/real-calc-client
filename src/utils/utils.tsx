import {price} from "../lib/priceSlice"
import {loan} from "../lib/loanSlice"
import {tax} from "../lib/taxSlice"
import { insurance } from "@/lib/insruanceSlice"
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

export const principalAndInterest = (currPrice: price, currLoan:loan) =>{

    if (!currPrice.complete || !currLoan.complete) {
        return 0;
    }

    
    let principal = currPrice.homePrice- currPrice.downPaymentAmount; // $200,000 loan
    let annualInterestRate = currLoan.exactOption ? currLoan.exact : currLoan.rate; // 5% annual interest rate
    let years = 30; // 30-year mortgage

    let monthlyPayment = calculateMortgage(principal, annualInterestRate, years);
    return monthlyPayment
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

    let homeValue = currPrice.homePrice; // $250,000 home value
let insuranceRate = 0.5; // 0.5% insurance rate

return calculateHomeInsurance(homeValue, insuranceRate);

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
    let loanAmount = currPrice.homePrice- currPrice.downPaymentAmount;; // $250,000 loan amount
let pmiRate = 0.75; // 0.75% PMI rate

return calculatePMI(loanAmount, pmiRate);

}

export const feesAmount = (feesPrice: fees) =>{
    return 0
}