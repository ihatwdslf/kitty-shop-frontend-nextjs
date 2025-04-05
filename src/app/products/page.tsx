"use client"

import ProductListFilter from "@/components/product/ProductListFilter";
import ProductsListSearchResultItems from "@/components/product/ProductsListSearchResultItems";

const ProductsPage = () => {

    return (
        <div className="bg-stone-100">
            <div className="py-10 px-20">
                <div className="grid grid-cols-8 gap-10">
                    <div className="col-span-2 bg-white rounded-lg">
                        <ProductListFilter/>
                    </div>
                    <div className="col-span-6 bg-white rounded-lg">
                        <ProductsListSearchResultItems />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;