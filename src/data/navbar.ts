import {BsFire} from "react-icons/bs";
import type {IconType} from "react-icons";

export interface NavbarItemType {
    title: string;
    link: string;
    icon?: IconType;
}

export const NavbarSections: NavbarItemType[] = [
    { title: "Головна", link: "/" },
    { title: "Категорії", link: "/categories" },
    { title: "Чоловіче", link: "/categories?for=men" },
    { title: "Жіноче", link: "/women" },
    { title: "Аксесуари", link: "/accessories" },
    { title: "Косметика", link: "/cosmetics" },
    { title: "Парфуми", link: "/perfume" },
    { title: "Гарячі пропозиції", link: "/hot-offers", icon: BsFire },
];