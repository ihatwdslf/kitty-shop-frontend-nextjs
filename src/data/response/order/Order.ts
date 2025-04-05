import {User} from "@/data/response/user/User";
import {OrderStatusType} from "@/data/static/order-statuses";
import {OrderItem} from "@/data/response/order/OrderItem";
import {PaymentMethodType} from "@/data/static/payment-methods";

export interface Order {
    id: number;
    user: User;
    status: OrderStatusType;
    orderDate: string;
    shippingAddress: string;
    paymentMethod: PaymentMethodType;
    orderItems: OrderItem[];
}