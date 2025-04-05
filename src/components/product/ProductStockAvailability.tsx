import ProductInStock from "@/components/product/ProductInStock";
import ProductOutOfStock from "@/components/product/ProductOutOfStock";
import React from "react";

interface ProductStockAvailabilityProps {
    quantity: number;
}

const ProductStockAvailability: React.FC<ProductStockAvailabilityProps> = ({ quantity }) => {
    return (
        <div>
            <div className="pl-4">
                {quantity > 0 ? <ProductInStock inStockCount={quantity}/> : <ProductOutOfStock/>}
            </div>
        </div>
    );
};

export default ProductStockAvailability;