// User.ts
export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    phone: number;
    address: string;
}

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
    GUEST = "GUEST"
}