"use client"

import Image from "next/image";
import {useEffect, useId, useState} from "react";

import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"

import {DeliveryOptions, getSavedDeliveryKey, saveDeliveryKey} from "@/data/static/delivery-options";
import {formatPrice} from "@/utils/price";
import useDeliveryAddress from "@/hooks/use-delivery-address";

interface ChooseDeliveryTypeRadioProps {
    activeTab: keyof typeof DeliveryOptions
    onDeliveryChange?: (key: string) => void
}

export default function ChooseDeliveryTypeRadio({activeTab, onDeliveryChange}: ChooseDeliveryTypeRadioProps) {
    const id = useId()
    const [selectedKey, setSelectedKey] = useState<string | null>(null)
    const options = DeliveryOptions[activeTab]

    const {removeDeliveryAddress} = useDeliveryAddress();

    useEffect(() => {
        const savedKey = getSavedDeliveryKey();
        if (savedKey && options.find((opt) => opt.key === savedKey)) {
            setSelectedKey(savedKey);
        }
    }, [activeTab, options]);

    const handleChange = (key: string) => {
        setSelectedKey(key);
        saveDeliveryKey(key); // ⬅ тут відправляється кастомний event

        removeDeliveryAddress();

        onDeliveryChange?.(key);
    };

    return (
        <RadioGroup
            value={selectedKey ?? undefined}
            onValueChange={handleChange}
            className="gap-2 [--primary:var(--color-rose-500)] [--ring:var(--color-rose-300)] in-[.dark]:[--primary:var(--color-rose-500)] in-[.dark]:[--ring:var(--color-rose-900)]"
        >
            {options.map((opt) => (
                <div
                    key={opt.key}
                    className="border-input has-data-[state=checked]:border-rose-500 relative flex flex-col items-start gap-2 rounded-md border-2 p-4 shadow-xs outline-none"
                >
                    <div className="flex w-full items-start gap-2">
                        <RadioGroupItem
                            value={opt.key}
                            id={`${id}-${opt.key}`}
                            aria-describedby={`${id}-${opt.key}-desc`}
                            className="cursor-pointer order-1 after:absolute after:inset-0"
                        />
                        <div className="grid grow gap-1 text-start">
                            <div className="flex flex-cols items-center gap-x-4">
                                {opt.iconUrl && (
                                    <div>
                                        <Image
                                            src={opt.iconUrl}
                                            alt={opt.iconUrl}
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                )}
                                <div>
                                    <Label htmlFor={`${id}-${opt.key}`}>
                                        {opt.label}
                                        {opt.additionalPrice > 0 ? (
                                            <span className="ml-2 text-muted-foreground text-xs font-normal">
                                                +{formatPrice(opt.additionalPrice)}
                                            </span>
                                        ) : (
                                            <span className="ml-2 text-green-600 text-xs font-normal">
                                                Безкоштовно
                                            </span>
                                        )}
                                    </Label>
                                    <p
                                        id={`${id}-${opt.key}-desc`}
                                        className="text-muted-foreground text-xs"
                                    >
                                        {opt.deliveryAvailable}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedKey === opt.key && (
                        <div className="mt-2 rounded-md bg-muted p-2 text-xs font-light">
                            {opt.description ? (
                                opt.description
                            ) : (
                                "Не забудь змінити місце отримання."
                            )}
                        </div>
                    )}
                </div>
            ))}
        </RadioGroup>
    )
}
