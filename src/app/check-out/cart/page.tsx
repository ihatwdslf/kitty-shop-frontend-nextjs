"use client"

import {useCartCount} from "@/hooks/use-cart-count";
import {getCartItems} from "@/utils/cart-storage";

import {FaRegTrashAlt} from "react-icons/fa";
import {formatPrice} from "@/utils/price";
import {Button} from "@/components/ui/button";
import {useProductTotals} from "@/hooks/use-products";
import {MdDiscount} from "react-icons/md";
import {IoMdCash} from "react-icons/io";
import {RiBillFill} from "react-icons/ri";
import CartProductList from "@/components/order/CartProductList";
import PossiblePaymentServicesBanner from "@/components/PossiblePaymentServicesBanner";
import {ProductGetTotalsResponse} from "@/data/response/product/ProductGetTotalsResponse";
import {useRouter} from "next/navigation";
import {Routes} from "@/data/static/routes";
import NotAuthorizedDynamicToast from "@/components/NotAuthorizedDynamicToast";
import React, {useRef} from "react";
import {useAuth} from "@/context/AuthContext";

const CheckOutCartPage = () => {

    const router = useRouter();
    const cartItems = getCartItems();
    const cartItemsCount = useCartCount();

    const { authorized } = useAuth();

    const {data: totalsData, isLoading} = useProductTotals(cartItems);
    const totals: ProductGetTotalsResponse | undefined = totalsData?.data;

    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleClickContinueBtn = () => {
        if (authorized)
            router.push(Routes.CHECKOUT_PURCHASE);
    }

    return (
        <main className="bg-stone-100">
            <div className="container">
                <div className="grid grid-cols-8 justify-between gap-x-10">
                    <div className="col-span-5">
                        <div className="bg-white p-3 flex flex-cols items-center justify-between">
                            <div
                                className="px-3 py-2 text-[13px] font-light flex flex-cols gap-x-2 items-center
                                    cursor-pointer hover:bg-gray-100 rounded-md"
                            >
                                <FaRegTrashAlt/>
                                Видалити все
                            </div>
                            <div className="pr-5 text-[10px] text-muted-foreground font-light">
                                Товарів у кошику: {cartItemsCount}
                            </div>
                        </div>
                        {cartItemsCount > 0 && <CartProductList/>}
                    </div>
                    <div className="col-span-3">
                        <div className="bg-white p-1.5 flex flex-cols items-center justify-center">
                            <PossiblePaymentServicesBanner/>
                        </div>
                        <div className="bg-white p-8 w-full mt-1">
                            <Button
                                className="flex w-full bg-rose-400 hover:bg-rose-500 cursor-pointer p-6 text-center
                                    text-white text-[14px] rounded-lg"
                                onClick={handleClickContinueBtn}
                                disabled={isLoading}
                                ref={triggerRef}
                            >
                                Перейти до оформлення
                            </Button>
                            <NotAuthorizedDynamicToast triggerRef={triggerRef}/>
                            <div className="py-5">
                                <div
                                    className="pt-3 flex items-end justify-between"
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
                                    className="flex items-end justify-between"
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
                                    className="pt-7 flex items-end justify-between"
                                >
                                    <div className="flex items-center gap-x-2">
                                        <RiBillFill size={20}/>
                                        Загальна сума
                                    </div>
                                    <div className="font-medium text-[28px]">
                                        {formatPrice(totals?.totalWithDiscount)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CheckOutCartPage;