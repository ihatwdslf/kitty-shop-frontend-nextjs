"use client"

import ChoosePaymentTypeRadio from "@/components/ChoosePaymentTypeRadio";
import {PAYMENT_METHOD_STORAGE_KEY, PaymentSections} from "@/data/reference/payment-sections";
import {useEffect, useState} from "react";

const CheckOutPurchasePaymentPage = () => {

    const [activeSection, setActiveSection] = useState<string | null>(null)

    useEffect(() => {
        const savedKey = localStorage.getItem(PAYMENT_METHOD_STORAGE_KEY)
        if (savedKey) {
            const foundSection = PaymentSections.find(section =>
                section.methodsKeys.includes(savedKey)
            )
            if (foundSection) {
                setActiveSection(foundSection.key)
            }
        }
    }, [])

    const handlePaymentChange = (methodKey: string) => {
        const section = PaymentSections.find(section =>
            section.methodsKeys.includes(methodKey)
        )

        if (section) {
            setActiveSection(section.key)
            localStorage.setItem(PAYMENT_METHOD_STORAGE_KEY, methodKey)
        }
    }

    return (
        <div>
            <ChoosePaymentTypeRadio
                onDeliveryChange={handlePaymentChange}
            />
        </div>
    )
}

export default CheckOutPurchasePaymentPage;