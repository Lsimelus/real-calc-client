import {price} from "../lib/priceSlice"
import {loan} from "../lib/loanSlice"
import {tax} from "../lib/taxSlice"
import { insurance } from "@/lib/insruanceSlice"
import { fees } from "../lib/feesSlice"

export const formatNumber = (num: number) => {
    if (num >= 1000000) {
        console.log("first")
        const mValue = num / 1000000;
        if (Number.isInteger(mValue)) {
            return '$' + mValue + 'M';
        } else {
            return '$' + mValue.toFixed(1) + 'M';
        }
    } else if (num >= 1000) {
        console.log("second")
        const kValue = num / 1000;
        if (Number.isInteger(kValue)) {
            return '$' + kValue + 'K';
        } else {
            return '$' + kValue.toFixed(1) + 'K';
        }
    } else {
        console.log("End")
        console.log('$' + num.toString())
        return '$' + num.toString();
    }
}

export const addcomma = (num: number) => {
    return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const principalAndInterest = (currPrice: price, currLoan:loan) =>{
    return 100
}

export const propertyTax = (currPrice: price, currTax:tax) =>{
    return 1000
}

export const homeInsurance = (currPrice: price, currInsurance:insurance) =>{
    return 1000
}

export const mortgageInsurance = (currPrice: price) =>{
    return 1000
}

export const pmInsurance = (currPrice: price, currLoan:loan) =>{
    return 1000
}

export const feesAmount = (feesPrice: fees) =>{
    return 1000
}