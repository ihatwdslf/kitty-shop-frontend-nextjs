const CURRENCY_SYMBOL = '₴'

export const formatPrice = (price: number): string => {
    return `${price.toFixed(2).replace('.', ',')}${CURRENCY_SYMBOL}`;
}