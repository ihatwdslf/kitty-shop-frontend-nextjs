"use client"

import React from "react";
import {useBrands} from "@/hooks/use-brands";
import AdminDialogs from "@/components/admin/AdminDialogs";
import EditAdminBrandDialog from "@/components/admin/brands/EditAdminBrandDialog";
import DeleteAdminBrandDialog from "@/components/admin/brands/DeleteAdminBrandDialog";

const AdminBrandsPage = () => {

    const {brands} = useBrands();

    return (
        <div className="w-full h-full p-10 overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="text-md">
                    Керування брендами
                </div>
                <AdminDialogs/>
            </div>
            <div className="pt-5 w-full space-y-2 -space-y-px">
                {brands?.data?.list.map((brand) => {

                    return (
                        <div
                            key={brand.id}
                            className="bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50
                                relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md
                                last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]"
                        >
                            <div
                                className="p-4 text-[13px] leading-6 hover:no-underline focus-visible:ring-0"
                            >
                                <div
                                    className="flex flex-col sm:flex-row sm:items-center justify-between"
                                >
                                    <div className="flex items-center gap-x-15">
                                        <span className="font-normal">№ {brand.id}</span>
                                        <span className="text-xs font-normal">{brand.name}</span>
                                    </div>
                                    <a
                                        onClick={() => alert(`Mock redirect to ${brand.website}`)}
                                        className="cursor-pointer underline text-xs font-normal"
                                    >
                                        {brand.website}
                                    </a>
                                    <div>
                                        <EditAdminBrandDialog brandId={brand.id}/>
                                        <DeleteAdminBrandDialog brandId={brand.id}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
        ;
};

export default AdminBrandsPage;