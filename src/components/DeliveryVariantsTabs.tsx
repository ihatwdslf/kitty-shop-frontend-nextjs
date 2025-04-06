import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import ChooseDeliveryTypeRadio from "@/components/ChooseDeliveryTypeRadio";
import {useEffect, useState} from "react";
import {DELIVERY_OPTION_STORAGE_KEY, DeliveryOptions, findTabByKey} from "@/data/static/delivery-options";
import {formatPrice} from "@/utils/price";

export default function DeliveryVariantsTabs() {
    const [activeTab, setActiveTab] = useState<keyof typeof DeliveryOptions>("selfDeliveryTab")

    useEffect(() => {
        const savedKey = localStorage.getItem(DELIVERY_OPTION_STORAGE_KEY)
        if (savedKey) {
            const tab = findTabByKey(savedKey)
            if (tab) setActiveTab(tab)
        }
    }, [])

    const handleDeliveryChange = (key: string) => {
        const tab = findTabByKey(key)
        if (tab) {
            setActiveTab(tab)
            localStorage.setItem(DELIVERY_OPTION_STORAGE_KEY, key)
        }
    }

    return (
        <Tabs
            value={activeTab}
            onValueChange={(val) => {
                // Це тип безпеки, щоб React не скаржився
                if (val === "selfDeliveryTab" || val === "courierDeliveryTab") {
                    setActiveTab(val)
                }
            }}
        >
            <TabsList className="mx-auto flex w-full bg-transparent">
                <TabsTrigger
                    value="selfDeliveryTab"
                    className="group cursor-pointer data-[state=active]:bg-rose-400 data-[state=active]:text-white bg-gray-100 flex-1 flex-col p-3 py-5 text-sm"
                >
                    Самовивіз
                </TabsTrigger>
                <TabsTrigger
                    value="courierDeliveryTab"
                    className="group cursor-pointer data-[state=active]:bg-rose-400 data-[state=active]:text-white bg-gray-100 flex-1 flex-col p-3 py-2.5 text-sm"
                >
                    Кур&#39;єром
                    <div>
                        від {formatPrice(199)}
                    </div>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="selfDeliveryTab">
                <ChooseDeliveryTypeRadio
                    activeTab="selfDeliveryTab"
                    onDeliveryChange={handleDeliveryChange}
                />
            </TabsContent>
            <TabsContent value="courierDeliveryTab">
                <ChooseDeliveryTypeRadio
                    activeTab="courierDeliveryTab"
                    onDeliveryChange={handleDeliveryChange}
                />
            </TabsContent>
        </Tabs>
    )
}
