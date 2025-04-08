"use client"

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useCartCount} from "@/hooks/use-cart-count";
import DeliveryVariantsTabs from "@/components/DeliveryVariantsTabs";
import {DeliveryOptions, getDeliveryOptionItemByKey, saveDeliveryKey} from "@/data/static/delivery-options";
import useDeliveryKey from "@/hooks/use-delivery-key";
import {useAuth} from "@/context/AuthContext";
import ChangeDeliveryAddress from "@/components/ChangeDeliveryAddress";
import {Routes} from "@/data/static/routes";

const CheckOutPurchaseDeliveryPage = () => {

    const router = useRouter();

    const cartItemsCount = useCartCount();

    const {user} = useAuth();

    useEffect(() => {
        if (cartItemsCount <= 0) router.push(Routes.CHECKOUT_CART);
    }, [router]);

    const deliveryKey = useDeliveryKey(); // Отримуємо актуальний deliveryKey
    if (deliveryKey == null) {
        saveDeliveryKey(DeliveryOptions.selfDeliveryTab[0].key);
    }

    const deliveryOption = getDeliveryOptionItemByKey(deliveryKey ?? "");

    return (
        <>
            <ChangeDeliveryAddress deliveryOption={deliveryOption}/>
            <div
                className="mt-3 hover:border-gray-300 flex items-center justify-between border border-2 rounded-md p-5">
                <div className="text-sm">
                    Одержувач замовлення
                    <div className="pt-1 text-muted-foreground text-xs font-light">
                        Персональні дані одержувача
                    </div>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                    <div>
                        {user?.data?.firstName ?? "Невідомо"}
                        {" "}
                        {user?.data?.lastName ?? "Невідомо"}
                    </div>
                    <div>
                        {user?.data?.phone ?? "Номер не вказано"}
                    </div>
                </div>
            </div>
            <div className="w-full pt-10">
                <DeliveryVariantsTabs/>
            </div>
        </>
    );
}

export default CheckOutPurchaseDeliveryPage;