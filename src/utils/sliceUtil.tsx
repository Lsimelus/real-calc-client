import { finance } from "@/lib/financeSlice";
import { insurance } from "@/lib/insuranceSlice";
import { tax } from "@/lib/taxSlice";
import {location } from "@/lib/locationSlice"
import {  calculateMortgage, calculateMortgageInsurance, calculatePMI } from "./math";
import { NATIONAL_AVERAGE_PROPERTY_TAX_RATE, NATIONAL_INSURANCE_PREMIUM_RATE_PER_HOUSE_DOLLAR } from "@/constants/rates";

export const propertyTax = (financeSlice: finance, taxSlice:tax, locationSlice:location) =>{
    if (taxSlice.exact > 0){
        return ["exact", taxSlice.exact]
    }else if(locationSlice.medianTax != "" ||financeSlice.priceComplete ){
        return estimatePropertyTax(financeSlice, locationSlice)
    }else{
        return ["", 0]
    }
}

export const  estimatePropertyTax = (financeSlice: finance, locationSlice:location) =>{
    if(typeof locationSlice.medianTax !== 'undefined' && locationSlice.medianTax !== ''){
        return ["location", locationPropertyTax(financeSlice, locationSlice)]
    }else if (financeSlice.priceComplete ){
        return ["default", defaultPropertyTax(financeSlice)]
    }else{
        return ["", 0]
    }
}

export const locationPropertyTax = (financeSlice: finance, locationSlice:location ) =>{
    if (locationSlice.medianTax == "" || !(financeSlice.priceComplete)) {
        return ["", 0]
    }
    let propertyValue = financeSlice.homePrice


    let medianTax =  parseFloat(locationSlice.medianTax)
return propertyValue * medianTax;
}

export const defaultPropertyTax = (financeSlice: finance) =>{
    if (!(financeSlice.loanComplete && financeSlice.priceComplete)) {
        return 0;
    }
    let propertyValue = financeSlice.homePrice
    return  propertyValue * NATIONAL_AVERAGE_PROPERTY_TAX_RATE;
}



export const homeInsurance = (financeSlice:finance, insuranceSlice: insurance) =>{
    if (insuranceSlice.exact > 0){
        return ["exact", insuranceSlice.exact]
    }

    return estimatedHomeInsurance(financeSlice)

}
export const estimatedHomeInsurance = (financeSlice:finance) =>{
    let value = financeSlice.homePrice * NATIONAL_INSURANCE_PREMIUM_RATE_PER_HOUSE_DOLLAR
    return ["estimate", financeSlice.homePrice * NATIONAL_INSURANCE_PREMIUM_RATE_PER_HOUSE_DOLLAR]
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
