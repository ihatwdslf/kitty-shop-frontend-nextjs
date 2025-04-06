// Constants for localStorage keys and event names
export const DELIVERY_ADDRESS_STORAGE_KEY = "delivery-address";
export const DELIVERY_ADDRESS_CHANGE_EVENT = "deliveryAddressChanged";

// Function to save the delivery address to localStorage
export const saveDeliveryAddress = (address: string) => {
    localStorage.setItem(DELIVERY_ADDRESS_STORAGE_KEY, address);
    window.dispatchEvent(new Event(DELIVERY_ADDRESS_CHANGE_EVENT)); // Dispatch event to notify other parts of the app
};

// Function to get the saved delivery address from localStorage
export const getSavedDeliveryAddress = (): string | null => {
    if (typeof window === "undefined") return null; // Protection for SSR
    return localStorage.getItem(DELIVERY_ADDRESS_STORAGE_KEY);
};

// Function to clear the saved delivery address from localStorage
export const clearDeliveryAddress = () => {
    localStorage.removeItem(DELIVERY_ADDRESS_STORAGE_KEY);
    window.dispatchEvent(new Event(DELIVERY_ADDRESS_CHANGE_EVENT)); // Dispatch event to notify other parts of the app
};