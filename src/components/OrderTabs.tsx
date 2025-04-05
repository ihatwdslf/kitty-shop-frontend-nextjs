import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {OrderStatuses} from "@/data/static/order-statuses";

export default function OrderTabs() {

    return (
        <Tabs defaultValue="tab-1">
            <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
                {OrderStatuses.map(orderStatus => (
                    <TabsTrigger
                        key={orderStatus.id}
                        value={`tab-${orderStatus.id}`}
                        className="cursor-pointer data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                        {orderStatus.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            {OrderStatuses.map(orderStatus => (
                <TabsContent key={orderStatus.id} value={`tab-${orderStatus.id}`}>
                    <p className="text-muted-foreground p-4 text-center text-xs">
                        {`Content for ${orderStatus.name}`}
                    </p>
                </TabsContent>
            ))}
        </Tabs>
    )
}
