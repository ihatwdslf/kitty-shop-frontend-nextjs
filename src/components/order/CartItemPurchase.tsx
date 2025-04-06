import {CartItem} from "@/utils/cartStorage";
import React from "react";
import {useProducts} from "@/hooks/useProducts";
import {Product} from "@/data/response/product/Product";
import Image from "next/image";
import {formatPrice} from "@/utils/price";
import {useRouter} from "next/navigation";

interface CartItemPurchaseProps {
    cartItem: CartItem;
}

const CartItemPurchase: React.FC<CartItemPurchaseProps> = ({cartItem}) => {

    const NOT_FOUND_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

    const router = useRouter();
    const {fetchProduct} = useProducts(); // Get the fetchProduct function from the hook
    const {data: productData} = fetchProduct(!!cartItem ? cartItem?.productId?.toString() : "0");
    const product: Product | undefined = productData?.data;

    return (
        <div className="pr-7">
            <div
                onClick={() => router.push(`/products/${product?.id}`)}
                className="flex flex-cols items-center gap-x-3 cursor-pointer"
            >
                <div className="h-[4rem]">
                    <Image
                        src={product?.imageUrl ? product?.imageUrl : NOT_FOUND_IMAGE_URL}
                        alt={"image_" + product?.imageUrl}
                        width={0}
                        height={0}
                        sizes="100vh"
                        quality={100}
                        style={{width: 'auto', height: '100%'}}
                        className="overflow-hidden"
                    />
                </div>
                <div className="text-[13px] font-thin">
                    {formatPrice((product?.price ?? 0) * (1.0 - (product?.discount ?? 0) / 100 ))}
                    <div className="text-[9px] text-muted-foreground">
                        x {cartItem?.quantity} од.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemPurchase;