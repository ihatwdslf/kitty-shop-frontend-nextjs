export interface OrderStatusType {
    id: number;
    key: string | null;
    name: string;
}

// Constants for order statuses IDs
export const OrderStatusesIDs = {
    ALL: 0,
    PENDING: 1,
    PROCESSING: 2,
    SHIPPED: 3,
    DELIVERED: 4,
    CANCELLED: 5,
};

export const AvailableToCancelStatusesIDs = [
    OrderStatusesIDs.PENDING,
    OrderStatusesIDs.PROCESSING,
]

export const OrderStatuses: OrderStatusType[] = [
    {
        id: OrderStatusesIDs.ALL,
        key: null,
        name: "Усі",
    },
    {
        id: OrderStatusesIDs.PENDING,
        key: "pending",
        name: "Перевіряємо замовлення"
    },
    {
        id: OrderStatusesIDs.PROCESSING,
        key: "processing",
        name: "Обробляється"
    },
    {
        id: OrderStatusesIDs.SHIPPED,
        key: "shipped",
        name: "Відправлено"
    },
    {
        id: OrderStatusesIDs.DELIVERED,
        key: "delivered",
        name: "Доставлено"
    },
    {
        id: OrderStatusesIDs.CANCELLED,
        key: "cancelled",
        name: "Скасовано"
    },
]