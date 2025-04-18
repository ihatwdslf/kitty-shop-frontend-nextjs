// User.ts
export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phone: string;
    address: string;
}

export interface UserRole {
    id: number;
    role: string;
}

export enum UserRoleDefaults {
    USER = "USER",
    MANAGER = "MANAGER",
    ADMIN = "ADMIN",
}