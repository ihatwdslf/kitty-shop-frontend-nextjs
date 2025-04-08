import {apiClient} from "@/data/api-client";
import {ApiResponse} from "@/data/response/ApiResponse";
import {Order} from "@/data/response/order/Order";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {OrderCreateRequestDto} from "@/data/request/order/OrderCreateRequestDto";
import {ListResponse} from "@/data/response/ListResponse";
import {OrderUpdateRequestDto} from "@/data/request/order/OrderUpdateRequestDto";

const fetchOrders = async (): Promise<ApiResponse<ListResponse<Order>>> => {
    return await apiClient<ApiResponse<ListResponse<Order>>>("/orders");
};

const fetchOrdersByStatus = async (status: string | null): Promise<ApiResponse<ListResponse<Order>>> => {
    // const params = new URLSearchParams({ status });
    return await apiClient<ApiResponse<ListResponse<Order>>>(!!status ? `/orders?status=${status}` : `/orders`);
};

const fetchOrderById = async (id: number): Promise<ApiResponse<Order>> => {
    return await apiClient<ApiResponse<Order>>(`/orders/${id}`);
};

const createOrder = async (createRequestDto: OrderCreateRequestDto): Promise<ApiResponse<Order>> => {
    return await apiClient<ApiResponse<Order>>("/orders", {
        method: "POST",
        body: JSON.stringify(createRequestDto),
        headers: {"Content-Type": "application/json"},
    });
};

const updateOrder = async (id: number, updateRequestDto: OrderUpdateRequestDto): Promise<ApiResponse<Order>> => {
    return await apiClient<ApiResponse<Order>>(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updateRequestDto),
        headers: {"Content-Type": "application/json"},
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

    const fetchOrdersByStatusKey = (status: string | null) =>
        useQuery({
            queryKey: ["orders", "status", status],
            queryFn: () => fetchOrdersByStatus(status)
        });

    const fetchOrder = (id: number) =>
        useQuery({
            queryKey: ["order", id],
            queryFn: () => fetchOrderById(id),
        });

    const createOrderMutation = useMutation({
        mutationFn: createOrder,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["orders"]}),
    });

    const updateOrderMutation = useMutation({
        mutationFn: ({id, order}: { id: number; order: OrderUpdateRequestDto }) => updateOrder(id, order),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["orders"]}),
    });

    const deleteOrderMutation = useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["orders"]}),
    });

    return {
        ...ordersQuery,
        fetchOrder,
        fetchOrdersByStatusKey,
        fetchOrdersByStatus,
        createOrderMutation,
        updateOrderMutation,
        deleteOrderMutation,
    };
};
