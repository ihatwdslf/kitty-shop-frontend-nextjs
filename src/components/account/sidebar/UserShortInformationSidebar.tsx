import {User, UserRoleDefaults} from "@/data/response/user/User";
import React from "react";
import {BiSolidEdit} from "react-icons/bi";

interface UserShortInformationSidebarProps {
    user: User | undefined;
}

const UserShortInformationSidebar: React.FC<UserShortInformationSidebarProps> = ({user}) => {

    const getAcpRole = (role: string | undefined) => {
        switch (role) {
            case UserRoleDefaults.ADMIN:
                return "Адміністратор";
            case UserRoleDefaults.MANAGER:
                return "Менеджер";
            default:
                return "Користувач";
        }
    }

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
            <InfoItemDetails itemData={getAcpRole(user?.role?.role)} itemLabel={`Роль`}/>
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

export default UserShortInformationSidebar;