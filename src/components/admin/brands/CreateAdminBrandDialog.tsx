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
import {CreateBrandRequest} from "@/data/request/brand/CreateBrandRequest";
import {useBrands} from "@/hooks/use-brands";
import {Textarea} from "@/components/ui/textarea";
import KuromiLogo from "@/components/common/KuromiLogo";

interface AdminBrandDialogProps {
    open: boolean;
    setOpenAction: (open: boolean) => void;
}

export default function CreateAdminBrandDialog({open, setOpenAction}: AdminBrandDialogProps) {

    const id = useId()
    const {createBrandMutation} = useBrands();

    const [brand, setBrand] = useState(
        {
            name: "",
            description: "",
            website: "",
            countryCode: ""
        } as CreateBrandRequest
    );

    // @ts-expect-error("any type")
    const handleChange = (e) => {
        setBrand({...brand, [e.target.name]: e.target.value});
    };

    // @ts-expect-error("any type")
    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const created = await createBrandMutation.mutateAsync(brand);
            if (created) {
                setOpenAction(false);
            }
        } catch (err) {
            const error = err as Error;
            console.error(error)
        }
    };

    return (
        <Dialog open={open} onOpenChange={() => setOpenAction(!open)}>
            <DialogTrigger asChild>
                <div
                    className="flex items-center gap-x-2 text-sm text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                >
                    <IoMdAddCircleOutline size={20}/>
                    Зареєструвати в системі
                </div>
            </DialogTrigger>
            <DialogContent>
                <KuromiLogo size={40}/>
                <div className="flex flex-col gap-2">
                    <DialogHeader className="pt-2">
                        <DialogTitle className="text-left">Реєстрація бренду в системі</DialogTitle>
                        <DialogDescription className="text-left font-light">
                            Заповни все правильно для реєстрації.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={handleCreate}>
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
                                    onChange={handleChange}
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
