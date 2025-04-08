"use client"

import React, {useEffect, useRef, useState} from "react";
import CompanyPaymentScalableInput from "@/components/CompanyPaymentScalableInput";

export const COMPANY_EDRPOU_OR_IPN_STORAGE_KEY = "company_edrpou_or_ipn"
export const COMPANY_EMAIL_STORAGE_KEY = "company_email"

interface CompanyPaymentMethodDetailsProps {
    selectedSectionKey: string | null // Added prop for selected section
}

export const ERDPOU_OR_IPN_REGEX = /\b\d{8}\b|\b\d{10}\b/g;
export const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const CompanyPaymentMethodDetails: React.FC<CompanyPaymentMethodDetailsProps> = ({selectedSectionKey}) => {

    console.log(selectedSectionKey)

    const [edrpou, setEdrpou] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)

    const prevSelectedSectionKey = useRef<string | null>(null) // Track the previous section

    // Load saved data when the component mounts (if it exists in localStorage)
    useEffect(() => {
        const savedEdrpou = localStorage.getItem(COMPANY_EDRPOU_OR_IPN_STORAGE_KEY)
        const savedEmail = localStorage.getItem(COMPANY_EMAIL_STORAGE_KEY)

        if (savedEdrpou) {
            setEdrpou(savedEdrpou)
        }

        if (savedEmail) {
            setEmail(savedEmail)
        }
    }, [])

    // Compare previous and current section to clear data if switching to another section
    useEffect(() => {
        if (prevSelectedSectionKey.current && prevSelectedSectionKey.current !== selectedSectionKey) {
            if (selectedSectionKey !== "company_payment_section") {
                // If we are changing from the "company_payment_section", remove data from localStorage
                localStorage.removeItem(COMPANY_EDRPOU_OR_IPN_STORAGE_KEY)
                localStorage.removeItem(COMPANY_EMAIL_STORAGE_KEY)
                setEdrpou(null)
                setEmail(null)
            }
        }

        // Update the previous section key
        prevSelectedSectionKey.current = selectedSectionKey
    }, [selectedSectionKey]) // Runs when selectedSectionKey changes

    // Save data to localStorage and update state when input changes
    const handleEdrpouChange = (value: string) => {
        setEdrpou(value)
        localStorage.setItem(COMPANY_EDRPOU_OR_IPN_STORAGE_KEY, value)
    }

    const handleEmailChange = (value: string) => {
        setEmail(value)
        localStorage.setItem(COMPANY_EMAIL_STORAGE_KEY, value)
    }

    return (
        <div className="mt-4">
            <div className="px-3 py-2 rounded-md bg-amber-100 text-[10px] font-thin">
                <b>Залиште свої дані, і ми подбаємо про все решту!</b> Наш експерт зв&#39;яжеться з вами, щоб уточнити
                деталі замовлення.
            </div>
            <div className="flex h-6 gap-x-5 mt-5 my-2.5">
                <CompanyPaymentScalableInput
                    id="company-payment-method-details-edrpou-ipn"
                    placeholder="ЄДРПОУ / ІПН"
                    value={edrpou ?? ""}
                    onChange={(e) => handleEdrpouChange(e.target.value)}
                />
                <CompanyPaymentScalableInput
                    id="company-payment-method-details-email"
                    placeholder="Електронна пошта"
                    value={email ?? ""}
                    onChange={(e) => handleEmailChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default CompanyPaymentMethodDetails;