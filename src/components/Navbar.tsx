"use client"

import Link from "next/link";
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import {buildNavbarItemId, isNavbarItemActive} from "@/utils/navbar";
import {BsFire} from "react-icons/bs";
import {useLoading} from "@/context/LoadingContext";

const Navbar = () => {

    const {loading, showLoading, hideLoading} = useLoading();

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

    const pathname = usePathname();

    return (
        <div className="hidden lg:block">
            <div className="container">
                <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-stone-950">
                    <Link
                        id={buildNavbarItemId("home-page")}
                        href={`/`}
                        key={`home-page`}
                        className={clsx(
                            "navigation_accent__link relative uppercase",
                            {"active": isNavbarItemActive(pathname, `/`)}
                        )}
                    >
                        Головна
                    </Link>
                    <Link
                        id={buildNavbarItemId("catalog")}
                        href={`/products`}
                        key={`products-page`}
                        className={clsx(
                            "navigation_accent__link relative uppercase",
                            {"active": isNavbarItemActive(pathname, `/products`)}
                        )}
                    >
                        Каталог
                    </Link>
                    {/*{categories?.list.map((item) => (*/}
                    {/*    <Link*/}
                    {/*        id={buildNavbarItemId(item.key.toString())}*/}
                    {/*        href={`/products&categoryKeys=${item.key}`}*/}
                    {/*        key={`${item.key}-page`}*/}
                    {/*        className={clsx(*/}
                    {/*            "navigation_accent__link relative uppercase"*/}
                    {/*        )}*/}
                    {/*    >*/}
                    {/*        {item.name}*/}
                    {/*    </Link>*/}
                    {/*))}*/}
                    <Link
                        id={buildNavbarItemId("hot-offers")}
                        href={`/products&hot-offers=true`}
                        key={`hot-offers-page`}
                        className={clsx(
                            "navigation_accent__link relative uppercase",
                            {"active": isNavbarItemActive(pathname, `/products`)}
                        )}
                    >
                        <BsFire className="inline-block mb-1"/>
                        Гарячі пропозиції
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;