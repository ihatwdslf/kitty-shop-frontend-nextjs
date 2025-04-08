import {OrderItemId} from "@/data/response/order/OrderItemId";

export interface OrderItem {
    id: OrderItemId;
    productId: number;
    quantity: number;
}