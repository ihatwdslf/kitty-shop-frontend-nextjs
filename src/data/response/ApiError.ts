export interface ApiError {
    code: number;
    message: string;
    details?: string;
    try?: string;
}