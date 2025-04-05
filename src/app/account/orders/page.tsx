import React from "react";
import OrderTabs from "@/components/OrderTabs";

const AccountOrdersPage = () => {
    return (
        <div className="w-full h-full p-5 overflow-hidden">
            <div className="text-lg">
                Мої замовлення
            </div>
            <div className="pt-5">
                <OrderTabs />
            </div>
        </div>
    )
}

export default AccountOrdersPage;