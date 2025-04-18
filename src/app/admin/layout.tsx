"use client"

import React from "react";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {Routes} from "@/data/static/routes";
import AdminLayoutSidebar from "@/components/admin/AdminLayoutSidebar";

const AdminPageLayout = ({
                             children,
                         }: Readonly<{ children: React.ReactNode }>) => {
    const router = useRouter();
    const {authorized} = useAuth();

    if (!authorized) {
        router.push(Routes.HOME)
    }

    return (
        authorized ? (
            <main className="bg-stone-100">
                <div className="container grid grid-cols-8 gap-2">
                    <AdminLayoutSidebar/>
                    <div className="bg-white col-span-6">
                        {children}
                    </div>
                </div>
            </main>
        ) : null
    )
}

export default AdminPageLayout;