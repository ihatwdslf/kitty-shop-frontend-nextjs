"use client"

import React from "react";
import AccountPageSidebar from "@/components/account/AccountPageSidebar";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {Routes} from "@/data/static/routes";

const AccountPageLayout = ({
                               children,
                           }: Readonly<{ children: React.ReactNode }>) => {
    const router = useRouter();
    const { authorized } = useAuth();

    if (!authorized) {
        router.push(Routes.HOME)
    }

    return (
        authorized ? (<main className="bg-stone-100">
            <div className="container grid grid-cols-8 gap-2">
                <AccountPageSidebar/>
                <div className="bg-white col-span-6">
                    {children}
                </div>
            </div>
        </main>) : null
    )
}

export default AccountPageLayout;