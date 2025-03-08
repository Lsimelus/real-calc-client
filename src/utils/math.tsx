
export function calculateMortgage(principal:number , annualInterestRate:any, years: number) {
    // Convert annual interest rate to monthly and percentage to decimal
    let monthlyInterestRate = annualInterestRate / 100 / 12;
    // Total number of payments (months)
    let numberOfPayments = years * 12;

    // Calculate the mortgage monthly payment using the formula
    let monthlyPayment = principal * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments) / 
                         (Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1);

                        


    return monthlyPayment;
}

export function calculatePropertyTax(propertyValue:number, taxRate: number) {
    // Convert tax rate percentage to a decimal
    let taxRateDecimal = taxRate / 100;

    // Calculate the annual property tax
    let propertyTax = propertyValue * taxRateDecimal;

    return propertyTax;
}

export function calculateHomeInsurance(homeValue:number, insuranceRate:number) {
    let annualInsuranceCost = homeValue * insuranceRate;

    return annualInsuranceCost;
}

export function calculateMortgageInsurance(loanAmount:number, insuranceRate:number) {
    // Convert insurance rate percentage to a decimal
    let insuranceRateDecimal = insuranceRate / 100;

    // Calculate the annual mortgage insurance cost
    let annualInsuranceCost = loanAmount * insuranceRateDecimal;

    return annualInsuranceCost;
}

export function calculatePMI(loanAmount:number, pmiRate:number, isAnnual = true) {
    // Convert PMI rate percentage to a decimal
    let pmiRateDecimal = pmiRate / 100;

    // Calculate the annual or monthly PMI cost based on the isAnnual flag
    let pmiCost = loanAmount * pmiRateDecimal;

    if (!isAnnual) {
        // If the calculation is for monthly PMI
        pmiCost /= 12;
    }

    return pmiCost;
}
