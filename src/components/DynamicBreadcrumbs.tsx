"use client"

import {HomeIcon} from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function DynamicBreadcrumbs() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment); // Split and filter out empty segments

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} href="/">
                        <HomeIcon size={16} aria-hidden="true"/>
                        <span className="sr-only">Головна</span>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                {pathSegments.map((segment, index) => {
                    const path = `/${pathSegments.slice(0, index + 1).join('/')}`; // Create the path for each segment
                    return (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink as={Link} href={path} className="text-xs">
                                {segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')} {/* Capitalize the first letter and replace dashes with spaces */}
                            </BreadcrumbLink>
                            {index < pathSegments.length - 1 && <BreadcrumbSeparator/>}
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
