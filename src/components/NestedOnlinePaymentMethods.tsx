"use client"

import React, {useEffect, useId, useState} from "react";
import {PAYMENT_METHOD_STORAGE_KEY, PaymentSectionType} from "@/data/reference/payment-sections";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {PaymentMethods} from "@/data/reference/payment-methods";
import {Label} from "@/components/ui/label";

interface NestedOnlinePaymentMethodsProps {
    section: PaymentSectionType | null
}

export default function NestedOnlinePaymentMethods({
                                                       section,
                                                   }: NestedOnlinePaymentMethodsProps) {
    const id = useId()
    const [selectedMethodKey, setSelectedMethodKey] = useState<string | null>(null)

    useEffect(() => {
        const savedMethod = localStorage.getItem(PAYMENT_METHOD_STORAGE_KEY)
        if (savedMethod) {
            setSelectedMethodKey(savedMethod)
        }
    }, [])

    const handleMethodChange = (methodKey: string) => {
        setSelectedMethodKey(methodKey)
        localStorage.setItem(PAYMENT_METHOD_STORAGE_KEY, methodKey)
    }

    return !!section ? (
        <div className="mt-4">
            <RadioGroup
                value={selectedMethodKey ?? undefined}
                onValueChange={handleMethodChange}
                className="gap-4"
            >
                {section.methodsKeys.map((methodKey) => {
                    const method = PaymentMethods.find(m => m.key === methodKey)
                    if (!method) return null

                    return (
                        <div
                            key={method.key}
                            className="relative pl-4 cursor-pointer flex items-center gap-3 border-input has-[data-state=checked]:border-rose-500"
                        >
                            <RadioGroupItem
                                value={method.key}
                                id={`${id}-${method.key}`}
                            />
                            <Label htmlFor={`${id}-${method.key}`}
                                   className="text-xs font-light flex flex-cols items-center gap-x-4 h-5">
                                {method.name}
                                {!!method?.icon && <method.icon/>}
                            </Label>
                        </div>
                    )
                })}
            </RadioGroup>
        </div>
    ) : null
}