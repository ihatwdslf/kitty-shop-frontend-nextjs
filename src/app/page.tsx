import Hero from "@/components/Hero";
import NewProducts from "@/components/NewProducts";
import Testimonial from "@/components/Testimonial";
import React from "react";

export default function Home() {
    return (
        <main>
            <Hero/>
            {/*<BlackFridayBanner/>*/}
            <NewProducts/>
            <Testimonial/>
        </main>
    );
}
