

export const getProductFinalPrice = (price: number, procentageTax: number): number => {
    return Number((price + ((price * procentageTax) / 100)).toFixed(2))
}

export const getProductPrice = (price: number, procentageTax: number): number => {
    return Number(price);
}

export const getProductTax = (price: number, procentageTax: number): number => {
    return Number((((price * procentageTax) / 100)).toFixed(2))
}