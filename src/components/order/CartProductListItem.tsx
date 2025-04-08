import React, {useEffect} from "react";
import {CART_ITEMS_UPDATED_EVENT, CartItem, removeFromCart} from "@/utils/cart-storage";
import {useProducts} from "@/hooks/use-products";
import Image from "next/image";
import CartItemAddOrRemove from "@/components/CartItemAddOrRemove";
import ProductPriceWithPossibleDiscount from "@/components/product/ProductPriceWithPossibleDiscount";
import {Product} from "@/data/response/product/Product";
import {useCartProductCount} from "@/hooks/use-cart-count";
import {FaRegTrashAlt} from "react-icons/fa";
import {FaCheck} from "react-icons/fa6";

interface CartProductListItemProps {
    cartItem: CartItem;
}

const CartProductListItem: React.FC<CartProductListItemProps> = ({cartItem}) => {

    const NOT_FOUND_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

    const {fetchProduct} = useProducts(); // Get the fetchProduct function from the hook

    // Fetch the product data using the ID
    const {data: productData} = fetchProduct(!!cartItem ? cartItem?.productId?.toString() : "0"); // Cast id to string

    useEffect(() => {
        window.dispatchEvent(new Event(CART_ITEMS_UPDATED_EVENT));
    }, []);

    const product: Product | undefined = productData?.data;

    const itemsCount = useCartProductCount(product?.id)

    const handleRemoveFromCartItem = () => {
        removeFromCart(product?.id ?? 0, itemsCount);
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex flex-cols gap-x-5">
                    <div className="flex items-center justify-center h-[7rem] min-w-[7rem]">
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
                    <div className="text-sm">
                        <div className="text-xs font-light text-[#43b02a] flex gap-x-2">
                            <FaCheck size={16}/>
                            Можна забрати сьогодні
                        </div>
                        <div className="pt-2">
                            {product?.name}
                        </div>
                        <div className="pt-2 text-[10px] font-thin text-muted-foreground">
                            Код товара: {product?.stockKeepingUnit} ({product?.id})
                        </div>
                        <div className="pt-3 flex">
                            <div
                                className="px-3 py-2 text-[13px] font-light flex flex-cols gap-x-2 items-center
                                    cursor-pointer hover:bg-gray-100 rounded-md"
                                onClick={handleRemoveFromCartItem}
                            >
                                <FaRegTrashAlt/>
                                Видалити
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <ProductPriceWithPossibleDiscount
                            quantity={product?.stockQuantity ?? 0}
                            price={product?.price ?? 0}
                            discount={product?.discount ?? 0}
                            count={itemsCount}
                        />
                    </div>
                    <div className="pt-5 items-end">
                        <CartItemAddOrRemove productId={product?.id}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartProductListItem;