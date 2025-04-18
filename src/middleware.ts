import {NextRequest, NextResponse} from 'next/server'
import {AUTH_TOKEN_COOKIE_NAME} from '@/data/api-client'
import {ProtectedRoutes, Redirects, Routes} from "@/data/static/routes";

// Функція для отримання ролі користувача з бекенду
async function getUserRole(request: NextRequest, token: string | undefined): Promise<string | null> {
    try {
        // Convert request headers to a plain object
        const headers = new Headers(request.headers);

        // Make the fetch request to get the user role
        const response = await fetch('http://localhost:8080/api/v1/auth/me', {
            method: 'GET',
            headers: headers,  // Pass the headers from the request
            credentials: 'include',  // This is equivalent to withCredentials in axios
        });

        // Check for successful response
        if (response.ok) {
            const data = await response.json();
            return data.data.role.role || null;  // Adjust the response structure based on your backend
        } else {
            console.error("Failed to fetch user role", response.status);
            return null;
        }
    } catch (error) {
        console.error("Error user role", error);
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    if (Redirects[pathname]) {
        return NextResponse.redirect(new URL(Redirects[pathname], request.url));
    }

    const token = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;

    const requiresAuth = ProtectedRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));
    if (requiresAuth && !token) {
        return NextResponse.redirect(new URL(Routes.HOME, request.url));
    }

    const userRole = await getUserRole(request, token);
    console.log("User role", userRole);

    if (pathname.startsWith('/admin')) {
        if (userRole !== 'ADMIN') {
            return NextResponse.redirect(new URL(Routes.HOME, request.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/check-out',
        '/check-out/purchase',
        '/check-out/purchase/:path*',
        '/account/:path*',
        '/admin/:path*'
    ],
};