export interface PurchaseStepsType {
    step: number;
    title: string;
    linkPart: string;
    pageTitle: string;
}

export const PurchaseSteps: PurchaseStepsType[] = [
    {
        step: 1,
        title: "Доставка",
        linkPart: "delivery",
        pageTitle: "Заповніть інформацію по доставці"
    },
    {
        step: 2,
        title: "Оплата",
        linkPart: "payment",
        pageTitle: "Детальна інформація по оплаті"
    },
    {
        step: 3,
        title: "Підтвердження",
        linkPart: "confirmation",
        pageTitle: "Підтвердження замовлення"
    },
]