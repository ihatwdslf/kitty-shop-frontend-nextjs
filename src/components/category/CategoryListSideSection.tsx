import CategoryListItems from "@/components/category/CategoryListItems";
import {Category} from "@/data/response/category/Category";
import React, {useEffect, useState} from "react";

interface CategoryListSectionProps {
    items: Category[] | undefined;
}

const buildCategoryTree = (categories: Category[]): { [key: number]: Category[] } => {
    const tree: { [key: number]: Category[] } = {};

    categories.forEach((category) => {
        const parentId = category.parentId ?? 0;
        if (!tree[parentId]) {
            tree[parentId] = [];
        }
        tree[parentId].push(category);
    });

    return tree;
};

const CategoryListSideSection: React.FC<CategoryListSectionProps> = ({items}) => {
    const [categoryTree, setCategoryTree] = useState<{ [key: number]: Category[] }>({});

    useEffect(() => {
        if (items) {
            setCategoryTree(buildCategoryTree(items));
        }
    }, [items]);

    return (
        <div className="h-full rounded-lg overflow-hidden">
            <CategoryListItems categoryTree={categoryTree} />
        </div>
    )
}

export default CategoryListSideSection;