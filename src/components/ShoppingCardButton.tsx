"use client";

import {Button} from "@/components/ui/button"
import {IoCart} from "react-icons/io5";
import {useAuth} from "@/context/AuthContext";

export default function ShoppingCardButton() {

    const { authorized } = useAuth()

    return (
        <Button className="bg-gray-200 hover:bg-gray-300 text-black cursor-pointer gap-1 px-3 relative">
            <IoCart size={32} aria-hidden="true"/>
            Кошик
            {authorized &&
                <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px]
                    text-white grid place-items-center translate-x-1 -translate-y-1">
                    0
                </div>
            }
        </Button>
    )
}
