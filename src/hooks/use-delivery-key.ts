"use client"

import {useEffect, useState} from "react";
import {DELIVERY_OPTION_CHANGE_EVENT, getSavedDeliveryKey} from "@/data/static/delivery-options";

export default function useDeliveryKey() {
    const [deliveryKey, setDeliveryKey] = useState<string | null>(getSavedDeliveryKey());

    useEffect(() => {
        const handleDeliveryChange = () => {
            setDeliveryKey(getSavedDeliveryKey());
        };

        window.addEventListener(DELIVERY_OPTION_CHANGE_EVENT, handleDeliveryChange);

        return () => {
            window.removeEventListener(DELIVERY_OPTION_CHANGE_EVENT, handleDeliveryChange);
        };
    }, []);

    return deliveryKey;
}