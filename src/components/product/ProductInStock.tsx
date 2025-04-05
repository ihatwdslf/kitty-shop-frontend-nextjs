import React from "react";
import {FaCircleCheck} from "react-icons/fa6";

interface ProductInStockProps {
    inStockCount: number;
}

const ProductInStock: React.FC<ProductInStockProps> = ({inStockCount}) => {
    return (
        <div className="pt-5 inline-block">
            <div
                className="flex py-1 px-1.5 rounded-sm items-center text-[14px] font-thin bg-[#edf8ea]"
            >
                <div>
                    <FaCircleCheck className="text-green-600"/>
                </div>
                <span className="pl-2 text-green-600">
                    В наявності: {inStockCount} шт.
                </span>
            </div>
        </div>
    )
}

export default ProductInStock;