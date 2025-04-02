"use client";

import "./globals.css";
import React from "react";

import localFont from "next/font/local";
import HeaderMain from "@/components/HeaderMain";
import Navbar from "@/components/Navbar";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer";
import HeaderTop from "@/components/HeaderTop";
import {AuthProvider} from "@/context/AuthContext";
import PreLoader from "@/components/PreLoader";
import {LoadingProvider, useLoading} from "@/context/LoadingContext";

const eUkraineFont = localFont({
    src: [
        {
            path: "../assets/fonts/e-Ukraine-Regular.otf",
            weight: "400",
            style: "normal"
        }
    ]
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    // Wrap the components with the necessary providers
    return (
        <html lang="en">
            <body className={eUkraineFont.className}>
                <LoadingProvider>
                    <AuthProvider>
                        <MainLayout>{children}</MainLayout>
                    </AuthProvider>
                </LoadingProvider>
            </body>
        </html>
    );
}

// Main Layout component that handles the loading and the authentication context
const MainLayout = ({children}: { children: React.ReactNode }) => {
    const { loading } = useLoading();

    // Show the PreLoader component when loading, otherwise show the page content
    if (loading) {
        return <PreLoader/>;
    }

    return (
        <>
            <HeaderTop/>
            <HeaderMain/>
            <Navbar/>
            <MobileNavbar/>
            {children}
            <Footer/>
        </>
    );

    // return (<PreLoader/>)
};
