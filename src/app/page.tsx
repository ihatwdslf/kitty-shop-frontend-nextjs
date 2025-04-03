"use client";

import Hero from "@/components/Hero";
import NewProducts from "@/components/NewProducts";
import Testimonial from "@/components/Testimonial";
import React from "react";
import {useLoading} from "@/context/LoadingContext";

export default function Home() {

    const {showLoading, hideLoading} = useLoading();

    // const [categories, setCategories] = useState<CategoryList | null>();
    //
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             showLoading();
    //             const response = await apiClient.get("/categories", {
    //                 withCredentials: true,
    //             });
    //
    //             console.log(response)
    //
    //             if (response.data?.code === 200) {
    //                 console.log(response?.data?.data)
    //                 setCategories(response.data?.data);
    //             } else {
    //                 console.error(response);
    //                 setCategories(null);
    //                 hideLoading();
    //             }
    //         } catch (err) {
    //             console.error("Categories data fetching failed", err);
    //             setCategories(null)
    //             hideLoading();
    //         }
    //     };
    //
    //     fetchCategories();
    // }, []);
    //
    // useEffect(() => {
    //     if (categories !== null) {
    //         hideLoading();
    //     }
    // }, [categories]); // Logs categories after it updates

    return (
        <main className="bg-stone-100">
            <div className="container gap-2 flex grid grid-cols-8">
                <div className="bg-white rounded-lg col-span-2">
                    {/*<CategoryListSideSection*/}
                    {/*    items={categories?.list}*/}
                    {/*/>*/}
                </div>
                <div className="bg-white rounded-lg col-span-6 items-center justify-center relative">
                    <Hero/>
                </div>
            </div>
            {/*<BlackFridayBanner/>*/}
            <NewProducts/>
            <Testimonial/>
        </main>
    );
}
