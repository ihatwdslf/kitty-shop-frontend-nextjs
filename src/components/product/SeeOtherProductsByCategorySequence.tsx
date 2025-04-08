import React, {ReactNode} from "react";
import Link from "next/link";
import {CategoryIdentifierAndNameResponseDto} from "@/data/response/category/CategoryIdentifierAndNameResponseDto";
import {Routes} from "@/data/static/routes";

interface SeeOtherProductsByCategorySequenceProps {
    categories: CategoryIdentifierAndNameResponseDto[];
}

const SeeOtherProductsByCategorySequence: React.FC<SeeOtherProductsByCategorySequenceProps> = ({ categories }) => {
    return (
        <>
            {categories && categories?.length > 0 ? (
                categories?.reduce<ReactNode[]>((acc, cat, index) => {
                    // Create the link for the current category
                    const link = (
                        <Link
                            key={cat.categoryId}
                            href={Routes.PRODUCTS_BY_CATEGORIES(cat.categoryKey)}
                            className="pl-1 underline"
                        >
                            {cat.categoryName}
                        </Link>
                    );

                    // If it's not the first category, add a comma before the link
                    if (index > 0) {
                        acc.push(", ", link);
                    } else {
                        acc.push(link);
                    }

                    return acc;
                }, [])
            ) : (
                <Link href={Routes.PRODUCTS} className="pl-1 underline">
                    інше
                </Link>
            )}
        </>
    );
};

export default SeeOtherProductsByCategorySequence;