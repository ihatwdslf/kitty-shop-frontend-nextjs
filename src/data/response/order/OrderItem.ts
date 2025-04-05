import {OrderItemId} from "@/data/response/order/OrderItemId";
import {Product} from "@/data/response/product/Product";

export interface OrderItem {
    id: OrderItemId;
    product: Product;
    quantity: number;
}