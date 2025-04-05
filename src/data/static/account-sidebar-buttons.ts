import {LiaShoppingCartSolid} from "react-icons/lia";
import type {IconType} from "react-icons";
import {FaRegUser} from "react-icons/fa";

export interface AccountSidebarButtonsType {
    link: string;
    title: string;
    icon: IconType;
}

export const AccountSidebarButtons: AccountSidebarButtonsType[] = [
    {
        link: `/orders`,
        title: "Мої замовлення",
        icon: LiaShoppingCartSolid,
    },
    {
        link: `/edit`,
        title: "Персональні дані",
        icon: FaRegUser,
    }
]