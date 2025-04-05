import {ApiResponse} from "@/data/response/ApiResponse";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ListResponse} from "@/data/response/ListResponse";
import {Product} from "@/data/response/product/Product";
import {apiClient} from "@/data/apiClient";
import {ProductGetTotalsResponse} from "@/data/response/product/ProductGetTotalsResponse";
import {CartItem} from "@/utils/cartStorage";

export const useProductTotals = (cartItems: CartItem[]) => {
    return useQuery<ApiResponse<ProductGetTotalsResponse>>({
        queryKey: ["productTotals", cartItems],  // Unique query key based on cartItems
        queryFn: () => fetchProductsTotalsBySet(cartItems), // Fetch the totals from the API
        enabled: cartItems.length > 0, // Only fetch if there are items in the cart
        staleTime: 1000 * 60 * 5, // Cache response for 5 minutes
    });
};

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

// Fetch totals by cart items
const fetchProductsTotalsBySet = async (cartItems: CartItem[]): Promise<ApiResponse<ProductGetTotalsResponse>> => {
    // Serialize the cartItems into query parameters
    const queryParams = cartItems
        .map((item, index) =>
            `cartItems%5B${index}%5D.productId=${encodeURIComponent(item.productId)}&cartItems%5B${index}%5D.quantity=${encodeURIComponent(item.quantity)}`
        )
        .join('&');

    const url = `/products/totals?${queryParams}`;  // Build the URL with query parameters

    const response = await apiClient<ApiResponse<ProductGetTotalsResponse>>(url, {
        method: "GET",  // Use GET request
    });

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

    // Fetch totals by cart items
    const fetchProductsTotals = (cartItems: CartItem[]) => {
        return useQuery<ApiResponse<ProductGetTotalsResponse>>({
            queryKey: ["productTotals", cartItems],  // Unique query key based on cartItems
            queryFn: () => fetchProductsTotalsBySet(cartItems), // Fetch the totals from the API
            enabled: cartItems.length > 0, // Only fetch if there are items in the cart
            staleTime: 1000 * 60 * 5, // Cache response for 5 minutes
        });
    };

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
        fetchProductsTotals,    // Fetch totals of a set of products
        createProductMutation,  // Mutation for creating products
        updateProductMutation,  // Mutation for updating products
        deleteProductMutation,  // Mutation for deleting products
    };
};