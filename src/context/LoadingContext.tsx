"use client";

import React, {createContext, useContext, useState} from "react";

const LoadingContext = createContext({
    loading: true,
    showLoading: () => {},
    hideLoading: () => {}
});

// Create a custom hook to use the loading context
export const useLoading = () => {
    return useContext(LoadingContext);
};

// Create a provider component to wrap around your app
export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);

    // Function to set loading state to true
    const showLoading = () => setLoading(true);

    // Function to set loading state to false
    const hideLoading = () => setLoading(false);

    return (
        <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};