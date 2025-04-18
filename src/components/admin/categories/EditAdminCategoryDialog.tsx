"use client"

import React, {useId, useState} from "react"

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea";
import {FaEdit} from "react-icons/fa";
import KuromiLogo from "@/components/common/KuromiLogo";
import {useCategories} from "@/hooks/use-categories";
import {UpdateCategoryRequest} from "@/data/request/category/UpdateCategoryRequest";

interface AdminBrandDialogProps {
    categoryId: number;
}

export default function EditAdminCategoryDialog({categoryId}: AdminBrandDialogProps) {

    const id = useId()
    const {fetchCategory, updateCategoryMutation} = useCategories();

    const {data: categoryData} = fetchCategory(categoryId.toString()); // Cast id to string

    const [category, setCategory] = useState(
        {
            key: categoryData?.data?.key,
            name: categoryData?.data?.name,
            description: categoryData?.data?.description,
            parentId: categoryData?.data?.parentId,
            icon: categoryData?.data?.icon
        } as UpdateCategoryRequest
    );

    // @ts-expect-error("any type")
    const handleChange = (e) => {
        setCategory({...category, [e.target.name]: e.target.value});
    };

    // @ts-expect-error("any type")
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await updateCategoryMutation.mutateAsync({
                id: categoryId,
                updateRequest: category
            }, {
                onSuccess: () => {
                    window.location.reload();
                },
                onError: (error) => {
                    console.error("Error updating category", error);
                    alert("Помилка оновлення категорії, будь ласка, перегляньте консоль.");
                },
            });
        } catch (err) {
            const error = err as Error;
            console.error(error)
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className="flex items-center gap-x-1 text-xs text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                >
                    <FaEdit size={16}/>
                    Редагувати
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-190">
                <KuromiLogo size={40}/>
                <div className="flex flex-col gap-2">
                    <DialogHeader className="pt-2">
                        <DialogTitle className="text-left">Оновлення категорії в системі</DialogTitle>
                        <DialogDescription className="text-left font-light">
                            Заповни все правильно для оновлення.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={handleUpdate}>
                    <div className="space-y-4">
                        <div className="flex gap-4 justify-between items-center">
                            <div className="flex-1 *:not-first:mt-2">
                                <Label
                                    htmlFor={`name-${id}`}
                                >
                                    Назва категорії
                                </Label>
                                <Input
                                    id={`name-${id}`}
                                    name="name"
                                    placeholder="Введи назву категорії"
                                    type="text"
                                    value={category.name}
                                    onChange={handleChange}
                                    defaultValue={categoryData?.data?.name}
                                    required
                                />
                            </div>
                            <div className="flex-1 *:not-first:mt-2">
                                <Label
                                    htmlFor={`name-${id}`}
                                >
                                    Унікальний ключ категорії
                                </Label>
                                <Input
                                    id={`name-${id}`}
                                    name="key"
                                    placeholder="Введи унікальний_ключ_категорії"
                                    type="text"
                                    value={category.key}
                                    onChange={handleChange}
                                    defaultValue={categoryData?.data?.key}
                                    required
                                />
                            </div>
                        </div>

                        <div className="*:not-first:mt-2">
                            <Label
                                htmlFor={`number-${id}`}
                            >
                                Опис
                            </Label>
                            <div className="relative">
                                <Textarea
                                    id={`number-${id}`}
                                    className="peer pe-9 [direction:inherit]"
                                    placeholder="Введи опис категорії"
                                    name="description"
                                    value={category.description}
                                    defaultValue={categoryData?.data?.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <Label
                                    htmlFor={`expiry-${id}`}
                                    className="flex items-center"
                                >
                                    ID батьківської
                                    <span className="text-[10px] font-thin pl-1 text-muted-foreground">
                                         (необов&#39;язково)
                                    </span>
                                </Label>
                                <Input
                                    id={`expiry-${id}`}
                                    placeholder="ID батьківської категорії"
                                    name="parentId"
                                    value={category.parentId}
                                    defaultValue={categoryData?.data?.parentId ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label
                                    htmlFor={`cvc-${id}`}
                                    className="flex items-center"
                                >
                                    Іконка категорії
                                    <span className="text-[10px] font-thin pl-1 text-muted-foreground">
                                         (необов&#39;язково)
                                    </span>
                                </Label>
                                <Input
                                    id={`cvc-${id}`}
                                    name="icon"
                                    placeholder="react-icons"
                                    value={category.icon}
                                    defaultValue={categoryData?.data?.icon}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="w-full cursor-pointer bg-rose-400 hover:bg-rose-500">
                        Внести зміни
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
