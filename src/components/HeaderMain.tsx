"use client"

import Link from "next/link";
import SearchWithLoadingInput from "@/components/SearchWithLoadingInput";
import CatalogButton from "@/components/CatalogButton";
import ShoppingCardButton from "@/components/ShoppingCardButton";
import LoginDialog from "@/components/LoginDialog";
import {useAuth} from "@/context/AuthContext";

const HeaderMain = () => {

    const { authorized, user } = useAuth();

    return (
        <div className="border-b border-gray-200 py-6">
            <div className="container sm:flex justify-between items-center">
                <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-stone-950 ">
                    <Link href="/" className="logo__link relative">
                        KITTYSHOP
                    </Link>
                </div>

                <div className="flex gap-2 md:w-[100%] pl-[6%]">
                    <CatalogButton />

                    <div className="w-full sm:w-[300px] md:w-[80%] relative">
                        <SearchWithLoadingInput />
                    </div>
                </div>


                <div className="hidden lg:flex gap-4 text-gray-500">
                    {!authorized ? <LoginDialog /> : (
                        <div className="text-sm">{user?.firstName} {user?.lastName}</div>
                    )}
                    <ShoppingCardButton />
                </div>
            </div>
        </div>
    )
}

export default HeaderMain;