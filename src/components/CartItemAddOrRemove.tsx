"use client";

import {Button} from "@/components/ui/button"
import {useCartProductCount} from "@/hooks/use-cart-count";
import {FiMinus, FiPlus} from "react-icons/fi";
import {addToCart, removeFromCart} from "@/utils/cart-storage";

interface CartItemAddOrRemove {
    productId: number | undefined;
}

export default function CartItemAddOrRemove({productId}: CartItemAddOrRemove) {

    if (!productId) {
        return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cartItemsCount = useCartProductCount(productId)

    const handleAdd = () => {
        addToCart(productId, 1);
    };

    const handleRemove = () => {
        removeFromCart(productId, 1);
    };

    return (
        <div className="inline-flex -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
            <Button
                className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 cursor-pointer"
                variant="outline"
                size="icon"
                onClick={handleRemove}
                disabled={cartItemsCount <= 1}
            >
                <FiMinus size={16} aria-hidden="true"/>
            </Button>
            <span className="border-input flex items-center border px-5 text-sm font-medium">
                {cartItemsCount}
            </span>
            <Button
                className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 cursor-pointer"
                variant="outline"
                size="icon"
                onClick={handleAdd}
            >
                <FiPlus size={16} aria-hidden="true"/>
            </Button>
        </div>
    )
}
