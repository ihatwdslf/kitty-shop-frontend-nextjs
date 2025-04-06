import {IconType} from "react-icons";
import {FaRegCreditCard} from "react-icons/fa";
import {FaBuilding} from "react-icons/fa6";
import {BsCashStack} from "react-icons/bs";
import {TbPigMoney} from "react-icons/tb";

export const PAYMENT_METHOD_STORAGE_KEY = "selected_payment_method"
export const PAYMENT_SECTION_STORAGE_KEY = "selected_payment_section";

export interface PaymentSectionType {
    id: number;
    title: string;
    key: string;
    description: string;
    methodsKeys: string[];
    icon: IconType;
}

// Constants for payment section IDs
export const PaymentSectionIDs = {
    ON_DELIVERY: 0,
    ONLINE: 1,
    CREDIT_FUNDS: 2,
    COMPANY: 3,
};

// Array of online payment methods
export const OnlinePaymentMethods: string[] = [
    "online_pay_credit_card",
    "online_pay_privat24",
    "online_pay_apple",
    "online_pay_google"
];

export const PaymentSections: PaymentSectionType[] = [
    {
        id: PaymentSectionIDs.ON_DELIVERY,
        title: "Оплата при отриманні",
        key: "on_delivery_payment_section",
        description: "Ви маєте можливість оплатити своє замовлення готівкою, банківською карткою або онлайн під час отримання",
        methodsKeys: ["on_delivery_pay"],
        icon: BsCashStack
    },
    {
        id: PaymentSectionIDs.ONLINE,
        title: "Оплатити зараз",
        key: "online_payment_section",
        description: "Зручна онлайн оплата",
        methodsKeys: OnlinePaymentMethods,
        icon: FaRegCreditCard
    },
    {
        id: PaymentSectionIDs.CREDIT_FUNDS,
        title: "Оплата частинами кредитними коштами",
        key: "credit_funds_payment_section",
        description: "До 9 платежів від 6300 ₴ на місяць",
        methodsKeys: ["credit_funds_pay"],
        icon: TbPigMoney
    },
    {
        id: PaymentSectionIDs.COMPANY,
        title: "Рахунок підприємства",
        key: "company_payment_section",
        description: "Оплата для підприємств",
        methodsKeys: ["company_pay"],
        icon: FaBuilding
    }
]