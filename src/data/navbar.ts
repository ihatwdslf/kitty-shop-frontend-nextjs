import {BsFire} from "react-icons/bs";
import type {IconType} from "react-icons";

export interface NavbarItemType {
    title: string;
    link: string;
    icon?: IconType;
}

export const NavbarSections: NavbarItemType[] = [
    { title: "Home", link: "/" },
    { title: "Categories", link: "/categories" },
    { title: "Mens", link: "/categories?for=men" },
    { title: "Womens", link: "/women" },
    { title: "Jewelry", link: "/jewelry" },
    { title: "Perfume", link: "/perfume" },
    { title: "Hot Offers", link: "/hot-offers", icon: BsFire },
];