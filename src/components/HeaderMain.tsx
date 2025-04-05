"use client"

import Link from "next/link";
import SearchWithLoadingInput from "@/components/SearchWithLoadingInput";
import CatalogButton from "@/components/CatalogButton";
import ShoppingCardButton from "@/components/ShoppingCardButton";
import LoginDialog from "@/components/LoginDialog";
import {useAuth} from "@/context/AuthContext";
import UserAvatar from "@/components/UserAvatar";

const HeaderMain = () => {

    const {authorized, user} = useAuth();

    return (
        <div className="border-b border-gray-200 py-6">
            <div className="container sm:flex justify-between items-center">
                <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-stone-950 ">
                    <Link href="/" className="logo__link relative">
                        KITTYSHOP
                    </Link>
                </div>

                <div className="flex gap-2 md:w-full pl-[6%]">
                    <CatalogButton/>

                    <div className="w-full sm:w-[300px] md:w-full relative">
                        <SearchWithLoadingInput/>
                    </div>
                </div>

                <div className="hidden cursor-pointer lg:flex gap-4 text-gray-500 w-1/2 justify-end">
                    {!authorized ? <LoginDialog/> : (
                        <Link
                            href={`/account`}
                        >
                            <div className="text-sm flex justify-between items-center gap-1 pr-2 rounded-lg
                                transition duration-300 ease-in-out hover:bg-stone-100 hover:scale-105 group">
                                <UserAvatar/>
                                <span>{user?.data?.firstName} {user?.data?.lastName}</span>
                            </div>
                        </Link>
                    )}
                    <ShoppingCardButton/>
                </div>
            </div>
        </div>
    )
}

export default HeaderMain;