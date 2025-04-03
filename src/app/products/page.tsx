"use client"

import ProductListFilter from "@/components/product/ProductListFilter";

const ProductsPage = () => {

    return (
        <div className="bg-stone-100">
            <div className="py-10 px-20">
                <div className="grid grid-cols-8 gap-10">
                    <div className="col-span-2 bg-white rounded-lg">
                        <ProductListFilter/>
                    </div>
                    <div className="col-span-6 bg-white rounded-lg">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;