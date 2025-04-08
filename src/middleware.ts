import {NextRequest, NextResponse} from 'next/server'
import {AUTH_TOKEN_COOKIE_NAME} from '@/data/api-client'
import {ProtectedRoutes, Redirects, Routes} from "@/data/static/routes";

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl

    // 1. Redirect incomplete routes (like /check-out ➜ /check-out/cart)
    if (Redirects[pathname]) {
        return NextResponse.redirect(new URL(Redirects[pathname], request.url));
    }

    // 2. If route requires auth (match exact or full path)
    const requiresAuth = ProtectedRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));

    if (requiresAuth) {
        const isLoggedIn = request.cookies.get(AUTH_TOKEN_COOKIE_NAME)?.value;
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL(Routes.HOME, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/check-out',
        '/check-out/purchase',
        '/check-out/purchase/:path',
        '/account/:path*'
    ],
}
