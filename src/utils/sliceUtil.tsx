import { finance } from "@/lib/financeSlice";
import { insurance } from "@/lib/insuranceSlice";
import { tax } from "@/lib/taxSlice";
import {location } from "@/lib/locationSlice"
import {  calculateMortgage, calculateMortgageInsurance, calculatePMI } from "./math";

export const propertyTax = (financeSlice: finance, taxSlice:tax, locationSlice:location) =>{
    if (taxSlice.exact > 0){
        return ["exact", taxSlice.exact]
    }else if(locationSlice.median_tax != "" ||financeSlice.priceComplete ){
        console.log("22222")
        return estimatePropertyTax(financeSlice, locationSlice)
    }else{
        console.log("33333")
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
    if (locationSlice.median_tax == "" || !(financeSlice.priceComplete)) {
        return ["", 0]
    }
    let propertyValue = financeSlice.homePrice

    
    console.log(parseFloat(locationSlice.median_tax))
    let medianTax =  parseFloat(locationSlice.median_tax)
return propertyValue * medianTax;
}

export const defaultPropertyTax = (financeSlice: finance) =>{
    if (!(financeSlice.loanComplete && financeSlice.priceComplete)) {
        return 0;
    }
    let propertyValue = financeSlice.homePrice
return  propertyValue * .01; //Todo: Relocate
}



export const homeInsurance = (financeSlice:finance) =>{
    return financeSlice.homePrice * .01

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
