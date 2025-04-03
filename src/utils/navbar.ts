export const buildNavbarItemId = (key: string) => {
    return "navbar_item_" + key.toLowerCase().replace(" ", "_");
}

export const isNavbarItemActive = (pathname: string, path: string): boolean => {
    return pathname === path || pathname.startsWith(path + "/");
};