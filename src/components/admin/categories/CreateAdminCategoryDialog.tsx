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
import {IoMdAddCircleOutline} from "react-icons/io";
import {Textarea} from "@/components/ui/textarea";
import KuromiLogo from "@/components/common/KuromiLogo";
import {CreateCategoryRequest} from "@/data/request/category/CreateCategoryRequest";
import {useCategories} from "@/hooks/use-categories";
import DetailedSwitchWithIcon from "@/components/DetailedSwitchWithIcon";
import {BsFillLightningChargeFill} from "react-icons/bs";
import {FaRegTrashAlt} from "react-icons/fa";

export default function CreateAdminCategoryDialog() {

    const [open, setOpen] = useState(false);

    const id = useId()
    const {createCategoryMutation} = useCategories();

    const [category, setCategory] = useState(
        {
            key: "",
            name: "",
            description: "",
            parentId: undefined,
            icon: undefined,
            isQuicklyAccessible: false,
            isRemovable: true
        } as CreateCategoryRequest
    );

    // @ts-expect-error("any type")
    const handleChange = (e) => {
        setCategory({...category, [e.target.name]: e.target.value});
    };

    const handleSwitchChange = (key: keyof CreateCategoryRequest) => (checked: boolean) => {
        setCategory({...category, [key]: checked});
    };

    // @ts-expect-error("any type")
    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const created = await createCategoryMutation.mutateAsync(category);
            if (created) {
                setOpen(false);
            }
        } catch (err) {
            const error = err as Error;
            console.error(error)
        }
    };

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild>
                <div
                    className="flex items-center gap-x-2 text-sm text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                >
                    <IoMdAddCircleOutline size={20}/>
                    Зареєструвати в системі
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-190">
                <KuromiLogo size={40}/>
                <div className="flex flex-col gap-2">
                    <DialogHeader className="pt-2">
                        <DialogTitle className="text-left">Реєстрація категорії в системі</DialogTitle>
                        <DialogDescription className="text-left font-light">
                            Заповни все правильно для реєстрації.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={handleCreate}>
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
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="border-t-1">
                            <div className="flex gap-x-4 mt-4">
                                <DetailedSwitchWithIcon
                                    icon={BsFillLightningChargeFill}
                                    checked={category.isQuicklyAccessible ?? false}
                                    onCheckedChange={handleSwitchChange("isQuicklyAccessible")}
                                    label="Швидко доступний"
                                    description="Буде відображена в NavBar."
                                />
                                <DetailedSwitchWithIcon
                                    icon={FaRegTrashAlt}
                                    checked={category.isRemovable ?? true}
                                    onCheckedChange={handleSwitchChange("isRemovable")}
                                    label="Можна видалити"
                                    description="Видаляється тільки через БД."
                                />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="w-full cursor-pointer bg-rose-400 hover:bg-rose-500">
                        Зареєструвати бренд
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
