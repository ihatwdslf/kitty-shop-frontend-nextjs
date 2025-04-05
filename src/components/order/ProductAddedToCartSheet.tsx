import React, {RefObject, useCallback, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle} from "../ui/sheet";
import {useAuth} from "@/context/AuthContext";
import {CART_ITEMS_UPDATED_EVENT, getCartItemByProductId} from "@/utils/cartStorage";
import SheetOrderItem from "@/components/order/SheetOrderItem";

interface OrderSheetProps {
    productId: number;
    triggerRef: RefObject<HTMLElement> | RefObject<HTMLDivElement | HTMLButtonElement | null>;
}

const ProductAddedToCartSheet: React.FC<OrderSheetProps> = ({productId, triggerRef}) => {

    const {authorized} = useAuth()
    const [open, setOpen] = useState(false)

    const handleOpenChange = useCallback((isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) {
            getCartItemByProductId(productId);
        }
    }, []);

    const handleTriggerClick = useCallback(() => {
        handleOpenChange(true);
    }, [handleOpenChange]);

    useEffect(() => {
        const triggerElement = triggerRef.current;
        if (triggerElement) {
            triggerElement.addEventListener('click', handleTriggerClick);
        }

        return () => {
            if (triggerElement) {
                triggerElement.removeEventListener('click', handleTriggerClick);
            }
        };
    }, [triggerRef, handleTriggerClick]);

    // ♻️ Підписка на зміни в localStorage (опціонально, якщо товари змінюються з інших частин UI)
    useEffect(() => {
        const updateFromStorage = () => {
            getCartItemByProductId(productId);
        };

        window.addEventListener(CART_ITEMS_UPDATED_EVENT, updateFromStorage);
        return () => window.removeEventListener(CART_ITEMS_UPDATED_EVENT, updateFromStorage);
    }, []);

    return authorized ? (
        <Sheet
            open={open}
            onOpenChange={() => setOpen(!open)}
        >
            <SheetContent className="px-10 py-5 w-[42rem]">
                <SheetHeader className="pl-0">
                    <SheetTitle>Товар додано до кошика</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <SheetOrderItem productId={productId}/>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <SheetClose asChild>
                            <Button
                                type="submit"
                                variant="outline"
                                className="cursor-pointer text-[12px] font-thin"
                            >
                                Продовжити покупки
                            </Button>
                        </SheetClose>
                    </div>
                    <div className="flex flex-cols gap-x-2">
                        <Button
                            type="submit"
                            variant="default"
                            className="bg-rose-400 hover:bg-rose-500 cursor-pointer text-[12px]"
                        >
                            Перейти до кошику
                        </Button>
                        <Button
                            type="submit"
                            variant="outline"
                            className="cursor-pointer text-[12px] font-thin"
                        >
                            Оформити замовлення
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    ) : null;
};

export default ProductAddedToCartSheet;