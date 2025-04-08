export interface OrderItemCreateRequestDto {
    productId: number;
    quantity: number;
}

export interface OrderItemResponseDto {
    productId: number;
    quantity: number;
}