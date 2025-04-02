"use client"

import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {apiClient} from "@/data/apiClient";
import {useLoading} from "@/context/LoadingContext";
import {User} from "@/data/response/User";

const AuthContext = createContext({
    authorized: false,
    user: null,
    error: ""
});

// Create a custom hook to access the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Create an AuthProvider to wrap your app and provide the context
export const AuthProvider = ({children}) => {
    const router = useRouter();

    const [authorized, setAuthorized] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null); // Store user data
    const [error, setError] = useState<string>(""); // Handle error state

    const { showLoading, hideLoading } = useLoading();

    // Fetch user data (could be from local storage or an API call)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                showLoading();
                const response = await apiClient.get("/auth/me", {
                    withCredentials: true,
                });

                if (response.data?.code === 200) {
                    setUser(response.data?.data); // Set the user data
                } else {
                    setUser(null); // Clear user if not found
                    hideLoading();
                }
            } catch (err) {
                setError("User data fetching failed");
                hideLoading();
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user?.id) {
            setAuthorized(true);
            hideLoading();
        }
    }, [user]);

    const login = async (credentials): Promise<boolean> => {
        try {
            const response = await apiClient.post(
                "/auth/login",
                credentials,
                {withCredentials: true}
            );

            if (response.data?.code == 200) {
                return true;
            } else {
                setError(response.data?.message || "Login failed");
                return false;
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            return false;
        }
    };

    const logout = async () => {
        setUser(null); // Clear user data on logout

        const response = await apiClient.post(
            "/auth/logout",
            { withCredentials: true }
        );

        router.push("/"); // Redirect to home page
    };

    return (
        <AuthContext.Provider value={{user, error, login, logout, authorized}}>
            {children}
        </AuthContext.Provider>
    );
};