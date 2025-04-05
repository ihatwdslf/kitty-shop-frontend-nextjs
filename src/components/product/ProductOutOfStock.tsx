import React from "react";
import {FaCircleXmark} from "react-icons/fa6";

const ProductOutOfStock = () => {
    return (
        <div className="pt-5 inline-block">
            <div
                className="flex py-1 px-1.5 rounded-sm items-center text-[14px] font-thin bg-red-50">
                <div>
                    <FaCircleXmark className="text-red-600"/>
                </div>
                <span className="pl-2 text-red-600">
                    Немає в наявності
                </span>
            </div>
        </div>
    )
}

export default ProductOutOfStock;