"use client";

import React from "react";
import loadable from "@loadable/component";

// Mapping icon libraries to their respective modules
const iconLibraries: Record<string, () => Promise<any>> = {
    ai: () => import("react-icons/ai"),
    bs: () => import("react-icons/bs"),
    bi: () => import("react-icons/bi"),
    di: () => import("react-icons/di"),
    fi: () => import("react-icons/fi"),
    fc: () => import("react-icons/fc"),
    fa: () => import("react-icons/fa"),
    gi: () => import("react-icons/gi"),
    go: () => import("react-icons/go"),
    gr: () => import("react-icons/gr"),
    hi: () => import("react-icons/hi"),
    im: () => import("react-icons/im"),
    io: () => import("react-icons/io5"),
    md: () => import("react-icons/md"),
    ri: () => import("react-icons/ri"),
    si: () => import("react-icons/si"),
    ti: () => import("react-icons/ti"),
    vsc: () => import("react-icons/vsc"),
    wi: () => import("react-icons/wi"),
    cg: () => import("react-icons/cg"),
};

interface DynamicIconProps {
    iconName: string;
    size?: number;
    defaultColor?: string;
    hoverColor?: string;
    isGroupHovered?: boolean;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
                                                     iconName,
                                                     size = 16,
                                                     defaultColor = "black",
                                                     hoverColor = "rose-400",
                                                     isGroupHovered = false,
                                                 }) => {
    const match = iconName.match(/^[a-z]+/i);
    if (!match) return null;

    const lib = match[0].toLowerCase().substring(0, 2);
    const importFn = iconLibraries[lib];

    if (!importFn) return null;

    const ReactIcons = loadable.lib(importFn);

    return (
        <ReactIcons>
            {(icons: Record<string, React.ElementType>) => {
                const IconComponent = icons[iconName] as React.ElementType;
                return IconComponent ? (
                    <IconComponent size={size} color={isGroupHovered ? hoverColor : defaultColor}/>
                ) : null;
            }}
        </ReactIcons>
    );
};

export default DynamicIcon;
