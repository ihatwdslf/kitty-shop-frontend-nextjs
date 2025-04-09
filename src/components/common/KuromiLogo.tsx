import Image from "next/image";
import React from "react";

interface KuromiLogoProps {
    size: number;
}

export default function KuromiLogo({ size = 40 }: KuromiLogoProps) {
    return (
        <Image
            src="/common/kuromi-logo.png"
            alt="kuromi-logo"
            width={size}
            height={size}
        />
    )
}