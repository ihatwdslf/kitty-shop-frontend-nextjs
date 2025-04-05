export interface PaymentMethodType {
    id: number;
    key: string;
    name: string;
}

export const PaymentMethods: PaymentMethodType[] = [
    {
        id: 1,
        key: "credit_card",
        name: "Credit card",
    },
    {
        id: 2,
        key: "paypal",
        name: "PayPal",
    },
    {
        id: 3,
        key: "bank_transfer",
        name: "Bank Transfer",
    },
    {
        id: 4,
        key: "cash_on_delivery",
        name: "Cash on Delivery",
    },
]