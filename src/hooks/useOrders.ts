import {apiClient} from "@/data/apiClient";
import {ApiResponse} from "@/data/response/ApiResponse";
import {Order} from "@/data/response/order/Order";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const fetchOrders = async (): Promise<ApiResponse<Order[]>> => {
    return await apiClient<ApiResponse<Order[]>>("/orders");
};

const fetchOrderById = async (id: number): Promise<ApiResponse<Order>> => {
    return await apiClient<ApiResponse<Order>>(`/orders/${id}`);
};

const createOrder = async (order: Order): Promise<ApiResponse<Order>> => {
    return await apiClient<ApiResponse<Order>>("/orders", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
    });
};

const updateOrder = async (id: number, order: Order): Promise<ApiResponse<Order>> => {
    return await apiClient<ApiResponse<Order>>(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
    });
};

const deleteOrder = async (id: number): Promise<ApiResponse<null>> => {
    return await apiClient<ApiResponse<null>>(`/orders/${id}`, {
        method: "DELETE",
    });
};

export const useOrders = () => {
    const queryClient = useQueryClient();

    const ordersQuery = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });

    const fetchOrder = (id: number) =>
        useQuery({
            queryKey: ["order", id],
            queryFn: () => fetchOrderById(id),
        });

    const createOrderMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
    });

    const updateOrderMutation = useMutation({
        mutationFn: ({ id, order }: { id: number; order: Order }) => updateOrder(id, order),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
    });

    const deleteOrderMutation = useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
    });

    return {
        ...ordersQuery,
        fetchOrder,
        createOrderMutation,
        updateOrderMutation,
        deleteOrderMutation,
    };
};
