import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@/data/api-client";
import {ApiResponse} from "@/data/response/ApiResponse";
import {BrandResponse} from "@/data/response/brand/BrandResponse";
import {ListResponse} from "@/data/response/ListResponse";
import {CreateBrandRequest} from "@/data/request/brand/CreateBrandRequest";
import {UpdateBrandRequest} from "@/data/request/brand/UpdateBrandRequest";

const fetchBrands = async (): Promise<ApiResponse<ListResponse<BrandResponse>>> => {
    const response = await apiClient<ApiResponse<ListResponse<BrandResponse>>>("/brands");
    return response;
};

const fetchBrandById = async (id: string): Promise<ApiResponse<BrandResponse>> => {
    const response = await apiClient<ApiResponse<BrandResponse>>(`/brands/${id}`);
    return response;
};

const createBrand = async (brandData: CreateBrandRequest): Promise<ApiResponse<BrandResponse>> => {
    const response = await apiClient<ApiResponse<BrandResponse>>("/brands", {
        method: "POST",
        body: JSON.stringify(brandData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

const updateBrand = async (id: number, updateRequest: UpdateBrandRequest): Promise<ApiResponse<BrandResponse>> => {
    const response = await apiClient<ApiResponse<BrandResponse>>(`/brands/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updateRequest),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

const deleteBrand = async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient<ApiResponse<null>>(`/brands/${id}`, {
        method: "DELETE",
    });
    return response;
};

export const useBrands = () => {
    const queryClient = useQueryClient();

    const {data: brands, isLoading, error} = useQuery<ApiResponse<ListResponse<BrandResponse>>>({
        queryKey: ["brands"],
        queryFn: fetchBrands,
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });

    const fetchBrand = (id: string) => useQuery<ApiResponse<BrandResponse>>({
        queryKey: ["brand", id],
        queryFn: () => fetchBrandById(id),
    });

    const createBrandMutation = useMutation({
        mutationFn: createBrand,
        onSuccess: () => {
            queryClient.invalidateQueries(["brands"]);
        },
    });

    const updateBrandMutation = useMutation({
        mutationFn: ({id, updateRequest}: {
            id: number;
            updateRequest: UpdateBrandRequest
        }) => updateBrand(id, updateRequest),
        onSuccess: () => {
            queryClient.invalidateQueries(["brands"]);
        },
    });

    const deleteBrandMutation = useMutation({
        mutationFn: (brandId: number) => deleteBrand(brandId),
        onSuccess: () => {
            queryClient.invalidateQueries(["brands"]);
        },
    });

    return {
        brands,
        isLoading,
        error,
        fetchBrand,
        createBrandMutation,
        updateBrandMutation,
        deleteBrandMutation,
    };
};
