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