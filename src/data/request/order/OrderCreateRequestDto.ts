export interface OrderCreateRequestDto {
    shippingAddress: string;
    paymentMethodKey: string;
    deliveryOptionKey: string;
}