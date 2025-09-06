import { finance } from "../lib/financeSlice";
import { fees } from "../lib/feesSlice";
import { ComboboxItemProps } from "@/components/ui/combobox";
import { equityChartInfo } from "@/components/custom/graphEquity";
import { amortizationChartInfo } from "@/components/custom/graphAmortization";

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    const mValue = num / 1000000;
    if (Number.isInteger(mValue)) {
      return "$" + mValue + "M";
    } else {
      return "$" + mValue.toFixed(1) + "M";
    }
  } else if (num >= 1000) {
    const kValue = num / 1000;
    if (Number.isInteger(kValue)) {
      return "$" + kValue + "K";
    } else {
      return "$" + kValue.toFixed(1) + "K";
    }
  } else {
    return "$" + num.toString();
  }
};

export const addcomma = (num: number) => {
  return "$" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const moneyToString = (num: string) => {
  return parseFloat(num.replace(/[$,]/g, ""));
};

export const feesAmount = (fees: fees) => {
  return fees.fee * 12;
};

export const amortizationFormatter = (unformatted_schdule: number[][]) => {
  var chartData = [];
  var turned = false;
  var turningPoint = 0;

  const date = new Date();
  var year = date.getFullYear();

  for (let i = 0; i < unformatted_schdule.length; i++) {
    let interest = unformatted_schdule[i][1];
    let principal = unformatted_schdule[i][0];
    if (!turned && principal > interest) {
      turningPoint = i;
      turned = true;
    }
    var row: any = {
      month: (Math.round(i / 12) + year).toString(),
      interest: interest,
      principal: principal,
    };
    chartData.push(row);
  }

  const turningDate = new Date(
    new Date(date).setMonth(date.getMonth() + turningPoint),
  );
  const dateFormatted =
    turningDate.getMonth().toString() +
    "/" +
    turningDate.getFullYear().toString();

  var data: amortizationChartInfo = { data: chartData, point: dateFormatted };
  return data;
};

export const equityFormatter = (
  unformatted_schdule: number[][],
  financeSlice: finance,
) => {
  let twentyPercentAmount = financeSlice.homePrice * 0.8;

  var turned = false;
  var turningPoint = -1;
  const date = new Date();
  var year = date.getFullYear();
  if (
    twentyPercentAmount > unformatted_schdule[1][0] ||
    financeSlice.downPaymentPercent >= 20
  ) {
    turned = true;
  }

  var chartData = [];

  for (let i = 0; i < unformatted_schdule.length; i++) {
    let balance = unformatted_schdule[i][0];
    let cumulativeInterest = unformatted_schdule[i][1];
    let principalPaid = unformatted_schdule[i][2];
    var row = {
      month: (i + 1).toString(),
      balance: balance,
      cumulativeInterest: cumulativeInterest,
      principalPaid: principalPaid,
    };
    chartData.push(row);

    if (!turned && twentyPercentAmount > balance) {
      turningPoint = i;
      turned = true;
    }
  }
  var data: equityChartInfo = { data: chartData, point: turningPoint };
  return data;
};

export const cityOptionsList = (cityOptions: string[]) => {
  var list: ComboboxItemProps[] = [];
  for (let i = 0; i < cityOptions.length; i++) {
    list.push({
      value: cityOptions[i],
      label: cityOptions[i],
    });
  }
  return list;
};
