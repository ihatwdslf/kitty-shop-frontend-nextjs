import {JSX} from "react";
import {PaymentSectionIDs, PaymentSections} from "@/data/reference/payment-sections";

export interface PaymentMethodType {
    id: number;
    key: string;
    name: string;
    section: string;
    icon?: () => JSX.Element;
}

const Privat24Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 32 32"
         className="cch-UidVJ">
        <path fill="#000" fill-opacity=".87"
              d="M15.23 19.62v1.64H7.89l.015-.25c.122-2.195.879-3.122 3.238-4.596l.531-.333c1.302-.831 1.863-1.479 1.863-2.468 0-1.036-.724-1.743-1.793-1.743-1.235 0-1.871.937-1.906 2.4l-.005.232H8.208l-.011-.226-.014-.293c0-2.2 1.455-3.682 3.62-3.682 2.116 0 3.517 1.3 3.517 3.285 0 1.81-.859 2.7-3.26 4.152l-.049.028-.373.222c-.978.583-1.485 1.02-1.723 1.631zm8.66-2.53v1.634h-1.436v2.536h-1.649v-2.536h-4.612v-1.516l.043-.135 4.636-6.67.196-.102h1.386v6.79zm-5.759-.003h2.674V13.13z"></path>
        <path fill="#8DC641"
              d="M16 0C7.168 0 0 7.168 0 16s7.168 16 16 16 16-7.168 16-16S24.832 0 16 0m0 29.968C8.3 29.968 2.032 23.7 2.032 16S8.3 2.032 16 2.032 29.968 8.3 29.968 16 23.7 29.968 16 29.968"></path>
    </svg>
)

const AppleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 33 32"
         className="cch-UidVJ">
        <path fill="#000"
              d="M16.836 6.457c1.593.133 3.185-.794 4.18-1.97.979-1.209 1.626-2.831 1.46-4.487-1.41.066-3.152.927-4.147 2.136-.912 1.043-1.692 2.732-1.493 4.321M17.085 8.08c1.095 0 3.069-1.44 5.374-1.308.896.066 3.484.331 5.143 2.782-.133.099-3.07 1.788-3.036 5.331.033 4.239 3.716 5.646 3.749 5.68-.033.098-.58 2.002-1.924 3.956-1.178 1.722-2.389 3.411-4.313 3.444-1.858.033-2.472-1.11-4.611-1.11-2.124 0-2.82 1.077-4.579 1.143-1.857.066-3.267-1.821-4.445-3.543-2.405-3.477-4.247-9.802-1.758-14.074 1.21-2.135 3.417-3.477 5.789-3.51 1.824-.033 3.5 1.209 4.611 1.209"></path>
    </svg>
)

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 33 32"
         className="cch-UidVJ">
        <path fill="#4285F4"
              d="M29.694 16.19c0-.946-.08-1.89-.24-2.821H16.373v5.343h7.493a6.42 6.42 0 0 1-2.77 4.215v3.468h4.472c2.618-2.414 4.127-5.984 4.127-10.206"></path>
        <path fill="#34A853"
              d="M16.372 29.746c3.744 0 6.896-1.23 9.195-3.349l-4.472-3.468c-1.245.844-2.848 1.326-4.723 1.326-3.618 0-6.69-2.44-7.788-5.727H3.978v3.575a13.87 13.87 0 0 0 12.394 7.643"></path>
        <path fill="#FBBC04"
              d="M8.585 18.529a8.3 8.3 0 0 1 0-5.31V9.643H3.978a13.87 13.87 0 0 0 0 12.459z"></path>
        <path fill="#EA4335"
              d="M16.372 7.492a7.53 7.53 0 0 1 5.322 2.081l3.96-3.96a13.33 13.33 0 0 0-9.282-3.612A13.87 13.87 0 0 0 3.978 9.644l4.606 3.574c1.099-3.287 4.17-5.726 7.788-5.726"></path>
    </svg>
)

export const PaymentMethods: PaymentMethodType[] = [
    {
        id: 1,
        key: "on_delivery_pay",
        name: "Оплата при отриманні",
        section: PaymentSections[PaymentSectionIDs.ON_DELIVERY].key
    },
    {
        id: 2,
        key: "online_pay_credit_card",
        name: "Карткою онлайн",
        section: PaymentSections[PaymentSectionIDs.ONLINE].key
    },
    {
        id: 3,
        key: "online_pay_privat24",
        name: "Privat 24",
        icon: Privat24Icon,
        section: PaymentSections[PaymentSectionIDs.ONLINE].key
    },
    {
        id: 4,
        key: "online_pay_apple",
        name: "Apple Pay",
        icon: AppleIcon,
        section: PaymentSections[PaymentSectionIDs.ONLINE].key
    },
    {
        id: 5,
        key: "online_pay_google",
        name: "Google Pay",
        section: PaymentSections[PaymentSectionIDs.ONLINE].key,
        icon: GoogleIcon
    },
    {
        id: 6,
        key: "credit_funds_pay",
        name: "Оплата частинами кредитними коштами",
        section: PaymentSections[PaymentSectionIDs.CREDIT_FUNDS].key
    },
    {
        id: 7,
        key: "company_pay",
        name: "Рахунок підприємства",
        section: PaymentSections[PaymentSectionIDs.COMPANY].key
    },
];