"use client"

import Link from "next/link";
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import {buildNavbarItemId, isNavbarItemActive} from "@/utils/navbar";
import {BsFire} from "react-icons/bs";
import {useCategories} from "@/hooks/use-categories";
import {Routes} from "@/data/static/routes";

const PageNavbar = () => {

    const {categories} = useCategories();

    const pathname = usePathname();

    return (
        <div className="hidden lg:block">
            <div className="container">
                <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-stone-950">
                    <Link
                        id={buildNavbarItemId("home-page")}
                        href={Routes.HOME}
                        key={`home-page`}
                        className={clsx(
                            "navigation_accent__link relative uppercase",
                            {"active": isNavbarItemActive(pathname, Routes.HOME)}
                        )}
                    >
                        Головна
                    </Link>
                    <Link
                        id={buildNavbarItemId("catalog")}
                        href={Routes.PRODUCTS}
                        key={`products-page`}
                        className={clsx(
                            "navigation_accent__link relative uppercase",
                            {"active": isNavbarItemActive(pathname, Routes.PRODUCTS)}
                        )}
                    >
                        Каталог
                    </Link>
                    {categories?.data?.list.map((item) => {
                        if (!item.isQuicklyAccessible) return null;

                        return (
                            <Link
                                id={buildNavbarItemId(item.key.toString())}
                                href={Routes.PRODUCTS_BY_CATEGORIES(item.key)}
                                key={`${item.key}-page`}
                                className={clsx(
                                    "navigation_accent__link relative uppercase"
                                )}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                    <Link
                        id={buildNavbarItemId("hot-offers")}
                        href={Routes.PRODUCTS_BY_CATEGORIES("hot")}
                        key={`hot-offers-page`}
                        className={clsx(
                            "navigation_accent__link relative uppercase",
                            {"active": isNavbarItemActive(pathname, Routes.PRODUCTS)}
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

export default PageNavbar;