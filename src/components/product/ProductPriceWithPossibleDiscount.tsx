import {formatPrice} from "@/utils/price";
import PromotionBadge from "@/components/PromotionBadge";
import {cn} from "@/utils/class-value";
import React from "react";

interface ProductPriceWithPossibleDiscountProps {
    quantity: number;
    price: number;
    discount: number;
    count?: number;
}

const ProductPriceWithPossibleDiscount: React.FC<ProductPriceWithPossibleDiscountProps> = ({
                                                                                               quantity,
                                                                                               price,
                                                                                               discount,
                                                                                               count = 1
                                                                                           }) => {
    return (
        <div>
            {quantity > 0 && discount > 0 && (
                <div className="text-xs">
                    <del className="text-stone-500 text-normal">
                        {formatPrice(!!price ? price * count : 0)}
                    </del>
                    <PromotionBadge
                        percentage={!!discount ? discount : 0}/>
                </div>
            )}
            <div
                className={cn(`text-[32px] ${quantity > 0 ? "" : "text-muted-foreground"}`)}>
                {formatPrice(!!price ? (price * (1.0 - discount / 100) * count) : 0)}
            </div>
        </div>
    );
};

export default ProductPriceWithPossibleDiscount;