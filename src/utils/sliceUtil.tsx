import { finance, financeSlice } from "@/lib/financeSlice";
import { insurance } from "@/lib/insuranceSlice";
import { tax } from "@/lib/taxSlice";
import { location } from "@/lib/locationSlice";
import {
  calculateMortgage,
  calculateMortgageInsurance,
  calculatePMI,
} from "./math";
import {
  NATIONAL_AVERAGE_PROPERTY_TAX_RATE,
  NATIONAL_INSURANCE_PREMIUM_RATE_PER_HOUSE_DOLLAR,
  MORTGAGE_INSURANCE_RATE,
  PMI_RATE,
  DOWN_DEPOSIT_RATE,
} from "@/constants/rates";
import { loanTypes } from "@/constants/misc";

export const propertyTax = (
  financeSlice: finance,
  taxSlice: tax,
  locationSlice: location,
) => {
  if (taxSlice.exact > 0) {
    return ["exact", taxSlice.exact];
  } else if (locationSlice.medianTax > 0 || financeSlice.priceComplete) {
    return estimatePropertyTax(financeSlice, locationSlice);
  } else {
    return ["", 0];
  }
};

export const estimatePropertyTax = (
  financeSlice: finance,
  locationSlice: location,
) => {
  if (
    financeSlice.priceComplete &&
    locationSlice.medianTax != 0 &&
    !Number.isNaN(locationSlice.medianTax)
  ) {
    return ["location", locationPropertyTax(financeSlice, locationSlice)];
  } else if (financeSlice.priceComplete) {
    return ["default", defaultPropertyTax(financeSlice)];
  } else {
    return ["", 0];
  }
};

export const locationPropertyTax = (
  financeSlice: finance,
  locationSlice: location,
) => {
  let propertyValue = financeSlice.homePrice;

  return (propertyValue * locationSlice.medianTax) / 12;
};

export const defaultPropertyTax = (financeSlice: finance) => {
  if (!(financeSlice.loanComplete && financeSlice.priceComplete)) {
    return 0;
  }
  let propertyValue = financeSlice.homePrice;
  return propertyValue * NATIONAL_AVERAGE_PROPERTY_TAX_RATE;
};

export const homeInsurance = (
  financeSlice: finance,
  insuranceSlice: insurance,
) => {
  if (insuranceSlice.exact > 0) {
    return ["exact", insuranceSlice.exact];
  }

  return estimatedHomeInsurance(financeSlice);
};
export const estimatedHomeInsurance = (financeSlice: finance) => {
  let value =
    financeSlice.homePrice * NATIONAL_INSURANCE_PREMIUM_RATE_PER_HOUSE_DOLLAR;
  return [
    "estimate",
    financeSlice.homePrice * NATIONAL_INSURANCE_PREMIUM_RATE_PER_HOUSE_DOLLAR,
  ];
};

export const principalAndInterest = (financeSlice: finance) => {
  if (!(financeSlice.loanComplete && financeSlice.priceComplete)) {
    return 0;
  }

  let principal = financeSlice.homePrice - financeSlice.downPaymentAmount;
  let annualInterestRate =
    financeSlice.exactRate > 0 ? financeSlice.exactRate : financeSlice.rate;
  let years = financeSlice.length;
  let monthlyPayment = calculateMortgage(principal, annualInterestRate, years);
  return monthlyPayment;
};

export const amortizationSchedule = (
  financeSlice: finance,
  principalAndInterest: number,
) => {
  var loanAmount = financeSlice.homePrice - financeSlice.downPaymentAmount;
  let annualInterestRate =
    financeSlice.exactRate > 0 ? financeSlice.exactRate : financeSlice.rate;
  let monthlyInterest = annualInterestRate / 1200;

  var interestPayment = loanAmount * monthlyInterest;
  var principalPaid = principalAndInterest - interestPayment;

  let scheduleInfo = [];
  var i = 1;
  while (i <= financeSlice.length * 12) {
    var interestPayment = loanAmount * monthlyInterest;
    var principalPaid = principalAndInterest - interestPayment;
    let payments = [principalPaid, interestPayment];
    scheduleInfo.push(payments);
    loanAmount -= principalPaid;
    i++;
  }

  return scheduleInfo;
};

export interface equityEvaluation {
  months: number;
  interest: number;
}
export const equityEvaluater = (
  equityRaw: any[][],
  extraPaymentEquityRaw: any[][],
) => {
  var extraPaymentLength = 0;
  for (let i = 0; i < extraPaymentEquityRaw.length; i++) {
    if (extraPaymentEquityRaw[i][0] < 0) {
      break;
    }
    extraPaymentLength = i;
  }

  var interestSaved = extraPaymentEquityRaw[extraPaymentLength][1];
  if (interestSaved < 0) {
    interestSaved = 0;
  }

  let interestDifference = equityRaw[equityRaw.length - 1][1] - interestSaved;

  let data: equityEvaluation = {
    months: extraPaymentLength,
    interest: interestDifference,
  };

  return data;
};

export const equitySchedule = (
  financeSlice: finance,
  principalAndInterest: number,
  extraPayment: number = 0,
  monthlyExtraPayment: number = 0,
) => {
  var loanAmount =
    financeSlice.homePrice - financeSlice.downPaymentAmount - extraPayment;

  let annualInterestRate =
    financeSlice.exactRate > 0 ? financeSlice.exactRate : financeSlice.rate;
  let monthlyInterest = annualInterestRate / 1200;

  var interestPayment = loanAmount * monthlyInterest;
  var principalPaid = principalAndInterest - interestPayment;
  var totalInterestPaid = 0;
  var totalLoanAmount = loanAmount;

  let scheduleInfo = [];
  var i = 1;
  while (i <= financeSlice.length * 12) {
    var interestPayment = loanAmount * monthlyInterest;
    totalInterestPaid += interestPayment;
    let payments = [
      loanAmount,
      totalInterestPaid,
      totalLoanAmount - loanAmount,
    ];

    scheduleInfo.push(payments);

    var principalPaid = principalAndInterest - interestPayment;
    loanAmount -= principalPaid + monthlyExtraPayment;
    i++;
  }
  return scheduleInfo;
};

export const mortgageInsurance = (financeSlice: finance) => {
  if (!(financeSlice.loanComplete && financeSlice.priceComplete)) {
    return 0;
  }
  if (
    financeSlice.type == loanTypes.FHA ||
    financeSlice.downPaymentPercent > 19
  ) {
    return 0;
  }
  let loanAmount = financeSlice.homePrice - financeSlice.downPaymentAmount; // $180,000 loan amount
  let insuranceRate = MORTGAGE_INSURANCE_RATE;

  return calculateMortgageInsurance(loanAmount, insuranceRate);
};

export const pmInsurance = (financeSlice: finance) => {
  if (!(financeSlice.loanComplete && financeSlice.priceComplete)) {
    return 0;
  }
  if (financeSlice.type != loanTypes.FHA) {
    return 0;
  }
  let loanAmount = calcLoanAmount(financeSlice); // $250,000 loan amount
  let pmiRate = PMI_RATE;

  return calculatePMI(loanAmount, pmiRate);
};

export const calculateCashToClose = (financeSlice: finance) => {
  return (
    calcLoanAmount(financeSlice) * DOWN_DEPOSIT_RATE +
    financeSlice.downPaymentAmount
  );
};

const calcLoanAmount = (financeSlice: finance) => {
  return financeSlice.homePrice - financeSlice.downPaymentAmount;
};
