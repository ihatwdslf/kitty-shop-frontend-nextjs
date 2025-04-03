import React from "react";
import {Category} from "@/data/response/Category";
import CategoryItem from "@/components/category/CategoryItem";

const CategoryListItems: React.FC<{
    parentId?: number;
    categoryTree: {
        [key: number]: Category[]
    }
    depth?: number;
}> = ({
          parentId = 0,
          categoryTree,
          depth = 0
      }) => {

    if (!categoryTree[parentId]) return (
        // <div className="flex items-center justify-center mt-[51%]">
        //     <span className="p-3 text-muted-foreground font-thin text-sm">
        //         Немає доступних категорій.
        //     </span>
        // </div>
        null
    );

    return (
        <div>
            <ul
                className={`p-3`}
            >
                {categoryTree[parentId].map((category) => (
                    <li
                        key={category.id}
                        className={`relative group transition-all duration-300 ${
                            depth > 0 ? "pl-4 border-l-2 border-gray-300 hover:border-rose-400" : ""
                        }`}
                    >
                        <CategoryItem category={category}
                                      className={depth === 0 ? "text-[14px] font-medium hover:bg-gray-100 hover:rounded-lg" : "text-[12px]"}/>
                        {/* Render subcategories recursively */}
                        <CategoryListItems parentId={category.id} categoryTree={categoryTree} depth={depth + 1}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryListItems;