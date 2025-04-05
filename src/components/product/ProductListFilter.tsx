"use client"

import React, {Fragment, useEffect, useState} from "react";
import {useCategories} from "@/hooks/useCategories";
import {Category} from "@/data/response/category/Category";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {useRouter, useSearchParams} from "next/navigation";
import {BsFire} from "react-icons/bs";
import {Button} from "@/components/ui/button";

// Define the TreeNode structure
interface TreeNode {
    id: number;
    label: string;
    children?: TreeNode[];
}

const ProductListFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {categories, isLoading, error} = useCategories();

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

        // Collect all selected keys (including "hot")
        const selectedKeys = Array.from(checkedNodes).filter(key =>
            key === "hot" || categories?.data?.list.some(cat => cat.key === key)
        );

        // If "hot" is selected, ensure it is added to the URL
        const newQueryString = selectedKeys.length > 0 ? selectedKeys.join(",") : null;
        const currentQueryString = searchParams.get("categoryKeys");

        if (newQueryString !== currentQueryString) {
            router.push(newQueryString ? `/products?categoryKeys=${newQueryString}` : "/products");
        }
    }, [categories, checkedNodes, router, searchParams]);

    useEffect(() => {
        const selectedCategories = Array.from(checkedNodes).filter(key => key !== "hot");
        const categoryTitles = selectedCategories.map(key => {
            const category = categories?.data?.list.find(cat => cat.key === key);
            return category ? category.name : null;
        }).filter(Boolean);

        const title = selectedCategories.length > 0
            ? `Категорія товарів | ${categoryTitles.join(", ")}`
            : "Категорія товарів";

        document.title = title;

        const metaDescription = selectedCategories.length > 0
            ? `Фільтри: ${categoryTitles.join(", ")}`
            : "Виберіть категорії товарів для фільтрації.";

        const metaTag = document.querySelector('meta[name="description"]');
        if (metaTag) {
            metaTag.setAttribute("content", metaDescription);
        }
    }, [checkedNodes, categories]);

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

        // If the "hot" checkbox is toggled, handle it separately
        if (key === "hot") {
            if (isChecked) {
                newCheckedNodes.add("hot");
            } else {
                newCheckedNodes.delete("hot");
            }
        } else {
            // If it's a regular category, we manage its state
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

            // If a regular category checkbox is toggled
            if (isChecked) {
                newCheckedNodes.add(key);
                updateChildNodes(node, true);
            } else {
                newCheckedNodes.delete(key);
                updateChildNodes(node, false);
            }
        }

        setCheckedNodes(newCheckedNodes);
    };

    // Handle clearing all checkboxes
    const clearAllCheckboxes = () => {
        setCheckedNodes(new Set()); // Clear all checked nodes
        router.push("/products");   // Update the URL to reflect the changes
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
                    />
                    <Label htmlFor={key} className="font-light">{node.label}</Label>
                </div>
                {node.children && (
                    <div className="ms-6 space-y-3">{node.children.map(renderTreeNode)}</div>
                )}
            </Fragment>
        );
    };

    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                <span>
                    Фільтри
                </span>
                <Button onClick={clearAllCheckboxes} variant="link" className="cursor-pointer">
                    <span className=" test-[12px] underline">Очистити всі</span>
                </Button>
            </div>
            <hr className="mt-2 pt-2 pb-2"/>
            <div className="pb-3 flex items-center gap-2">
                <Checkbox
                    id={`hot`}
                    checked={checkedNodes.has(`hot`)}
                    onCheckedChange={(checked) => handleCheckedChange(`hot`, !!checked, {
                        id: -1,
                        label: "Гарячі пропозиції"
                    })}
                />
                <Label htmlFor={`hot`} className="font-light">
                    <BsFire className="inline-block mb-1"/>
                    <span className="pl-1">
                        Гарячі пропозиції
                    </span>
                </Label>
            </div>
            {categoryTree.length > 0 ? (
                <div className="space-y-4 font-thin">{categoryTree.map(renderTreeNode)}</div>
            ) : (
                <p>No categories available.</p>
            )}
        </div>
    );
};

export default ProductListFilter;