"use client"

import Image from "next/image";
import React from "react";

const PossiblePaymentServicesBanner = () => {
    return (
        <div className="flex flex-cols gap-x-3 items-center py-3">
            <div
                className="bg-rose-50 py-1 px-3 rounded-lg flex items-center justify-center">
                <Image
                    src="https://cdn.comfy.ua/media/media/icons/apple-pay.svg"
                    alt="image"
                    width={38}
                    height={16}
                    className="max-w-[38px] max-h-[16px]"
                />
            </div>
            <div
                className="bg-rose-50 py-1 px-3 rounded-lg flex items-center justify-center">
                <Image
                    src="https://cdn.comfy.ua/media/media/icons/google-pay.svg"
                    alt="image"
                    width={38}
                    height={16}
                    className="max-w-[38px] max-h-[16px]"
                />
            </div>
            <div
                className="bg-rose-50 py-1 px-3 rounded-lg flex items-center justify-center">
                <Image
                    src="https://cdn.comfy.ua/media/media/icons/private-pay.svg"
                    alt="image"
                    width={38}
                    height={16}
                    className="max-w-[38px] max-h-[16px]"
                />
            </div>
            <div
                className="bg-rose-50 py-1 px-3 rounded-lg flex items-center justify-center">
                <Image
                    src="https://cdn.comfy.ua/media/media/icons/mastercard.svg"
                    alt="image"
                    width={38}
                    height={16}
                    className="max-w-[38px] max-h-[16px]"
                />
            </div>
            <div
                className="bg-rose-50 py-1 px-3 rounded-lg flex items-center justify-center">
                <Image
                    src="https://cdn.comfy.ua/media/media/icons/visa.svg"
                    alt="image"
                    width={38}
                    height={16}
                    className="max-w-[38px] max-h-[16px]"
                />
            </div>
        </div>
    );
};

export default PossiblePaymentServicesBanner;