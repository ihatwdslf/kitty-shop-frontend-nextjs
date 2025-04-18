import type {IconType} from "react-icons";
import {FaApple} from "react-icons/fa6";
import {MdOutlineCategory} from "react-icons/md";
import {LiaShoppingCartSolid} from "react-icons/lia";
import {TbTruckDelivery} from "react-icons/tb";

export interface AdminSidebarButtonsType {
    link: string;
    title: string;
    icon: IconType;
}

export const AdminSidebarButtons: AdminSidebarButtonsType[] = [
    {
        link: `/brands`,
        title: "Керування брендами",
        icon: FaApple,
    },
    {
        link: `/categories`,
        title: "Керування категоріями",
        icon: MdOutlineCategory,
    },
    {
        link: `/products`,
        title: "Керування продуктами",
        icon: LiaShoppingCartSolid,
    },
    {
        link: `/orders`,
        title: "Керування замовленнями",
        icon: TbTruckDelivery,
    },
]