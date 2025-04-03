"use client";

import {CategoryList} from "@/data/response/CategoryList";
import {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import {useLoading} from "@/context/LoadingContext";
import {apiClient} from "@/data/apiClient";

interface CategoryContextProps {
    categories: CategoryList | null;
    fetchAllCategories: () => Promise<any>;
    setHasFetched: Dispatch<SetStateAction<boolean>>;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

export const CategoryProvider = ({children}: { children: React.ReactNode }) => {
    const {showLoading, hideLoading} = useLoading();
    const [categories, setCategories] = useState<CategoryList | null>(null);
    const [hasFetched, setHasFetched] = useState(false);

    const fetchAllCategories = async () => {
        if (hasFetched) return;

        console.log("hasFetched: " + hasFetched);
        try {
            showLoading();
            const response = await apiClient.get("/categories", {
                withCredentials: true,
            });

            if (response.data?.code === 200) {
                setCategories(response.data?.data);
                setHasFetched(true)
            } else {
                setCategories(null);
            }
        } catch (err) {
            console.error("Categories fetching failed", err);
            setCategories(null);
        } finally {
            hideLoading();
        }
    };

    return (
        <CategoryContext.Provider value={{categories, setHasFetched, fetchAllCategories}}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoryProvider");
    }
    return context;
};