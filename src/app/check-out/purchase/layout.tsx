"use client"

import React, {useEffect} from "react";
import PurchaseStepsProgressLine from "@/components/PurchaseStepsProgressLine";
import {IoIosArrowDroprightCircle, IoMdCash} from "react-icons/io";
import CartItemPurchase from "@/components/order/CartItemPurchase";
import {formatPrice} from "@/utils/price";
import {MdDiscount} from "react-icons/md";
import {TbTruckDelivery} from "react-icons/tb";
import {RiBillFill} from "react-icons/ri";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {getCartItems} from "@/utils/cartStorage";
import {useCartCount} from "@/hooks/useCartCount";
import {useProductTotals} from "@/hooks/useProducts";
import {ProductGetTotalsResponse} from "@/data/response/product/ProductGetTotalsResponse";
import useDeliveryKey from "@/hooks/use-delivery-key";
import {DeliveryOptions, getDeliveryOptionItemByKey, saveDeliveryKey} from "@/data/static/delivery-options";
import {PurchaseSteps} from "@/data/static/purchase-steps";

const CheckOutPageLayout = ({children}: { children: React.ReactNode }) => {

    const router = useRouter();

    const cartItems = getCartItems();
    const cartItemsCount = useCartCount();

    // const {user} = useAuth();

    const {data: totalsData} = useProductTotals(cartItems);
    const totals: ProductGetTotalsResponse | undefined = totalsData?.data;

    useEffect(() => {
        if (cartItemsCount <= 0) router.push(`/check-out/cart`);
    }, [router]);

    const deliveryKey = useDeliveryKey(); // Отримуємо актуальний deliveryKey
    if (deliveryKey == null) {
        saveDeliveryKey(DeliveryOptions.selfDeliveryTab[0].key);
    }

    const deliveryOption = getDeliveryOptionItemByKey(deliveryKey ?? "");

    const calcTotalSum = (): number => {
        return (totals?.totalWithDiscount ?? 0) + (deliveryOption && deliveryOption.additionalPrice > 0 ? deliveryOption.additionalPrice : 0)
    }

    const pathname = usePathname();  // Get the current URL path

    // Find the active step based on the URL's link part
    const activeStep = PurchaseSteps.find(
        (step) => pathname?.includes(step.linkPart)
    )?.step || 1;  // Default to step 1 if none is found

    return (
        <main className="h-full">
            <div className="container">
                <div className="flex w-full items-center justify-between">
                    <div>
                        {PurchaseSteps[activeStep - 1].pageTitle}
                    </div>
                    <div className="pr-[8%]">
                        <PurchaseStepsProgressLine activeStep={activeStep}/>
                    </div>
                </div>
                <div className="grid grid-cols-9 gap-x-10">
                    <div className="col-span-5">
                        <div className="pt-5">
                            {children}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="pt-5">
                            <div
                                className="flex items-center justify-between border border-2 rounded-md p-5"
                            >
                                <div className="w-full">
                                    <div className="flex flex-rows items-center justify-between">
                                        <div className="flex text-sm items-center justify-between gap-x-1">
                                            Товари{" "}
                                            <span
                                                className="text-xs text-muted-foreground font-light flex items-center gap-x-2"
                                            >
                                                {cartItemsCount}
                                            </span>
                                        </div>
                                        <div
                                            className="flex items-center gap-x-2 text-sm text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                                            onClick={() => router.push(`/check-out/cart`)}
                                        >
                                            Редагувати товари
                                            <IoIosArrowDroprightCircle size={20}/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-cols pt-3">
                                            {cartItems?.map(cartItem =>
                                                <CartItemPurchase
                                                    key={`purchase_cart_item_${cartItem.productId}`}
                                                    cartItem={cartItem}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-2">
                            <div className="flex items-center justify-between p-6 border border-2 rounded-md">
                                <div className="w-full">
                                    <div
                                        className="flex items-end justify-between"
                                    >
                                        <div className="text-sm font-thin flex items-center gap-x-2">
                                            <IoMdCash size={16}/>
                                            Сума без знижок
                                        </div>
                                        <div className="font-medium text-lg">
                                            {formatPrice(totals?.totalWithoutDiscount)}
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-end justify-between pt-1"
                                    >
                                        <div className="text-sm font-thin flex items-center gap-x-2">
                                            <MdDiscount size={16}/>
                                            Знижка
                                        </div>
                                        <div className="font-medium text-lg">
                                            -{formatPrice(totals?.discountDifference)}
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-end justify-between pt-1"
                                    >
                                        <div className="text-sm font-thin flex items-center gap-x-2">
                                            <TbTruckDelivery size={16}/>
                                            Доставка
                                        </div>
                                        {deliveryOption && deliveryOption.additionalPrice > 0 ? (
                                            <span className="font-medium text-lg">
                                                {formatPrice(deliveryOption.additionalPrice)}
                                            </span>
                                        ) : (
                                            <span className="text-green-600 font-medium text-[15px]">
                                                Безкоштовно
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className="pt-7 flex items-end justify-between"
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <RiBillFill size={20}/>
                                            Загальна сума
                                        </div>
                                        <div className="font-medium text-[28px]">
                                            {formatPrice(calcTotalSum())}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button
                                className="flex w-full bg-rose-400 hover:bg-rose-500 cursor-pointer p-6 text-center
                                            text-white text-[14px] rounded-lg"
                                onClick={() => router.push(`/check-out/purchase`)}
                            >
                                Перейти до оформлення
                            </Button>
                        </div>
                    </div>
                </div>
                {activeStep !== PurchaseSteps.length && (
                    <div className="py-10 flex">
                        <div
                            className="flex items-center gap-x-2 text-sm text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                            onClick={() => router.push(`/check-out/purchase/${PurchaseSteps[activeStep].linkPart}`)}
                        >
                            Продовжити
                            <IoIosArrowDroprightCircle size={20}/>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default CheckOutPageLayout;