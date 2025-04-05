import React from "react";
import {Category} from "@/data/response/category/Category";
import DynamicIcon from "@/components/DynamicIcon";
import {IoIosArrowForward} from "react-icons/io";

interface CategoryItemProps {
    category: Category;
    className?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({category, className}) => {
    if (category.isQuicklyAccessible) return null;

    return (
        <>
            <div className={`flex items-center p-2 cursor-pointer ${className}`}>
                <div className="flex flex-1 items-center justify-between">
                    <span className="hover:text-rose-400 font-light items-center flex gap-x-2 group-hover">
                        {category.icon && (
                            <DynamicIcon
                                iconName={category.icon}
                                isGroupHovered={true}
                            />
                        )}
                        {category.name}
                    </span>
                    <IoIosArrowForward/>
                </div>
            </div>
        </>
    );
}

export default CategoryItem;