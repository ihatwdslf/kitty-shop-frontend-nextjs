import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {UserRoundIcon} from "lucide-react";
import React from "react";
import {User} from "@/data/response/user/User";

interface UserSidebarAvatarProps {
    user: User | undefined;
}

const UserSidebarAvatar: React.FC<UserSidebarAvatarProps> = ({user}) => {
    return (
        <Avatar className="w-20 h-20">
            {user?.firstName && user?.lastName ? (
                <AvatarFallback className="text-xl bg-rose-400 text-white">
                    {user?.firstName[0].toUpperCase()}
                    {user?.lastName[0].toUpperCase()}
                </AvatarFallback>
            ) : (
                <AvatarFallback className="bg-rose-400 text-white">
                    <UserRoundIcon size={20} className="opacity-60" aria-hidden="true"/>
                </AvatarFallback>
            )}
        </Avatar>
    )
}

export default UserSidebarAvatar;