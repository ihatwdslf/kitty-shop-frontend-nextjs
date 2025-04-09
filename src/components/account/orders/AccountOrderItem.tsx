import {CartItem} from "@/utils/cart-storage";
import React from "react";
import {useProducts} from "@/hooks/use-products";
import {Product} from "@/data/response/product/Product";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Routes} from "@/data/static/routes";
import AccountOrderItemProductPriceWithPossibleDiscount
    from "@/components/account/orders/AccountOrderItemProductPriceWithPossibleDiscount";

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
                onClick={() => router.push(product?.id ? Routes.PRODUCT_DETAILS(product?.id) : Routes.PRODUCTS)}
                className="flex flex-cols items-center gap-x-3 cursor-pointer p-4 border-b-1"
            >
                <div className="flex flex-cols h-[4rem] w-[4rem] items-center justify-center">
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
                <div className="text-[13px] font-thin flex flex-cols items-center w-full justify-between">
                    <div className="text-black">
                        {product?.name}
                    </div>
                    <div className="flex flex-cols gap-x-10 items-center">
                        <span>
                            {cartItem?.quantity} шт.
                        </span>
                        <AccountOrderItemProductPriceWithPossibleDiscount
                            quantity={cartItem?.quantity}
                            price={product?.price ?? 0}
                            discount={product?.discount ?? 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemPurchase;