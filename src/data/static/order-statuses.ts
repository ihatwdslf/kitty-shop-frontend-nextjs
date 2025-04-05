export interface OrderStatusType {
    id: number;
    key: string;
    name: string;
}

export const OrderStatuses: OrderStatusType[] = [
    {
        id: 0,
        key: "all",
        name: "Усі",
    },
    {
        id: 1,
        key: "pending",
        name: "Очікується"
    },
    {
        id: 2,
        key: "processing",
        name: "Обробляється"
    },
    {
        id: 3,
        key: "shipped",
        name: "Відправлено"
    },
    {
        id: 4,
        key: "delivered",
        name: "Доставлено"
    },
    {
        id: 5,
        key: "cancelled",
        name: "Скасовано"
    },
]