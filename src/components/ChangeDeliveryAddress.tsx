"use client"

import {MailIcon} from "lucide-react"

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
import {IoIosArrowDroprightCircle} from "react-icons/io";
import Image from "next/image";
import {DeliveryOptionsItemType} from "@/data/static/delivery-options";
import {saveDeliveryAddress} from "@/data/static/delivery-address";
import React, {useState} from "react";
import useDeliveryAddress from "@/hooks/use-delivery-address";

interface ChangeDeliveryAddressProps {
    deliveryOption?: DeliveryOptionsItemType | null;
}

export default function ChangeDeliveryAddress({deliveryOption}: ChangeDeliveryAddressProps) {

    const {deliveryAddress} = useDeliveryAddress()

    const [newAddress, setNewAddress] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("")

    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress(e.target.value);  // Update the state when the user types
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newAddress.trim()) {
            setError("Пусто! Будь ласка, введи адресу.");
            return;
        }

        const regex = deliveryOption?.changeAddressRegex;
        const isValid = !regex || regex.test(newAddress);

        if (!isValid) {
            setError("Введена адреса не відповідає формату. Спробуй ще раз.")
            return;
        }

        setError("")
        saveDeliveryAddress(newAddress);
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <div
                    className="cursor-pointer hover:border-gray-300 flex items-center justify-between border border-2 rounded-lg p-5">
                    <div className="text-sm">
                        Місце отримання
                        <div className="pt-1 text-muted-foreground text-xs font-light">
                            {deliveryAddress && deliveryAddress.length > 0 ? deliveryAddress : "Точна адреса отримання замовлення"}
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2 text-sm text-rose-400 hover:bg-rose-50
                                    rounded-lg px-3 py-2">
                        Змінити
                        <IoIosArrowDroprightCircle size={20}/>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <div className="mb-2 flex flex-col items-center">
                    <Image
                        src="/kuromi-logo.png"
                        alt="kuromi-logo"
                        width={40}
                        height={40}
                    />
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            Нове місце отримання?<br/>
                            Заповнюй!
                        </DialogTitle>
                        <DialogDescription className="pt-3 pl-0">
                            Введи адресу нового місця отримання.<br/>
                            Обов&#39;язково слідуй прикладу
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="*:not-first:mt-2">
                        <div className="relative">
                            <div>
                                <Input
                                    id="dialog-subscribe"
                                    className="peer ps-9"
                                    placeholder={deliveryOption?.changeAddressPlaceholder ?? "м.Київ, вул. Грушевського, 5."}
                                    type="text"
                                    value={newAddress}
                                    onChange={handleChangeAddress}
                                />
                                <div
                                    className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                    <MailIcon size={16} aria-hidden="true"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            {error &&
                                <div>
                                    <p className="text-xs text-red-500 mt-2">
                                        {error}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-3">Приклад: {deliveryOption?.changeAddressPlaceholder}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-rose-400 hover:bg-rose-500 cursor-pointer">
                        Змінити
                    </Button>
                </form>

                <p className="text-muted-foreground text-center text-xs">
                    Це дуже важливо для нас!<br/>
                    Впевнись, що вводиш правильні дані.
                </p>
            </DialogContent>
        </Dialog>
    )
}
