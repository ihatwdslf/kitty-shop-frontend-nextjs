import {ApiResponse} from "@/data/response/ApiResponse";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ListResponse} from "@/data/response/ListResponse";
import {Product} from "@/data/response/product/Product";
import {apiClient} from "@/data/apiClient";

// Fetch all products
const fetchProducts = async (categoryKeys?: string[]): Promise<ApiResponse<ListResponse<Product>>> => {
    const query = categoryKeys?.length
        ? `?categoryKeys=${categoryKeys.join(",")}`
        : "";
    return await apiClient<ApiResponse<ListResponse<Product>>>(`/products${query}`);
};

// Fetch product by ID
const fetchProductById = async (id: string): Promise<ApiResponse<Product>> => {
    const response = await apiClient<ApiResponse<Product>>(`/products/${id}`);
    return response;
};

// Create a product
const createProduct = async (productData: Product): Promise<ApiResponse<Product>> => {
    const response = await apiClient<ApiResponse<Product>>("/products", {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

// Update a product by ID
const updateProduct = async (id: string, productData: Product): Promise<ApiResponse<Product>> => {
    const response = await apiClient<ApiResponse<Product>>(`/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(productData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

// Delete a product by ID
const deleteProduct = async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient<ApiResponse<null>>(`/products/${id}`, {
        method: "DELETE",
    });
    return response;
};

export const useProducts = (categoryKeys?: string[]) => {
    const queryClient = useQueryClient();

    // Fetch all products
    const {
        data: products,
        isLoading,
        error
    } = useQuery<ApiResponse<ListResponse<Product>>>({
        queryKey: ["products", categoryKeys],
        queryFn: () => fetchProducts(categoryKeys),
        staleTime: 1000 * 60 * 5,
    });

    // Fetch product by ID
    const fetchProduct = (id: string) => useQuery<ApiResponse<Product>>({
        queryKey: ["product", id], // Query key for individual product
        queryFn: () => fetchProductById(id),
    });

    // Create a product
    const createProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            // Invalidate products cache after creating a new product
            queryClient.invalidateQueries(["products"]);
        },
    });

    // Update a product by ID
    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            // Invalidate products cache after updating a product
            queryClient.invalidateQueries(["products"]);
        },
    });

    // Delete a product by ID
    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            // Invalidate products cache after deleting a product
            queryClient.invalidateQueries(["products"]);
        },
    });

    return {
        products,           // List of all products
        isLoading,          // Loading state
        error,              // Error state
        fetchProduct,       // Fetch a single product by ID
        createProductMutation,  // Mutation for creating products
        updateProductMutation,  // Mutation for updating products
        deleteProductMutation,  // Mutation for deleting products
    };
};