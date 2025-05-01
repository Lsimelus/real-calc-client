import { finance } from "@/lib/financeSlice";
import { insurance } from "@/lib/insuranceSlice";
import { tax } from "@/lib/taxSlice";
import { calculateHomeInsurance, calculateMortgage, calculateMortgageInsurance, calculatePMI, calculatePropertyTax } from "./math";

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
