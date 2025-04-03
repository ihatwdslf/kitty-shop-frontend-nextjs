import { CategoryList } from "@/data/response/CategoryList";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/data/apiClient";
import { ApiResponse } from "@/data/response/ApiResponse";
import { Category } from "@/data/response/Category";

// Fetch all categories
const fetchCategories = async (): Promise<ApiResponse<CategoryList>> => {
    const response = await apiClient<ApiResponse<CategoryList>>("/categories");
    return response;
};

// Fetch category by ID
const fetchCategoryById = async (id: string): Promise<ApiResponse<Category>> => {
    const response = await apiClient<ApiResponse<Category>>(`/categories/${id}`);
    return response;
};

// Fetch nested categories by ID
const fetchNestedCategories = async (id: string): Promise<ApiResponse<CategoryList>> => {
    const response = await apiClient<ApiResponse<CategoryList>>(`/categories/${id}/nested`);
    return response;
};

// Create a category
const createCategory = async (categoryData: Category): Promise<ApiResponse<Category>> => {
    const response = await apiClient<ApiResponse<Category>>("/categories", {
        method: "POST",
        body: JSON.stringify(categoryData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

// Update a category by ID
const updateCategory = async (id: string, categoryData: Category): Promise<ApiResponse<Category>> => {
    const response = await apiClient<ApiResponse<Category>>(`/categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify(categoryData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

// Delete a category by ID
const deleteCategory = async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient<ApiResponse<null>>(`/categories/${id}`, {
        method: "DELETE",
    });
    return response;
};

export const useCategories = () => {
    const queryClient = useQueryClient();

    // Fetch all categories
    const { data: categories, isLoading, error } = useQuery<ApiResponse<CategoryList>>({
        queryKey: ["categories"], // Query key for all categories
        queryFn: fetchCategories, // API call function
        staleTime: 1000 * 60 * 5, // Cache categories for 5 minutes
        retry: 2, // Retry twice before failing
    });

    // Fetch category by ID
    const fetchCategory = (id: string) => useQuery<ApiResponse<Category>>({
        queryKey: ["category", id], // Query key for individual category
        queryFn: () => fetchCategoryById(id),
    });

    // Fetch nested categories by ID
    const fetchNested = (id: string) => useQuery<ApiResponse<CategoryList>>({
        queryKey: ["category", id, "nested"], // Query key for nested categories
        queryFn: () => fetchNestedCategories(id),
    });

    // Create a category
    const createCategoryMutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            // Invalidate categories cache after creating a new category
            queryClient.invalidateQueries(["categories"]);
        },
    });

    // Update a category by ID
    const updateCategoryMutation = useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            // Invalidate categories cache after updating a category
            queryClient.invalidateQueries(["categories"]);
        },
    });

    // Delete a category by ID
    const deleteCategoryMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            // Invalidate categories cache after deleting a category
            queryClient.invalidateQueries(["categories"]);
        },
    });

    return {
        categories,          // List of all categories
        isLoading,           // Loading state
        error,               // Error state
        fetchCategory,       // Fetch a single category by ID
        fetchNested,         // Fetch nested categories by ID
        createCategoryMutation,  // Mutation for creating categories
        updateCategoryMutation,  // Mutation for updating categories
        deleteCategoryMutation,  // Mutation for deleting categories
    };
};
