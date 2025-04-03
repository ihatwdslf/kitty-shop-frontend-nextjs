"use client"

import React, {Fragment, useEffect, useState} from "react";
import {useCategories} from "@/hooks/useCategories";
import {Category} from "@/data/response/Category";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {useRouter, useSearchParams} from "next/navigation";

// Define the TreeNode structure
interface TreeNode {
    id: number;
    label: string;
    children?: TreeNode[];
}

const ProductListFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { categories, isLoading, error } = useCategories();

    // Отримання вибраних категорій із URL
    const getCategoryKeysFromUrl = () => {
        return new Set(searchParams.get("categoryKeys")?.split(",") || []);
    };

    const [checkedNodes, setCheckedNodes] = useState<Set<string>>(getCategoryKeysFromUrl);

    // Оновлення `checkedNodes` при зміні URL
    useEffect(() => {
        setCheckedNodes(getCategoryKeysFromUrl());
    }, [searchParams]);

    useEffect(() => {
        if (!categories?.data?.list) return;

        const selectedKeys = Array.from(checkedNodes).filter(key =>
            categories?.data?.list.some(cat => cat.key === key)
        );

        const newQueryString = selectedKeys.length > 0 ? selectedKeys.join(",") : null;
        const currentQueryString = searchParams.get("categoryKeys");

        if (newQueryString !== currentQueryString) {
            router.push(newQueryString ? `/products?categoryKeys=${newQueryString}` : "/products");
        }
    }, [categories, checkedNodes, router, searchParams]);

    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories</p>;

    // Перетворення категорій у дерево
    const transformToTreeNodes = (categoryList: Category[]): TreeNode[] => {
        const categoryMap: Record<number, TreeNode> = {};

        categoryList.forEach(category => {
            categoryMap[category.id] = {
                id: category.id,
                label: category.name,
                children: [],
            };
        });

        const roots: TreeNode[] = [];

        categoryList.forEach(category => {
            if (!category.parentId) {
                roots.push(categoryMap[category.id]);
            } else {
                categoryMap[category.parentId]?.children?.push(categoryMap[category.id]);
            }
        });

        return roots;
    };

    const categoryTree = transformToTreeNodes(categories?.data?.list || []);

    // Функція для обробки зміни стану чекбоксу
    const handleCheckedChange = (key: string, isChecked: boolean, node: TreeNode) => {
        const newCheckedNodes = new Set(checkedNodes);

        // Функція для рекурсивного оновлення дочірніх вузлів
        const updateChildNodes = (node: TreeNode, state: boolean) => {
            const category = categories?.data?.list.find(cat => cat.id === node.id);
            if (!category) return;

            if (state) {
                newCheckedNodes.add(category.key);
            } else {
                newCheckedNodes.delete(category.key);
            }

            node.children?.forEach(child => updateChildNodes(child, state));
        };

        // Якщо натиснуто батьківський чекбокс
        if (isChecked) {
            newCheckedNodes.add(key);
            updateChildNodes(node, true);
        } else {
            newCheckedNodes.delete(key);
            updateChildNodes(node, false);
        }

        setCheckedNodes(newCheckedNodes);
    };

    const renderTreeNode = (node: TreeNode) => {
        const category = categories?.data?.list.find(cat => cat.id === node.id);
        const key = category?.key || "";

        return (
            <Fragment key={node.id}>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id={key}
                        checked={checkedNodes.has(key)}
                        onCheckedChange={(checked) => handleCheckedChange(key, !!checked, node)}
                        className="accent-rose-400"
                    />
                    <Label htmlFor={key}>{node.label}</Label>
                </div>
                {node.children && (
                    <div className="ms-6 space-y-3">{node.children.map(renderTreeNode)}</div>
                )}
            </Fragment>
        );
    };

    return (
        <div className="p-5 text-sm">
            Фільтри
            <hr className="mt-2 pt-2" />
            {categoryTree.length > 0 ? (
                <div className="space-y-3">{categoryTree.map(renderTreeNode)}</div>
            ) : (
                <p>No categories available.</p>
            )}
        </div>
    );
};

export default ProductListFilter;