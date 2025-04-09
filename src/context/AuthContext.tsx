"use client";

import React, { createContext, ReactNode, useContext } from "react";
import { apiClient } from "@/data/api-client";
import { User } from "@/data/response/user/User";
import { UserLoginRequestDto } from "@/data/request/auth/UserLoginRequestDto";
import { useLoading } from "@/context/LoadingContext";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ApiResponse} from "@/data/response/ApiResponse";
import {UserLoginResponse} from "@/data/response/user/UserLoginResponse";
import {UserRegistrationRequestDto} from "@/data/request/auth/UserRegistrationRequestDto";

interface AuthContextType {
    authorized: boolean;
    user: ApiResponse<User> | null | undefined;
    error: string;
    register: (credentials: UserRegistrationRequestDto) => Promise<boolean>;
    login: (credentials: UserLoginRequestDto) => Promise<boolean>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const queryClient = useQueryClient();
    const { showLoading, hideLoading } = useLoading();

    // ✅ Запит на отримання користувача
    const { data: user, error } = useQuery<ApiResponse<User> | null>({
        queryKey: ["user"],
        queryFn: async () => {
            showLoading();
            try {
                const response = await apiClient<ApiResponse<User>>("/auth/me");
                return response ?? null; // 👈 Якщо відповідь `undefined`, повертаємо `null`
            } catch (err) {
                console.error("User data fetching failed", err);
                return null;
            } finally {
                hideLoading();
            }
        },
        staleTime: 1000 * 60 * 5, // 5 хвилин кешування
    });

    const authorized = user?.data?.id ? user?.data?.id > 0 : false;

    const registerMutation = useMutation({
        mutationFn: async (credentials: UserRegistrationRequestDto) => {
            const response = await apiClient<ApiResponse<UserLoginResponse>>("/auth/registration", {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.code !== 201) {
                throw new Error(response.message || "Registration failed");
            }

            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] }); // Оновити користувача після входу
        },
    });

    const register = async (credentials: UserRegistrationRequestDto): Promise<boolean> => {
        try {
            return await registerMutation.mutateAsync(credentials);
        } catch (err) {
            console.error("Registration failed", err);
            return false;
        }
    };

    // ✅ Логін через useMutation
    const loginMutation = useMutation({
        mutationFn: async (credentials: UserLoginRequestDto) => {
            const response = await apiClient<ApiResponse<UserLoginResponse>>("/auth/login", {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.code !== 200) {
                throw new Error(response.message || "Login failed");
            }

            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] }); // Оновити користувача після входу
        },
    });

    const login = async (credentials: UserLoginRequestDto): Promise<boolean> => {
        try {
            return await loginMutation.mutateAsync(credentials);
        } catch (err) {
            console.error("Login failed", err);
            return false;
        }
    };

    // ✅ Логаут через useMutation
    const logoutMutation = useMutation({
        mutationFn: async () => {
            await apiClient("/auth/logout", { method: "POST" });
        },
        onSuccess: () => {
            queryClient.setQueryData(["user"], null); // Встановлюємо користувача в `null`
        },
    });

    const logout = async () => {
        await logoutMutation.mutateAsync();
    };

    return (
        <AuthContext.Provider value={{ user, error: error?.message || "", register, login, logout, authorized }}>
            {children}
        </AuthContext.Provider>
    );
};