"use client"

import useDeliveryKey from "@/hooks/use-delivery-key";
import {getDeliveryOptionItemByKey} from "@/data/static/delivery-options";
import {BiCheckCircle} from "react-icons/bi";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import React from "react";
import {Routes} from "@/data/static/routes";
import {useRouter} from "next/navigation";
import {usePaymentSelection} from "@/hooks/use-payment-selection";
import {PAYMENT_METHOD_STORAGE_KEY, PaymentSectionIDs, PaymentSections} from "@/data/reference/payment-sections";
import {COMPANY_EDRPOU_OR_IPN_STORAGE_KEY, COMPANY_EMAIL_STORAGE_KEY} from "@/components/CompanyPaymentMethodDetails";
import {PaymentMethods} from "@/data/reference/payment-methods";
import Image from "next/image";
import {useAuth} from "@/context/AuthContext";

const CheckOutPurchasePaymentPage = () => {

    const router = useRouter();

    const { user } = useAuth();
    const deliveryKey = useDeliveryKey();
    const deliveryOption = getDeliveryOptionItemByKey(deliveryKey ?? "0");

    const {selectedSectionKey} = usePaymentSelection();

    const paymentInfo = () => {

        const selectedSection = PaymentSections.find(section => section.key === selectedSectionKey);

        switch (selectedSection?.id) {
            case PaymentSectionIDs.ON_DELIVERY:
                return (
                    <div className="flex flex-cols items-center gap-x-3">
                        {selectedSection?.title}
                    </div>
                );

            case PaymentSectionIDs.ONLINE:

                const methodKey = localStorage.getItem(PAYMENT_METHOD_STORAGE_KEY);
                const method = PaymentMethods.find(m => m.key === methodKey);

                return (
                    <div>
                        {selectedSection?.title}
                        <div className="flex items-center gap-x-3 pt-2">
                            <div className="px-3 py-1 rounded-md bg-amber-100 text-[10px] text-black">
                                <div className="text-xs font-light flex flex-cols items-center gap-x-1 h-5">
                                    {method?.name}
                                    {!!method?.icon && <method.icon/>}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case PaymentSectionIDs.CREDIT_FUNDS:

                return (
                    <div>
                        {selectedSection?.title}
                        <div className="flex items-center gap-x-3 pt-2">
                            <div>
                                <div className="px-3 py-2 rounded-md bg-amber-100 text-[10px] text-black">
                                    Оплачуй за допомогою кредиту від наших партнерів!
                                </div>
                                <div className="flex flex-rows gap-x-8 h-6 pl-3 mt-5 my-2">
                                    <Image
                                        src="/raiffeisen-bank-logo.svg"
                                        alt="raiffeisen-bank-logo"
                                        width={0}
                                        height={0}
                                        sizes="100vh"
                                        quality={100}
                                        style={{width: 'auto', height: '100%'}}
                                    />
                                    <Image
                                        src="/credit-agricole-bank-logo.svg"
                                        alt="credit-agricole-bank-logo"
                                        width={0}
                                        height={0}
                                        sizes="100vh"
                                        quality={100}
                                        style={{width: 'auto', height: '100%'}}
                                    />
                                    <Image
                                        src="/privat24-bank-logo.png"
                                        alt="privat24-bank-logo"
                                        width={0}
                                        height={0}
                                        sizes="100vh"
                                        quality={100}
                                        style={{width: 'auto', height: '100%'}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case PaymentSectionIDs.COMPANY:

                const savedEdrpou = localStorage.getItem(COMPANY_EDRPOU_OR_IPN_STORAGE_KEY)
                const savedEmail = localStorage.getItem(COMPANY_EMAIL_STORAGE_KEY)

                return (
                    <div>
                        {selectedSection?.title}
                        <div className="flex items-center gap-x-3 pt-2">
                            <div className="px-3 py-2 rounded-md bg-amber-100 text-[10px] text-black">
                                ЄДРПОУ / ІПН: <b>{savedEdrpou}</b>
                            </div>
                            <div className="px-3 py-2 rounded-md bg-amber-100 text-[10px] text-black">
                                Електронна пошта: <b>{savedEmail}</b>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    }

    return (
        <div>
            <div
                className="border-b-1 cursor-pointer relative flex flex-cols items-center gap-3 rounded-md p-4"
                onClick={() => router.push(Routes.CHECKOUT_PURCHASE_DELIVERY)}
            >
                <div>
                    <BiCheckCircle
                        size={24}
                        className="text-rose-400"
                    />
                </div>
                <div
                    className="flex w-full flex-cols items-center justify-between"
                >
                    <div className="space-y-1 pl-1">
                        <div className="text-sm">
                            Доставка
                        </div>
                        <div className="text-xs text-muted-foreground font-thin">
                            {deliveryOption?.label}
                        </div>
                        <div className="text-xs text-muted-foreground text-[11px] pt-1">
                            {deliveryOption?.deliveryAvailable}
                        </div>
                    </div>
                    <div>
                        <div
                            className="flex items-center gap-x-2 text-sm text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                        >
                            Змінити
                            <IoIosArrowDroprightCircle size={20}/>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="border-b-1 cursor-pointer relative flex flex-cols items-center gap-3 rounded-md p-4"
                onClick={() => router.push(Routes.CHECKOUT_PURCHASE_PAYMENT)}
            >
                <div>
                    <BiCheckCircle
                        size={24}
                        className="text-rose-400"
                    />
                </div>
                <div
                    className="flex w-full flex-cols items-center justify-between"
                >
                    <div className="space-y-1 pl-1">
                        <div className="text-sm">
                            Оплата
                        </div>
                        <div className="text-xs text-muted-foreground font-thin">
                            {paymentInfo()}
                        </div>
                    </div>
                    <div>
                        <div
                            className="flex items-center gap-x-2 text-sm text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                        >
                            Змінити
                            <IoIosArrowDroprightCircle size={20}/>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="border-b-1 relative flex flex-cols items-center gap-3 rounded-md p-4"
            >
                <div>
                    <BiCheckCircle
                        size={24}
                        className="text-rose-400"
                    />
                </div>
                <div
                    className="flex w-full flex-cols items-center justify-between"
                >
                    <div className="space-y-1 pl-1">
                        <div className="text-sm">
                            Одержувач замовлення
                        </div>
                        <div className="text-xs text-muted-foreground font-thin">
                            {user?.data?.firstName ?? "Невідомо"}
                            {" "}
                            {user?.data?.lastName ?? "Невідомо"}
                        </div>
                        <div className="text-xs text-muted-foreground font-thin">
                            {user?.data?.phone ?? "Номер не вказано"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOutPurchasePaymentPage;