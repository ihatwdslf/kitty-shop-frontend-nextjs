import {NavbarItemType} from "@/data/navbar";

export const buildNavbarItemId= (item: NavbarItemType) => {
    return "navbar_item_" + item.title.toLowerCase().replace(" ", "_");
}

export const isNavbarItemActive = (pathname: string, path: string): boolean => {
    return pathname === path || pathname.startsWith(path + "/");
};