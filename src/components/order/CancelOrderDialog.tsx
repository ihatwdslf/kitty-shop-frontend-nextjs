import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {IoClose} from "react-icons/io5";
import React from "react";
import {useOrders} from "@/hooks/use-orders";
import {OrderUpdateRequestDto} from "@/data/request/order/OrderUpdateRequestDto";
import {OrderStatuses, OrderStatusesIDs} from "@/data/static/order-statuses";
import KuromiLogo from "@/components/common/KuromiLogo";

interface CancelOrderDialogProps {
    orderId: number;
}

export default function CancelOrderDialog({orderId}: CancelOrderDialogProps) {

    const {updateOrderMutation} = useOrders();

    const handleCancelOrderButtonClick = () => {
        const updateRequestDto = {
            statusKey: OrderStatuses[OrderStatusesIDs.CANCELLED].key
        } as OrderUpdateRequestDto;

        updateOrderMutation.mutate({
            id: orderId,
            order: updateRequestDto,
        }, {
            onSuccess: () => {
                window.location.reload(); // Перезавантажуємо сторінку
            },
            onError: (error) => {
                console.error("Error updating order", error);
                alert("Помилка оновлення статусу замовлення, будь ласка, перегляньте консоль.");
            },
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div
                    className="flex items-center gap-x-2 text-sm text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                    onClick={() => {
                    }}
                >
                    <IoClose size={20}/>
                    Скасувати замовлення
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-200">
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                    <div
                        className="flex pr-2 shrink-0 items-center justify-center"
                        aria-hidden="true"
                    >
                        <KuromiLogo size={40}/>
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle
                            className="text-lg font-medium"
                        >
                            Ох... Ви точно впевнені?
                        </AlertDialogTitle>
                        <AlertDialogDescription
                            className="text-sm font-light"
                        >
                            Натискаючи на &#34;Скасувати&#34;, ви повністю скасуєте замовлення.<br/>
                            Воно не буде відправлено та вся обробка буде зупинена!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="cursor-pointer"
                    >
                        Ні, я передумав(-ла)
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-rose-400 hover:bg-rose-500 rounded-md cursor-pointer"
                        onClick={handleCancelOrderButtonClick}
                    >
                        Так, скасувати
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
