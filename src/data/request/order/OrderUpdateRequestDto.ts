export interface OrderUpdateRequestDto {
    userId?: number;
    statusKey?: string;
    shippingAddress?: string;
    paymentMethodKey?: string;
    deliveryOptionKey?: string;
}