import {WEBSITE_NAME} from "@/data/static/common";

export interface DeliveryOptionsItemType {
    key: string;
    label: string;
    deliveryAvailable: string;
    iconUrl: string | null;
    additionalPrice: number;
    description: string;
    changeAddressPlaceholder: string;
    changeAddressRegex: RegExp;
}

export interface DeliveryOptionsType {
    selfDeliveryTab: DeliveryOptionsItemType[];
    courierDeliveryTab: DeliveryOptionsItemType[];
}

const meestPostDate = new Date();
meestPostDate.setDate(meestPostDate.getDate() + 2);
const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'long'};
const formatter = new Intl.DateTimeFormat('uk-UA', options);
const formattedDate = formatter.format(meestPostDate);

const UA_ADDRESS_REGEX = /^(?:([А-ЯІЇЄҐа-яіїєґ'-]+(?:\s+[А-ЯІЇЄҐа-яіїєґ'-]+)*)\s+(?:обл(?:асть)?\.?|області))?(?:\s*,?\s*([А-ЯІЇЄҐа-яіїєґ'-]+(?:\s+[А-ЯІЇЄҐа-яіїєґ'-]+)*)\s+(?:р(?:айо)?н\.?|р-н))?(?:\s*,?\s*((?:м|смт|с|селище|село)\.?\s*[А-ЯІЇЄҐа-яіїєґ'-]+(?:\s+[А-ЯІЇЄҐа-яіїєґ'-]+)*))?(?:\s*,?\s*((?:вул|просп|пр|бульв|б-р|пров|площа|майдан|алея|набережна|наб|шосе|провулок|квартал|кв)\.?\s*[А-ЯІЇЄҐа-яіїєґ'-]+(?:\s+[А-ЯІЇЄҐа-яіїєґ'-]+)*))(?:\s*,?\s*(\d+(?:-\d+)?(?:\/\d+)?(?:[А-Яа-я])?))?$/;

const POST_ADDRESS_REGEX = /^(?:([А-ЯІЇЄҐа-яіїєґ'-]+(?:\s+[А-ЯІЇЄҐа-яіїєґ'-]+)*)\s+(?:обл(?:асть)?\.?|області))?(?:\s*,?\s*([А-ЯІЇЄҐа-яіїєґ'-]+(?:\s+[А-ЯІЇЄҐа-яіїєґ'-]+)*)\s+(?:р(?:айо)?н\.?|р-н))?(?:\s*,?\s*((?:м|смт|с|селище|село)\.?\s*[А-ЯІЇЄҐа-яіїєґ'-]+(?:\s+[А-ЯІЇЄҐа-яіїєґ'-]+)*))[,;]\s*(\d+)$/;

export const DeliveryOptions: DeliveryOptionsType = {
    selfDeliveryTab: [
        {
            key: "self_delivery_shop",
            label: "Самовивіз з магазину",
            deliveryAvailable: "Сьогодні",
            iconUrl: "/common/kuromi-logo.png",
            additionalPrice: 0,
            description: "Ми чекатимемо на тебе! Не забудь змінити місце отримання 💖",
            changeAddressPlaceholder: "м.Київ, вул. Грушевського, 5",
            changeAddressRegex: UA_ADDRESS_REGEX
        },
        {
            key: "self_delivery_nova_post",
            label: "До відділення Нова пошта",
            deliveryAvailable: "Завтра",
            iconUrl: "https://static.wikia.nocookie.net/logopedia/images/d/d8/Nova_Poshta_2019_symbol.svg",
            additionalPrice: 0,
            description: "Сьогодні тут, завтра там! Обери нове місце отримання та приходь 📦",
            changeAddressPlaceholder: "м.Київ, 163",
            changeAddressRegex: POST_ADDRESS_REGEX
        },
        {
            key: "self_delivery_meest_post",
            label: "До відділення Meest ПОШТА",
            deliveryAvailable: formattedDate,
            iconUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/Meest_Corporation_logo.svg",
            additionalPrice: 0,
            description: "Хороший варіант для міжнародної доставки. Обирай нове місце отримання! 🌎",
            changeAddressPlaceholder: "м.Київ, 36",
            changeAddressRegex: POST_ADDRESS_REGEX
        },
    ],
    courierDeliveryTab: [
        {
            key: "courier_delivery_shop",
            label: `Кур'єр ${WEBSITE_NAME}`,
            deliveryAvailable: "Завтра",
            iconUrl: "/common/kuromi-logo.png",
            additionalPrice: 119,
            description: "Наші кур'єри доставлять все в момент! Обирай нове місце отримання 💞",
            changeAddressPlaceholder: "м.Київ, вул. Грушевського, 5",
            changeAddressRegex: UA_ADDRESS_REGEX
        },
        {
            key: "courier_delivery_nova_post",
            label: "Кур'єр Нова пошта",
            deliveryAvailable: "Завтра",
            iconUrl: "https://static.wikia.nocookie.net/logopedia/images/d/d8/Nova_Poshta_2019_symbol.svg",
            additionalPrice: 259,
            description: "Кур'єри-колеги доставлять все вже завтра! Обирай нове місце отримання 🛵",
            changeAddressPlaceholder: "м.Київ, вул. Грушевського, 5",
            changeAddressRegex: UA_ADDRESS_REGEX
        },
    ]
}

export const DELIVERY_OPTION_STORAGE_KEY = "delivery-option-key"
export const DELIVERY_OPTION_CHANGE_EVENT = "deliveryChanged"

export const saveDeliveryKey = (key: string) => {
    localStorage.setItem(DELIVERY_OPTION_STORAGE_KEY, key);
    window.dispatchEvent(new Event(DELIVERY_OPTION_CHANGE_EVENT));
};

export const findTabByKey = (key: string): keyof typeof DeliveryOptions | null => {
    if (DeliveryOptions.selfDeliveryTab.some((opt) => opt.key === key)) return "selfDeliveryTab"
    if (DeliveryOptions.courierDeliveryTab.some((opt) => opt.key === key)) return "courierDeliveryTab"
    return null
}

export function getSavedDeliveryKey(): string | null {
    if (typeof window === "undefined") return null // SSR захист
    return localStorage.getItem(DELIVERY_OPTION_STORAGE_KEY)
}

export const getDeliveryOptionItemByKey = (key: string): DeliveryOptionsItemType | null => {
    const allOptions = Object.values(DeliveryOptions).flat();
    return allOptions.find(option => option.key === key) || null;
};