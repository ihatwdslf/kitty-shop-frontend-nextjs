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
import {useBrands} from "@/hooks/use-brands";
import {Textarea} from "@/components/ui/textarea";
import {UpdateBrandRequest} from "@/data/request/brand/UpdateBrandRequest";
import {FaEdit} from "react-icons/fa";
import KuromiLogo from "@/components/common/KuromiLogo";

interface AdminBrandDialogProps {
    brandId: number;
}

export default function EditAdminBrandDialog({brandId}: AdminBrandDialogProps) {

    const id = useId()
    const {fetchBrand, updateBrandMutation} = useBrands();

    const {data: brandData} = fetchBrand(brandId.toString()); // Cast id to string

    const [brand, setBrand] = useState(
        {
            name: brandData?.data?.name,
            description: brandData?.data?.description,
            website: brandData?.data?.website,
            countryCode: brandData?.data?.country.code,
        } as UpdateBrandRequest
    );

    // @ts-expect-error("any type")
    const handleChange = (e) => {
        setBrand({...brand, [e.target.name]: e.target.value});
    };

    // @ts-expect-error("any type")
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await updateBrandMutation.mutateAsync({
                id: brandId,
                updateRequest: brand
            }, {
                onSuccess: () => {
                    window.location.reload();
                },
                onError: (error) => {
                    console.error("Error updating brand", error);
                    alert("Помилка оновлення бренду, будь ласка, перегляньте консоль.");
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
            <DialogContent>
                <div className="flex flex-col gap-2">
                    <KuromiLogo size={40}/>
                    <DialogHeader className="pt-2">
                        <DialogTitle className="text-left">Оновлення бренду в системі</DialogTitle>
                        <DialogDescription className="text-left font-light">
                            Заповни все правильно для оновлення.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={handleUpdate}>
                    <div className="space-y-4">
                        <div className="*:not-first:mt-2">
                            <Label
                                htmlFor={`name-${id}`}
                            >
                                Назва бренду
                            </Label>
                            <Input
                                id={`name-${id}`}
                                name="name"
                                placeholder="Введи назву бренду"
                                type="text"
                                value={brand.name}
                                onChange={handleChange}
                                defaultValue={brandData?.data?.name}
                                required
                            />
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
                                    placeholder="Введи опис бренду"
                                    name="description"
                                    value={brand.description}
                                    defaultValue={brandData?.data?.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-2 space-y-2">
                                <Label htmlFor={`expiry-${id}`}>Веб-сайт</Label>
                                <Input
                                    id={`expiry-${id}`}
                                    className="[direction:inherit]"
                                    placeholder="example.com"
                                    name="website"
                                    value={brand.website}
                                    defaultValue={brandData?.data?.website}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label htmlFor={`cvc-${id}`}>Код країни</Label>
                                <Input
                                    id={`cvc-${id}`}
                                    className="[direction:inherit]"
                                    name="countryCode"
                                    placeholder="XX"
                                    value={brand.countryCode}
                                    defaultValue={brandData?.data?.country.code}
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
