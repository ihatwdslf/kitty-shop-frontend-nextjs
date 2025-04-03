"use client"

import React from "react";
import PreLoader from "@/components/PreLoader";
import {useLoading} from "@/context/LoadingContext";
import {CategoryProvider} from "@/context/CategoryContext";

const ProductsLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {

    const {loading} = useLoading();

    // Show the PreLoader component when loading, otherwise show the page content
    if (loading) {
        return <PreLoader/>;
    }

    return (
        <>
            <CategoryProvider>
                {children}
            </CategoryProvider>
        </>
    );

    // return (<PreLoader/>)
};

export default ProductsLayout;