﻿import {User} from "@/data/response/user/User";
import React from "react";
import {BiSolidEdit} from "react-icons/bi";

interface EmailAndPhoneSidebarProps {
    user: User | undefined;
}

const EmailAndPhoneSidebar: React.FC<EmailAndPhoneSidebarProps> = ({user}) => {
    return (
        <div>
            <div className="flex items-center justify-between text-sm pb-1">
                <div>
                    {user?.firstName ?? "Невідомо"}
                    {" "}
                    {user?.lastName ?? "Невідомо"}
                </div>
                <div className="cursor-pointer">
                    <BiSolidEdit size={20}/>
                </div>
            </div>
            <InfoItemDetails itemData={user?.phone} itemLabel={`Номер мобільного`}/>
            <InfoItemDetails itemData={user?.email} itemLabel={`E-mail`}/>
        </div>
    )
}

interface InfoItemDetailsProps {
    itemData: string | undefined;
    itemLabel: string;
}

const InfoItemDetails: React.FC<InfoItemDetailsProps> = ({itemLabel, itemData}) => {
    return (
        <div className="pb-2">
            <div className="pr-2 font-light">
                    <span className="text-xs text-muted-foreground">
                        {itemLabel}
                    </span>
                <div className="text-xs">
                    {itemData ? itemData : "-"}
                </div>
            </div>
        </div>
    )
}

export default EmailAndPhoneSidebar;