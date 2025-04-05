"use client"

import React, {useRef} from "react";
import Image from "next/image";
import {cn} from "@/utils/classValue";
import {useParams} from "next/navigation";
import {useProducts} from "@/hooks/useProducts";
import {ApiResponse} from "@/data/response/ApiResponse";

import {Product} from "@/data/response/product/Product";
import ProductPriceWithPossibleDiscount from "@/components/product/ProductPriceWithPossibleDiscount";

import {LiaShoppingCartSolid} from "react-icons/lia";
import NotAuthorizedDynamicToast from "@/components/NotAuthorizedDynamicToast";
import PossiblePaymentServicesBanner from "@/components/PossiblePaymentServicesBanner";
import ProductStockAvailability from "@/components/product/ProductStockAvailability";
import SeeOtherProductsByCategorySequence from "@/components/product/SeeOtherProductsByCategorySequence";
import {CategoryIdentifierAndNameResponseDto} from "@/data/response/category/CategoryIdentifierAndNameResponseDto";
import TurnoverConditions from "@/components/TurnoverСonditions";
import {useAuth} from "@/context/AuthContext";

const ProductPage = () => {

    const NOT_FOUND_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

    const params = useParams(); // Get the product ID from the URL
    const { authorized } = useAuth();
    const {fetchProduct} = useProducts(); // Get the fetchProduct function from the hook

    // Fetch the product data using the ID
    const {data: productData, isLoading, error} = fetchProduct(params.slug as string); // Cast id to string

    const triggerRef = useRef<HTMLDivElement>(null);

    // Handle loading and error states
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching product: {error.message}</div>;
    }

    const product: ApiResponse<Product> | undefined = productData;
    const productStockCountQuantity: number = product?.data?.stockQuantity ?? 0;
    const productPrice: number = product?.data?.price ?? 0;
    const productDiscount: number = product?.data?.discount ?? 0;
    const productCategories: CategoryIdentifierAndNameResponseDto[] = product?.data?.categories ?? [];

    const handlePurchaseButtonClick = () => {
        console.log(authorized)
    }

    return (
        <main className="bg-stone-100">
            <div className="container pt-0">
                <div className="p-1 grid grid-cols-8 flex justify-center gap-1">
                    <div className="col-span-3 bg-white">
                        <Image
                            src={product?.data?.imageUrl ? product?.data?.imageUrl : NOT_FOUND_IMAGE_URL}
                            alt={"image_" + product?.data?.imageUrl}
                            width={470}
                            height={600}
                            quality={100}
                            className="ml-10 overflow-hidden min-w-[470px] min-h-[600px] max-w-[470px] max-h-[600px] py-10"
                        />
                    </div>
                    <div className="col-span-5 bg-white p-10">
                        <div
                            className={cn(`text-[1.5rem] ${productStockCountQuantity > 0 ? "" : "line-through text-muted-foreground"}`)}>
                            {product?.data?.name}
                        </div>
                        <div className="flex items-center justify-between">
                            <ProductStockAvailability quantity={productStockCountQuantity}/>
                            <div className="text-muted-foreground text-[10px] font-thin">
                                Код: {product?.data?.stockKeepingUnit} ({product?.data?.id})
                            </div>
                        </div>
                        <div className="py-5 font-thin text-sm break-all">
                            {product?.data?.description}
                        </div>

                        <div className="py-5 border-t-2 flex flex-rows items-center justify-between">
                            <div className={cn(`${productStockCountQuantity > 0 ? "flex flex-cols" : ""}`)}>
                                <ProductPriceWithPossibleDiscount
                                    quantity={productStockCountQuantity}
                                    price={productPrice}
                                    discount={productDiscount}
                                />
                                <div>
                                    {(productStockCountQuantity > 0) ? (
                                        <div className="pl-10">
                                            <div
                                                className="flex flex-cols items-center justify-center gap-x-1 px-6 py-3
                                                text-white rounded-sm bg-rose-400 hover:bg-rose-500 cursor-pointer"
                                                onClick={handlePurchaseButtonClick}
                                                ref={triggerRef}
                                            >
                                                <LiaShoppingCartSolid size={32}/>
                                                Придбати
                                            </div>
                                            <NotAuthorizedDynamicToast triggerRef={triggerRef}/>
                                        </div>
                                    ) : (
                                        <div className="flex flex-rows items-center justify-center">
                                            <span className="text-muted-foreground text-sm">Товар закінчився</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <TurnoverConditions/>
                        </div>

                        <div className="py-5 border-t-2 text-[11px] text-muted-foreground">
                            <div>
                                <div className="font-light">
                                    Оплачуйте покупку готівкою при отриманні, карткою, перерахунком на банківські
                                    реквізити (безготівково)
                                </div>
                                <PossiblePaymentServicesBanner/>
                            </div>
                            <div className="flex flex-cols items-center py-5">
                                Перегляньте більше продуктів за категоріями:{" "}
                                <SeeOtherProductsByCategorySequence categories={productCategories}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductPage;