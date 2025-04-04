﻿import React from "react";
import Image from "next/image";

interface SlidePropsType {
    img: string;
    title: string;
    mainTitle: string;
    price: number;
}

const Slide : React.FC<SlidePropsType> = ({ img, title, mainTitle, price }) => {
    return (
        <div className="outline-none border-none relative">
            <div className="absolute left-[30px] md:left-[70px] max-w-[250px] sm:max-w-[350px] top-[50%]
            -translate-y-[50%] lg:space-y-4 bg-[#ffffffa2] sm:bg-transparent sm:p-0
            rounded-lg sm:rounded-none">
                <h3 className="text-rose-400 text-[24px] lg:text-[28px]">
                    {title}
                </h3>
                <h2 className="text-stone-950 text-[26px] md:text-[30px] lg:text-[44px] font-bold leading-[1.2]">
                    {mainTitle}
                </h2>

                <h3 className="text-[24px]">
                    від {price}.00₴{" "}
                    <del className="text-red-700 font-normal text-[18px]">
                        {price + 5}.00₴
                    </del>
                </h3>

                <div className="bg-rose-400 hover:bg-rose-500 text-white text-[14px] md:text-[16px] p-2 px-4 rounded-lg
                inline-block cursor-pointer">
                    Придбати зараз
                </div>
            </div>

            <Image
                className="w-[100%] h-[300px] md:h-auto rounded-xl object-cover object-right md:object-left-bottom"
                src={img}
                alt="Banner"
                width={2000}
                height={2000}
            />
        </div>
    )
}

export default Slide;