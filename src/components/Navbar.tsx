"use client"

import Link from "next/link";
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import {NavbarSections} from "@/data/navbar";
import {buildNavbarItemId, isNavbarItemActive} from "@/utils/navbar";

const Navbar = () => {

    const pathname = usePathname();

    return (
        <div className="hidden lg:block">
            <div className="container">
                <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-stone-950">
                    {NavbarSections.map((item, index) =>
                        <Link
                            id={buildNavbarItemId(item)}
                            href={item.link}
                            key={index}
                            className={clsx(
                                "navbar__link relative uppercase",
                                { "active": isNavbarItemActive(pathname, item.link) }
                            )}
                        >
                            {item.icon && <item.icon className="inline-block mb-1"/>} {item.title}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;