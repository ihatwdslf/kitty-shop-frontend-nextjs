"use client"

import {useEffect, useId, useState} from "react";

import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {
    PAYMENT_METHOD_STORAGE_KEY,
    PAYMENT_SECTION_STORAGE_KEY,
    PaymentSectionIDs,
    PaymentSections
} from "@/data/reference/payment-sections";
import NestedOnlinePaymentMethods from "@/components/NestedOnlinePaymentMethods";
import CreditFundsPaymentMethodDetails from "@/components/CreditFundsPaymentMethodDetails";
import CompanyPaymentMethodDetails, {
    COMPANY_EDRPOU_KEY,
    COMPANY_EMAIL_KEY
} from "@/components/CompanyPaymentMethodDetails";

interface ChoosePaymentTypeRadioProps {
    onPaymentChange?: (sectionKey: string) => void
}

export default function ChoosePaymentTypeRadio({onPaymentChange}: ChoosePaymentTypeRadioProps) {
    const id = useId()
    const [selectedSectionKey, setSelectedSectionKey] = useState<string | null>(null)
    const [selectedMethodKey, setSelectedMethodKey] = useState<string | null>(null)

    useEffect(() => {
        const savedSection = localStorage.getItem(PAYMENT_SECTION_STORAGE_KEY)
        const savedMethod = localStorage.getItem(PAYMENT_METHOD_STORAGE_KEY)

        if (savedSection) {
            setSelectedSectionKey(savedSection)
            onPaymentChange?.(savedSection)
        }
        if (savedMethod) {
            setSelectedMethodKey(savedMethod)
        }
    }, [])

    const handleChange = (sectionKey: string) => {
        const prevSection = selectedSectionKey;

        // Check if the section has changed
        if (prevSection !== sectionKey) {
            // If changing from the "company_payment_section", clear related data
            if (prevSection === "company_payment_section" && sectionKey !== "company_payment_section") {
                localStorage.removeItem(COMPANY_EDRPOU_KEY);
                localStorage.removeItem(COMPANY_EMAIL_KEY);
            }
            setSelectedSectionKey(sectionKey);
            localStorage.setItem(PAYMENT_SECTION_STORAGE_KEY, sectionKey);
            onPaymentChange?.(sectionKey);

            // If the section has changed, reset the payment method if it's no longer valid
            const section = PaymentSections.find(s => s.key === sectionKey);
            if (section && !section.methodsKeys.includes(selectedMethodKey || "")) {
                setSelectedMethodKey(null);
                localStorage.removeItem(PAYMENT_METHOD_STORAGE_KEY);
            }
        }
    };

    const renderPaymentDetails = (sectionId: number) => {
        switch (sectionId) {
            case PaymentSectionIDs.ONLINE:
                return <NestedOnlinePaymentMethods section={PaymentSections.find(s => s.id === sectionId) ?? null}/>;
            case PaymentSectionIDs.CREDIT_FUNDS:
                return <CreditFundsPaymentMethodDetails/>;
            case PaymentSectionIDs.COMPANY:
                return <CompanyPaymentMethodDetails selectedSectionKey={PaymentSections.find(s => s.id === sectionId)?.key ?? null}/>;
            default:
                return null;
        }
    };

    return (
        <RadioGroup
            value={selectedSectionKey ?? undefined}
            onValueChange={handleChange}
            className="gap-4 [--primary:var(--color-rose-500)] [--ring:var(--color-rose-300)] in-[.dark]:[--primary:var(--color-rose-500)] in-[.dark]:[--ring:var(--color-rose-900)]"
        >
            {PaymentSections.map((section) => (
                <div
                    key={section.key}
                    className="border-input has-data-[state=checked]:border-rose-500 relative flex items-start gap-3 rounded-md border-2 p-4"
                >
                    <div className="flex w-full items-start justify-between gap-2">
                        <RadioGroupItem
                            value={section.key}
                            id={`${id}-${section.key}`}
                            className="cursor-pointer order-1 after:absolute after:inset-0"
                        />
                        <div className="grid gap-1">
                            <div className="flex flex-cols items-center gap-x-2">
                                {section.icon && <section.icon/>}
                                <Label htmlFor={`${id}-${section.key}`} className="text-sm font-medium">
                                    {section.title}
                                </Label>
                            </div>
                            <p className="text-xs text-muted-foreground font-thin wrap-all">
                                {section.description}
                            </p>

                            {selectedSectionKey === section.key && renderPaymentDetails(section.id)}
                        </div>
                    </div>
                </div>
            ))}
        </RadioGroup>
    )
}
