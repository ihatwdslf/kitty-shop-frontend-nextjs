import React from "react";
import {getCartItemByProductId} from "@/utils/cart-storage";
import {useProducts} from "@/hooks/use-products";
import Image from "next/image";
import ProductPriceWithPossibleDiscount from "@/components/product/ProductPriceWithPossibleDiscount";
import {useCartProductCount} from "@/hooks/use-cart-count";

interface SheetOrderItemProps {
    productId: number;
}

const SheetOrderItem: React.FC<SheetOrderItemProps> = ({productId}) => {

    const NOT_FOUND_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

    const cartItem = getCartItemByProductId(productId)

    const {fetchProduct} = useProducts();
    const {data: product} = fetchProduct(!!cartItem ? cartItem?.productId?.toString() : "0");

    const productPrice: number = product?.data?.price ?? 0;
    const productDiscount: number = product?.data?.discount ?? 0;
    const productStockCountQuantity: number = product?.data?.stockQuantity ?? 0;

    const itemsCount = useCartProductCount(productId)

    return (
        <div className="flex flex-cols gap-x-10">
            <div className="h-[7rem]">
                <Image
                    src={product?.data?.imageUrl ? product?.data?.imageUrl : NOT_FOUND_IMAGE_URL}
                    alt={"image_" + product?.data?.imageUrl}
                    width={0}
                    height={0}
                    sizes="100vh"
                    quality={100}
                    style={{width: 'auto', height: '100%'}}
                    className="overflow-hidden"
                />
            </div>
            <div className="text-sm font-thin">
                {product?.data?.name}
                <div className="pt-2 text-[10px] text-muted-foreground">
                    Код: {product?.data?.stockKeepingUnit} ({product?.data?.id})
                </div>
            </div>
            <div>
                <ProductPriceWithPossibleDiscount
                    quantity={productStockCountQuantity}
                    price={productPrice}
                    discount={productDiscount}
                    count={itemsCount}
                />
            </div>
        </div>
    );
};

export default SheetOrderItem;