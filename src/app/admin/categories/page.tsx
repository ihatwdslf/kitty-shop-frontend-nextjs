"use client"

import React from "react";
import {useCategories} from "@/hooks/use-categories";
import CreateAdminCategoryDialog from "@/components/admin/categories/CreateAdminCategoryDialog";
import EditAdminCategoryDialog from "@/components/admin/categories/EditAdminCategoryDialog";
import DeleteAdminCategoryDialog from "@/components/admin/categories/DeleteAdminCategoryDialog";

const AdminCategoriesPage = () => {

    const {categories} = useCategories();

    return (
        <div className="w-full h-full p-10 overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="text-md">
                    Керування брендами
                </div>
                <CreateAdminCategoryDialog/>
            </div>
            <div className="pt-5 w-full space-y-2 -space-y-px">
                {categories?.data?.list.map((category) => {

                    return (
                        <div
                            key={category.id}
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
                                        <span className="font-normal">№ {category.id}</span>
                                        <span className="text-xs font-normal">{category.name}</span>
                                    </div>
                                    <div>
                                        <EditAdminCategoryDialog categoryId={category.id}/>
                                        <DeleteAdminCategoryDialog categoryId={category.id}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AdminCategoriesPage;