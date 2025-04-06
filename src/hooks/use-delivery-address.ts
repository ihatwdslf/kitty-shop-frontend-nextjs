"use client"

import {useEffect, useState} from "react";
import {
    clearDeliveryAddress,
    DELIVERY_ADDRESS_CHANGE_EVENT,
    getSavedDeliveryAddress,
    saveDeliveryAddress
} from "@/data/static/delivery-address";

// Custom hook for managing the delivery address
export default function useDeliveryAddress() {
    const [deliveryAddress, setDeliveryAddress] = useState<string | null>(getSavedDeliveryAddress());

    // Function to update the delivery address
    const updateDeliveryAddress = (address: string) => {
        saveDeliveryAddress(address);  // Save to localStorage
        setDeliveryAddress(address);    // Update state
    };

    // Function to remove the delivery address
    const removeDeliveryAddress = () => {
        clearDeliveryAddress();  // Remove from localStorage
        setDeliveryAddress(null); // Clear the state
    };

    useEffect(() => {
        const handleDeliveryAddressChange = () => {
            setDeliveryAddress(getSavedDeliveryAddress());
        };

        window.addEventListener(DELIVERY_ADDRESS_CHANGE_EVENT, handleDeliveryAddressChange);

        return () => {
            window.removeEventListener(DELIVERY_ADDRESS_CHANGE_EVENT, handleDeliveryAddressChange);
        };
    }, []);

    return {
        deliveryAddress,
        updateDeliveryAddress,
        removeDeliveryAddress
    };
}