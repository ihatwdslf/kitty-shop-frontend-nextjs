const CURRENCY_SYMBOL = '₴'

export const formatPrice = (price: number | undefined): string => {
    const validatedPrice = price ?? 0;
    return `${validatedPrice.toFixed(2).replace('.', ',')}${CURRENCY_SYMBOL}`;
}