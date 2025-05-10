import {finance} from "../lib/financeSlice"
import {tax} from "../lib/taxSlice"
import { insurance } from "@/lib/insuranceSlice"
import { fees } from "../lib/feesSlice"
import { calculateMortgage,  calculateMortgageInsurance, calculatePropertyTax, calculatePMI } from "./math"
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


