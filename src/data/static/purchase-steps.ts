export interface PurchaseStepsType {
    step: number;
    title: string;
    linkPart: string;
    pageTitle: string;
}

// Constants for purchase steps IDs
export const PurchaseStepsIDs = {
    DELIVERY: 1,
    PAYMENT: 2,
    CONFIRMATION: 3,
};

export const PurchaseSteps: PurchaseStepsType[] = [
    {
        step: PurchaseStepsIDs.DELIVERY,
        title: "Доставка",
        linkPart: "delivery",
        pageTitle: "Заповніть інформацію по доставці"
    },
    {
        step: PurchaseStepsIDs.PAYMENT,
        title: "Оплата",
        linkPart: "payment",
        pageTitle: "Детальна інформація по оплаті"
    },
    {
        step: PurchaseStepsIDs.CONFIRMATION,
        title: "Підтвердження",
        linkPart: "confirmation",
        pageTitle: "Підтвердження замовлення"
    },
]