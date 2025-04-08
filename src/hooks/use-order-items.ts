import {OrderItemResponseDto} from "@/data/request/order/order-item";
import {ApiResponse} from "@/data/response/ApiResponse";
import {apiClient} from "@/data/api-client";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

interface OrderItemPayload {
    orderId: number;
    productId: number;
    quantity: number;
}

const createOrderItem = async ({
                                   orderId,
                                   productId,
                                   quantity
                               }: OrderItemPayload): Promise<ApiResponse<OrderItemResponseDto>> => {
    return await apiClient<ApiResponse<OrderItemResponseDto>>(`/orders/${orderId}/items`, {
        method: "POST",
        body: JSON.stringify({productId, quantity}),
        headers: {"Content-Type": "application/json"},
    });
};

const fetchOrderItems = async (orderId: number): Promise<ApiResponse<OrderItemResponseDto[]>> => {
    return await apiClient<ApiResponse<OrderItemResponseDto[]>>(`/orders/${orderId}/items`);
};

const updateOrderItem = async ({
                                   orderId,
                                   productId,
                                   quantity,
                               }: OrderItemPayload): Promise<ApiResponse<OrderItemResponseDto>> => {
    return await apiClient<ApiResponse<OrderItemResponseDto>>(`/orders/${orderId}/items/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
        headers: { "Content-Type": "application/json" },
    });
};

const deleteOrderItem = async ({
                                   orderId,
                                   productId,
                               }: Pick<OrderItemPayload, "orderId" | "productId">): Promise<ApiResponse<null>> => {
    return await apiClient<ApiResponse<null>>(`/orders/${orderId}/items/${productId}`, {
        method: "DELETE",
    });
};

export const useOrderItems = (orderId?: number) => {
    const queryClient = useQueryClient();

    const orderItemsQuery = useQuery({
        queryKey: ["order-items", orderId],
        queryFn: () => fetchOrderItems(orderId!),
        enabled: !!orderId, // Only fetch if orderId is provided
    });

    const createOrderItemMutation = useMutation({
        mutationFn: createOrderItem,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["order-items", variables.orderId] });
        },
    });

    const updateOrderItemMutation = useMutation({
        mutationFn: updateOrderItem,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["order-items", variables.orderId] });
        },
    });

    const deleteOrderItemMutation = useMutation({
        mutationFn: deleteOrderItem,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["order-items", variables.orderId] });
        },
    });

    return {
        orderItemsQuery,
        createOrderItemMutation,
        updateOrderItemMutation,
        deleteOrderItemMutation,
    };
};