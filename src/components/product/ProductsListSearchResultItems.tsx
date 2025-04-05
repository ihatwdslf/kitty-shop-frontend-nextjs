import {useProducts} from "@/hooks/useProducts";
import React, {useMemo} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {LiaShoppingCartSolid} from "react-icons/lia";
import PromotionBadge from "@/components/PromotionBadge";
import Image from "next/image";
import {formatPrice} from "@/utils/price";

const ProductsListSearchResultItems = () => {

    const NOT_FOUND_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";

    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryKeysParam = searchParams.get("categoryKeys");

    const categoryKeys = useMemo(() => {
        return categoryKeysParam ? categoryKeysParam.split(",") : [];
    }, [categoryKeysParam]);

    const {products} = useProducts(categoryKeys);

    console.log(products)

    return (
        <div className="p-7">
            <h2>Результати пошуку</h2>
            <ul className="flex grid grid-cols-4 gap-4">
                {products?.data?.list.length && products?.data?.list.length > 0
                    ? products?.data?.list?.map((product) => {
                            return (
                                <li
                                    key={product.id}
                                    className="font-light text-sm pt-2"
                                >
                                    <div
                                        className="border border-gray-200 p-4 h-full flex flex-col relative
                                            items-center justify-between cursor-pointer navigation_accent__link"
                                        onClick={() => router.push(`/products/${product.id}`)}
                                    >
                                        <div>
                                                <Image
                                                    src={product.imageUrl ? product.imageUrl : NOT_FOUND_IMAGE_URL}
                                                    alt={"image_" + product.imageUrl}
                                                    width={270}
                                                    height={300}
                                                    quality={100}
                                                    className="overflow-hidden
                                                    min-w-full min-h-[300px]
                                                    max-w-full max-h-[300px]"
                                                />
                                        </div>
                                        <div className="pt-3 flex flex-col flex-grow">
                                            <div>
                                                {product.name}
                                            </div>
                                            <div className="pt-2 text-xs text-muted-foreground">
                                                {product.description}
                                            </div>
                                            <div className="mt-auto pt-6 flex items-center justify-between">
                                                <div>
                                                    {product.discount > 0 && (
                                                        <div className="text-xs">
                                                            <del className="text-stone-500 text-normal">
                                                                {formatPrice(product.price)}
                                                            </del>
                                                            <PromotionBadge percentage={product.discount}/>
                                                        </div>
                                                    )}
                                                    <div className="text-xl">
                                                        {formatPrice(product.price * (1.0 - product.discount / 100 ))}
                                                    </div>
                                                </div>
                                                <div className="cursor-pointer bg-rose-400 rounded-md text-white">
                                                    <LiaShoppingCartSolid className="m-1" size={28}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    ) : (
                        <div
                            className="pt-[8%] pl-[35%] flex items-center justify-content-center"
                        >
                        <span
                            className="text-sm font-light text-muted-foreground"
                        >
                            Не знайдено товарів за заданими фільтрами.
                        </span>
                        </div>
                    )
                }
            </ul>
        </div>
    )
}

export default ProductsListSearchResultItems;
