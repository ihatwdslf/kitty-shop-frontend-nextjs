"use client";

import Hero from "@/components/Hero";
import NewProducts from "@/components/NewProducts";
import Testimonial from "@/components/Testimonial";
import React from "react";

export default function Home() {

    return (
        <main>
            <div className="container gap-2">
                <Hero/>
            </div>
            {/*<BlackFridayBanner/>*/}
            <NewProducts/>
            <Testimonial/>
        </main>
    );
}
