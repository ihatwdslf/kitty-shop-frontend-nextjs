"use client"

import React, {useEffect, useState} from "react";
import {useOrders} from "@/hooks/use-orders";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {AvailableToCancelStatusesIDs, OrderStatuses} from "@/data/static/order-statuses";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import AccountOrderItem from "@/components/AccountOrderItem";
import {useAuth} from "@/context/AuthContext";
import {getDeliveryOptionItemByKey} from "@/data/static/delivery-options";
import {formatPrice} from "@/utils/price";
import {MdDeveloperMode} from "react-icons/md";
import CancelOrderDialog from "@/components/CancelOrderDialog";

export default function OrderTabs() {

    const [activeStatusKey, setActiveStatusKey] = useState(OrderStatuses[0].key);
    const [orderCounts, setOrderCounts] = useState<Record<string, number>>({});
    const {fetchOrdersByStatusKey, fetchOrdersByStatus} = useOrders();

    const {user} = useAuth();

    const {
        data: ordersData,
        isLoading,
        error,
    } = fetchOrdersByStatusKey(activeStatusKey);

    const handleTabChange = (value: string) => {
        const index = parseInt(value.replace("tab-", ""));
        const status = OrderStatuses[index - 1];
        if (status) setActiveStatusKey(status.key);
    };

    useEffect(() => {
        const fetchCounts = async () => {
            const counts: Record<string, number> = {};
            await Promise.all(
                OrderStatuses.map(async (status) => {
                    const response = await fetchOrdersByStatus(status.key);
                    counts[status.key ?? "null"] = response.data?.list?.length || 0;
                })
            );
            setOrderCounts(counts);
        };

        fetchCounts();
    }, []);

    const orders = ordersData?.data?.list ?? [];
    console.log(orders)

    return (
        <Tabs defaultValue="tab-1" onValueChange={handleTabChange}>
            <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
                {OrderStatuses.map((orderStatus, index) => (
                    <TabsTrigger
                        key={orderStatus.id}
                        value={`tab-${index + 1}`}
                        className="cursor-pointer data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                        {orderStatus.name} ({orderCounts[orderStatus.key ?? "null"] ?? 0})
                    </TabsTrigger>
                ))}
            </TabsList>

            {OrderStatuses.map((orderStatus, index) => (
                <TabsContent key={orderStatus.id} value={`tab-${index + 1}`}>
                    <div className="p-4">
                        {isLoading && <p className="text-center">Завантаження...</p>}
                        {error && <p className="text-red-500 text-center">Помилка при завантаженні замовлень</p>}
                        {!isLoading && !error && orders.length === 0 && (
                            <p className="text-muted-foreground text-center text-xs">
                                Немає замовлень зі статусом &#34;{orderStatus.name}&#34;
                            </p>
                        )}
                        {!isLoading && !error && orders.length > 0 && (
                            <Accordion type="multiple" className="w-full space-y-2 -space-y-px">
                                {orders.map((order) => {

                                    const deliveryOption = getDeliveryOptionItemByKey(order?.deliveryOptionKey);

                                    const additionalPriceLabel = () => (
                                        deliveryOption && deliveryOption.additionalPrice > 0 ? (
                                            <span className="font-medium text-[13px]">
                                                {formatPrice(deliveryOption.additionalPrice)}
                                            </span>
                                        ) : (
                                            <span className="text-green-600 font-medium text-[13px]">
                                                Безкоштовно
                                            </span>
                                        )
                                    )

                                    return (
                                        <AccordionItem value={"order_accordion_item_" + order.id} key={order.id}
                                                       className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]">
                                            <AccordionTrigger
                                                className="cursor-pointer p-4 text-[13px] leading-6 hover:no-underline focus-visible:ring-0"
                                            >
                                                <div
                                                    className="flex flex-col sm:flex-row sm:items-center justify-start gap-x-15">
                                                    <span className="font-normal">№ {order.id}</span>
                                                    <span
                                                        className="text-muted-foreground font-thin"
                                                    >
                                                    {new Date(order.orderDate).toLocaleDateString()}
                                                </span>
                                                    <span className="text-xs font-normal">{order.status.name}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground space-y-6">
                                                <div>
                                                    {order.orderItems?.map(orderItem => {
                                                            return <AccountOrderItem
                                                                key={`order_${order?.id}_item_${orderItem?.productId}`}
                                                                cartItem={{
                                                                    productId: orderItem?.productId,
                                                                    quantity: orderItem?.quantity
                                                                }}
                                                            />
                                                        }
                                                    )}
                                                </div>
                                                <div className="text-black border-b-1 pb-6">
                                                    <div className="space-y-3 pl-1">
                                                        <div className="text-sm">
                                                            Доставка
                                                        </div>
                                                        <div
                                                            className="flex flex-cols items-center gap-x-10 text-xs font-thin"
                                                        >
                                                            <div className="text-muted-foreground w-[11rem]">
                                                                Запланована дата видачі
                                                            </div>
                                                            <div
                                                                className="flex flex-cols items-center gap-x-2 text-xs font-thin">
                                                                {deliveryOption?.deliveryAvailable}
                                                                <div
                                                                    className="px-1 py-0.5 rounded-sm bg-amber-100 text-[10px] text-muted-foreground font-thin">
                                                                    очікуйте сповіщення про прибуття
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="flex flex-cols items-center gap-x-10 text-xs font-thin"
                                                        >
                                                            <div className="text-muted-foreground w-[11rem]">
                                                                Вид доставки
                                                            </div>
                                                            <div>
                                                                {deliveryOption?.label}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="flex flex-cols items-center gap-x-10 text-xs font-thin"
                                                        >
                                                            <div className="text-muted-foreground w-[11rem]">
                                                                Адреса доставки
                                                            </div>
                                                            <div>
                                                                {order?.shippingAddress}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="flex flex-cols items-center gap-x-10 text-xs font-thin"
                                                        >
                                                            <div className="text-muted-foreground w-[11rem]">
                                                                Отримувач
                                                            </div>
                                                            <div className="flex flex-cols items-center gap-x-5">
                                                                <div>
                                                                    {user?.data?.firstName ?? "Невідомо"}
                                                                    {" "}
                                                                    {user?.data?.lastName ?? "Невідомо"}
                                                                </div>
                                                                <div className="font-medium">
                                                                    {user?.data?.phone ?? "Номер не вказано"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-black border-b-1 pb-6">
                                                    <div className="space-y-3 pl-1">
                                                        <div className="text-sm">
                                                            Оплата
                                                        </div>
                                                        <div
                                                            className="flex flex-cols items-center gap-x-10 text-xs font-thin"
                                                        >
                                                            <div className="text-muted-foreground w-[11rem]">
                                                                Спосіб оплати
                                                            </div>
                                                            <div
                                                                className="flex flex-cols items-center gap-x-2 text-xs font-thin"
                                                            >
                                                                {order?.paymentMethod.name}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="flex flex-cols items-center gap-x-10 text-xs font-thin"
                                                        >
                                                            <div className="text-muted-foreground w-[11rem]">
                                                                Доставка
                                                            </div>
                                                            <div
                                                                className="flex flex-cols items-center gap-x-2 text-xs font-thin"
                                                            >
                                                                {additionalPriceLabel()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-black">
                                                    <div
                                                        className="space-y-3 pl-1 flex flex-cols items-center justify-between"
                                                    >
                                                        {AvailableToCancelStatusesIDs.includes(order?.status.id) ?
                                                            <CancelOrderDialog orderId={order?.id}/> : <div></div>
                                                        }
                                                        <div
                                                            className="flex items-center gap-x-2 text-sm text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                                                            onClick={() => {
                                                            }}
                                                        >
                                                            <MdDeveloperMode size={20}/>
                                                            Інструменти розробника
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        )}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
}
