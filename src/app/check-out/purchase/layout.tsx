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
import {getCartItems, removeFromCart} from "@/utils/cart-storage";
import {useCartCount} from "@/hooks/use-cart-count";
import {useProductTotals} from "@/hooks/use-products";
import {ProductGetTotalsResponse} from "@/data/response/product/ProductGetTotalsResponse";
import useDeliveryKey from "@/hooks/use-delivery-key";
import {
    DELIVERY_OPTION_STORAGE_KEY,
    DeliveryOptions,
    getDeliveryOptionItemByKey,
    saveDeliveryKey
} from "@/data/static/delivery-options";
import {PurchaseSteps, PurchaseStepsIDs} from "@/data/static/purchase-steps";
import {Routes} from "@/data/static/routes";
import {useOrders} from "@/hooks/use-orders";
import {OrderCreateRequestDto} from "@/data/request/order/OrderCreateRequestDto";
import useDeliveryAddress from "@/hooks/use-delivery-address";
import {
    PAYMENT_METHOD_STORAGE_KEY,
    PAYMENT_SECTION_STORAGE_KEY,
    PaymentSectionIDs,
    PaymentSections
} from "@/data/reference/payment-sections";
import {useOrderItems} from "@/hooks/use-order-items";
import {DELIVERY_ADDRESS_STORAGE_KEY} from "@/data/static/delivery-address";
import {
    COMPANY_EDRPOU_OR_IPN_STORAGE_KEY,
    COMPANY_EMAIL_STORAGE_KEY,
    EMAIL_REGEX,
    ERDPOU_OR_IPN_REGEX
} from "@/components/CompanyPaymentMethodDetails";

const CheckOutPageLayout = ({children}: { children: React.ReactNode }) => {

    const router = useRouter();

    const cartItems = getCartItems();
    const cartItemsCount = useCartCount();

    // const {user} = useAuth();

    const {data: totalsData} = useProductTotals(cartItems);
    const totals: ProductGetTotalsResponse | undefined = totalsData?.data;

    useEffect(() => {
        if (cartItemsCount <= 0) router.push(Routes.CHECKOUT_CART);
    }, [router]);

    const deliveryKey = useDeliveryKey(); // Отримуємо актуальний deliveryKey
    if (deliveryKey == null) {
        saveDeliveryKey(DeliveryOptions.selfDeliveryTab[0].key);
    }

    const deliveryOption = getDeliveryOptionItemByKey(deliveryKey ?? "");

    const calcTotalSum = (): number => {
        return (totals?.totalWithDiscount ?? 0) + (deliveryOption && deliveryOption.additionalPrice > 0 ? deliveryOption.additionalPrice : 0)
    }

    const {deliveryAddress} = useDeliveryAddress();

    const pathname = usePathname();  // Get the current URL path

    // Find the active step based on the URL's link part
    const activeStep = PurchaseSteps.find(
        (step) => pathname?.includes(step.linkPart)
    )?.step || 1;  // Default to step 1 if none is found

    const {createOrderMutation} = useOrders();
    const {createOrderItemMutation} = useOrderItems();

    const isSubmitting = createOrderMutation.isPending || createOrderItemMutation.isPending;

    const additionalPriceLabel = () => (
        deliveryOption && deliveryOption.additionalPrice > 0 ? (
            <span className="font-medium text-lg">
                {formatPrice(deliveryOption.additionalPrice)}
            </span>
        ) : (
            <span className="text-green-600 font-medium text-[15px]">
                Безкоштовно
            </span>
        )
    )

    const handleContinueButtonClick = async () => {
        if (activeStep !== PurchaseSteps.length) {
            switch (activeStep) {
                case PurchaseStepsIDs.DELIVERY: {
                    const storageDeliveryAddress = localStorage.getItem(DELIVERY_ADDRESS_STORAGE_KEY);
                    if (!storageDeliveryAddress) {
                        alert("Упс, пусто... Онови місце отримання замовлення!")
                        return;
                    }
                    const storageDeliveryOption = localStorage.getItem(DELIVERY_OPTION_STORAGE_KEY);
                    if (!storageDeliveryOption) {
                        alert("Упс, щось не так... Обери метод отримання замовлення!")
                        return;
                    }
                    break;
                }
                case PurchaseStepsIDs.PAYMENT: {
                    const storagePaymentSection = localStorage.getItem(PAYMENT_SECTION_STORAGE_KEY);
                    if (!storagePaymentSection) {
                        alert("Упс, щось не так... Обери метод оплати замовлення!")
                        return;
                    }

                    const storagePaymentMethod = localStorage.getItem(PAYMENT_METHOD_STORAGE_KEY);
                    if (!storagePaymentMethod) {
                        alert("Упс, щось не так... Обери метод оплати замовлення!")
                        return;
                    }

                    if (storagePaymentSection === PaymentSections[PaymentSectionIDs.COMPANY].key) {
                        const storageCompanyEdrpouOrIpn = localStorage.getItem(COMPANY_EDRPOU_OR_IPN_STORAGE_KEY);
                        if (!storageCompanyEdrpouOrIpn) {
                            alert("Упс, щось не так... Заповни значення ЄДРПОУ / ІПН!")
                            return;
                        }
                        const isEdrpouOrIpnValid = !ERDPOU_OR_IPN_REGEX || ERDPOU_OR_IPN_REGEX.test(storageCompanyEdrpouOrIpn);
                        if (!isEdrpouOrIpnValid) {
                            alert("Упс, щось не так... Заповни правильним значенням ЄДРПОУ / ІПН!")
                            return;
                        }
                        const storageCompanyEmail = localStorage.getItem(COMPANY_EMAIL_STORAGE_KEY);
                        if (!storageCompanyEmail) {
                            alert("Упс, щось не так... Заповни значення електронної пошти компанії!")
                            return;
                        }
                        const isCompanyEmailValid = !EMAIL_REGEX || EMAIL_REGEX.test(storageCompanyEmail);
                        if (!isCompanyEmailValid) {
                            alert("Упс, щось не так... Заповни правильним значенням електронну пошту компанії!")
                            return;
                        }
                    }

                    break;
                }
            }

            router.push(Routes.CHECKOUT_PURCHASE_STEP(PurchaseSteps[activeStep].linkPart))
        } else {
            const storagePaymentMethodKey = localStorage.getItem(PAYMENT_METHOD_STORAGE_KEY);

            if (!deliveryAddress) {
                alert("Упс, пусто... Онови місце отримання замовлення!")
                return;
            }

            if (!storagePaymentMethodKey) {
                alert("Упс, пусто... Онови метод отримання замовлення!")
                return;
            }

            const createRequestDto = {
                shippingAddress: deliveryAddress,
                paymentMethodKey: storagePaymentMethodKey,
                deliveryOptionKey: deliveryOption?.key
            } as OrderCreateRequestDto;
            console.log("createRequestDto", createRequestDto);

            createOrderMutation.mutate(createRequestDto, {
                onSuccess: async (res) => {
                    if (res?.code !== 201) {
                        throw new Error("Order is not created. Status code is not 201");
                    }

                    const createdOrderId = res?.data?.id ?? 0;

                    try {
                        const results = await Promise.allSettled(
                            cartItems.map((cartItem) =>
                                createOrderItemMutation.mutateAsync({
                                    orderId: createdOrderId,
                                    productId: cartItem.productId,
                                    quantity: cartItem.quantity,
                                })
                            )
                        );

                        const allSuccessful = results.every((r) => r.status === "fulfilled");

                        if (!allSuccessful) {
                            console.warn("Some order items failed to be created", results);
                            alert("Деякі товари не вдалося додати до замовлення. Зверніться в підтримку.");
                        } else {
                            console.log("All order items created successfully");

                            cartItems.forEach((cartItem) => removeFromCart(cartItem.productId, cartItem.quantity));
                            router.push(Routes.ACCOUNT_ORDERS);
                        }
                    } catch (e) {
                        console.error("Error creating order items", e);
                        alert("Помилка під час додавання товарів до замовлення.");
                    }
                },
                onError: (error) => {
                    console.error("Error creating order", error);
                    alert("Error creating order, please check console.");
                },
            });
        }
    }

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
                                            onClick={() => router.push(Routes.CHECKOUT_CART)}
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
                                        {additionalPriceLabel()}
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
                                onClick={handleContinueButtonClick}
                                disabled={isSubmitting && activeStep === PurchaseSteps.length}
                            >
                                {activeStep === PurchaseSteps.length ? "Оформити замовлення" : "Продовжити"}
                            </Button>
                        </div>
                    </div>
                </div>
                {activeStep !== PurchaseSteps.length && (
                    <div className="py-10 flex">
                        <div
                            className="flex items-center gap-x-2 text-sm text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                            onClick={() => router.push(Routes.CHECKOUT_PURCHASE_STEP(PurchaseSteps[activeStep].linkPart))}
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