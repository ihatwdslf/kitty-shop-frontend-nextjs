﻿export const Routes = {
    HOME: "/",

    // Account
    ACCOUNT: '/account',
    ACCOUNT_SETTINGS: '/account/settings',
    ACCOUNT_ORDERS: '/account/orders',
    ACCOUNT_SIDEBAR: (slug: string) => `/account${slug}`,

    // Admin
    ADMIN: '/admin',
    ADMIN_BRANDS: '/admin/brands',
    ADMIN_CATEGORIES: '/admin/categories',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_SIDEBAR: (slug: string) => `/admin${slug}`,

    // Checkout flow
    CHECK_OUT: "/check-out",
    CHECKOUT_CART: '/check-out/cart',
    CHECKOUT_PURCHASE: '/check-out/purchase',
    CHECKOUT_PURCHASE_DELIVERY: '/check-out/purchase/delivery',
    CHECKOUT_PURCHASE_PAYMENT: '/check-out/purchase/payment',
    CHECKOUT_PURCHASE_CONFIRMATION: '/check-out/purchase/confirmation',
    CHECKOUT_PURCHASE_STEP: (slug: string) => `/check-out/purchase/${slug}`,

    // Products
    PRODUCTS: '/products',
    PRODUCTS_BY_CATEGORIES: (categoryKey: string) => `/products?categoryKeys=${categoryKey}`,
    PRODUCT_DETAILS: (slug: number) => `/products/${slug}`,

    // 404
    NOT_FOUND: '/404',
};

export const ProtectedRoutes = [
    Routes.ADMIN,
    Routes.ADMIN_BRANDS,
    Routes.ADMIN_CATEGORIES,
    Routes.ADMIN_PRODUCTS,
    Routes.ADMIN_ORDERS,

    Routes.ACCOUNT,
    Routes.ACCOUNT_SETTINGS,
    Routes.ACCOUNT_ORDERS,

    Routes.CHECKOUT_PURCHASE_DELIVERY,
    Routes.CHECKOUT_PURCHASE_PAYMENT,
    Routes.CHECKOUT_PURCHASE_CONFIRMATION,
];

export const Redirects: Record<string, string> = {
    [Routes.ADMIN]: Routes.ADMIN_BRANDS,
    [Routes.ACCOUNT]: Routes.ACCOUNT_ORDERS,
    [Routes.CHECK_OUT]: Routes.CHECKOUT_CART,
    [Routes.CHECKOUT_PURCHASE]: Routes.CHECKOUT_PURCHASE_DELIVERY,
}