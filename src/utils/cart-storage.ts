export type CartItem = {
    productId: number;
    quantity: number;
};

export const STORAGE_EVENT = "storage";
export const CART_ITEMS_KEY = "cart_items";
export const CART_ITEMS_UPDATED_EVENT = "cart_item_updated";

export const getCartItems = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(CART_ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const getCartItemByProductId = (productId: number): CartItem | undefined => {
    return getCartItems().find(item => item.productId === productId);
};

// Зберегти
const saveCartItems = (items: CartItem[]) => {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_ITEMS_UPDATED_EVENT)); // 🔔 Кастомна подія
};

// Додати товар
export const addToCart = (productId: number, quantity: number = 1) => {
    const cart = getCartItems();
    const index = cart.findIndex(item => item.productId === productId);
    if (index !== -1) {
        cart[index].quantity += quantity;
    } else {
        cart.push({productId, quantity});
    }
    saveCartItems(cart);
};

// Зменшити кількість або видалити
export const removeFromCart = (productId: number, quantity: number = 1) => {
    const cart = getCartItems();
    const index = cart.findIndex(item => item.productId === productId);

    if (index !== -1) {
        if (cart[index].quantity > quantity) {
            cart[index].quantity -= quantity;
        } else {
            cart.splice(index, 1); // Видаляємо товар повністю
        }
        saveCartItems(cart);
    }
};