"use client";

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/data/apiClient";
import { User } from "@/data/response/User";
import { UserLoginRequestDto } from "@/data/request/auth/UserLoginRequestDto";
import { useLoading } from "@/context/LoadingContext";

interface AuthContextType {
    authorized: boolean;
    user: User | null;
    error: string;
    login: (credentials: UserLoginRequestDto) => Promise<boolean>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    authorized: false,
    user: null,
    error: "",
    login: async () => false,
    logout: async () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter();

    const [authorized, setAuthorized] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>("");

    const { showLoading, hideLoading } = useLoading();

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                showLoading();
                const response = await apiClient<User>("/auth/me");

                setUser(response); // Set the user data
                hideLoading();
            } catch (err) {
                console.error("User data fetching failed", err);
                setError("User data fetching failed");
                hideLoading();
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user?.id) {
            setAuthorized(true);
        }
    }, [user]);

    const login = async (credentials: UserLoginRequestDto): Promise<boolean> => {
        try {
            const response = await apiClient<{ code: number, message: string }>("/auth/login", {
                method: "POST",
                body: credentials,
            });

            if (response.code === 200) {
                return true;
            } else {
                setError(response.message || "Login failed");
                return false;
            }
        } catch (err) {
            const error = err as Error;
            setError(error.message || "Login failed");
            return false;
        }
    };

    const logout = async () => {
        try {
            await apiClient("/auth/logout", { method: "POST" });
            setUser(null); // Clear user data on logout
            router.push("/");
        } catch (err) {
            console.error("Logout failed", err);
            setError("Logout failed");
        }
    };

    return (
        <AuthContext.Provider value={{ user, error, login, logout, authorized }}>
            {children}
        </AuthContext.Provider>
    );
};
