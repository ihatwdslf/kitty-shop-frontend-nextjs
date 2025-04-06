"use client"

import {useEffect, useState} from "react";
import {PAYMENT_METHOD_STORAGE_KEY, PAYMENT_SECTION_STORAGE_KEY} from "@/data/reference/payment-sections";


export function usePaymentSelection() {
    const [selectedSectionKey, setSelectedSectionKey] = useState<string | null>(null);
    const [selectedMethodKey, setSelectedMethodKey] = useState<string | null>(null);

    useEffect(() => {
        const savedSection = localStorage.getItem(PAYMENT_SECTION_STORAGE_KEY);
        const savedMethod = localStorage.getItem(PAYMENT_METHOD_STORAGE_KEY);
        if (savedSection) setSelectedSectionKey(savedSection);
        if (savedMethod) setSelectedMethodKey(savedMethod);
    }, []);

    const selectSection = (sectionKey: string) => {
        setSelectedSectionKey(sectionKey);
        localStorage.setItem(PAYMENT_SECTION_STORAGE_KEY, sectionKey);
        // Якщо змінилася секція — скидаємо method
        setSelectedMethodKey(null);
        localStorage.removeItem(PAYMENT_METHOD_STORAGE_KEY);
    };

    const selectMethod = (methodKey: string) => {
        setSelectedMethodKey(methodKey);
        localStorage.setItem(PAYMENT_METHOD_STORAGE_KEY, methodKey);
    };

    return {
        selectedSectionKey,
        selectedMethodKey,
        selectSection,
        selectMethod,
    };
}
