import {useEffect, useState} from "react";
import {CART_ITEMS_UPDATED_EVENT, getCartItemByProductId, getCartItems, STORAGE_EVENT} from "@/utils/cartStorage";

// ✅ Хук повертає загальну кількість або кількість для конкретного продукту
export function useCartCount(productId?: number): number {

    // if (!productId) return 0;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [count, setCount] = useState(() => {
        const items = getCartItems();
        return productId !== undefined
            ? items.find(i => i.productId === productId)?.quantity || 0
            : items.reduce((sum, item) => sum + item.quantity, 0);
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const items = getCartItems();
            const newCount = productId !== undefined
                ? items.find(i => i.productId === productId)?.quantity || 0
                : items.reduce((sum, item) => sum + item.quantity, 0);

            setCount(newCount);
        };

        // 🟡 Слухай подію кастомну
        window.addEventListener(CART_ITEMS_UPDATED_EVENT, handleStorageChange);

        // (опціонально) для мультивкладок
        window.addEventListener(STORAGE_EVENT, handleStorageChange);

        return () => {
            window.removeEventListener(CART_ITEMS_UPDATED_EVENT, handleStorageChange);
            window.removeEventListener(STORAGE_EVENT, handleStorageChange);
        };
    }, [productId]);

    return count;
}

// Хук повертає загальну кількість всіх товарів у кошику
export function useCartTotalCount(): number {
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        const handleStorageChange = () => {
            const items = getCartItems();
            const newCount = items.reduce((sum, item) => sum + item.quantity, 0);
            setTotalCount(newCount);
        };

        window.addEventListener(CART_ITEMS_UPDATED_EVENT, handleStorageChange);
        window.addEventListener(STORAGE_EVENT, handleStorageChange);

        return () => {
            window.removeEventListener(CART_ITEMS_UPDATED_EVENT, handleStorageChange);
            window.removeEventListener(STORAGE_EVENT, handleStorageChange);
        };
    }, []);

    return totalCount;
}

// Хук повертає кількість для конкретного продукту в кошику
export function useCartProductCount(productId: number | undefined): number {
    if (!productId) return 0;
    return getCartItemByProductId(productId)?.quantity ?? 0;
}