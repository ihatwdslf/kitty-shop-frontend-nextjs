"use client"

import {useAuth} from "@/context/AuthContext";
import UserSidebarAvatar from "@/components/account/sidebar/UserSidebarAvatar";
import EmailAndPhoneSidebar from "@/components/account/sidebar/EmailAndPhoneSidebar";
import {AccountSidebarButtons} from "@/data/static/account-sidebar-buttons";
import Link from "next/link";
import {cn} from "@/utils/classValue";
import {Button} from "@/components/ui/button";
import {IoLogOutOutline} from "react-icons/io5";
import {useRouter} from "next/navigation";

const AccountPageSidebar = () => {

    const router = useRouter();
    const {user, logout} = useAuth();

    const handleLogout = async () => {
        router.push("/"); // Перенаправляємо на головну
        await logout(); // Викликаємо logout з контексту
        window.location.reload(); // Перезавантажуємо сторінку
    };

    return (
        <div className="bg-white w-full h-full col-span-2 p-4 overflow-hidden">
            <div className="py-5 items-center justify-center">
                <div className="border-b-2 flex flex-cols justify-between items-center pb-5">
                    <UserSidebarAvatar user={user?.data}/>
                    <EmailAndPhoneSidebar user={user?.data}/>
                </div>
                <div className="py-5">
                    {AccountSidebarButtons.map((sidebarBtn) => (
                        <div
                            className="py-4 border-b-1 border-opacity-10"
                            key={`sidebar_btn:${sidebarBtn.link}`}
                        >
                            <Link
                                href={`/account` + sidebarBtn.link}
                                className={cn("inline-flex items-center justify-center font-light text-sm " +
                                    "text-muted-foreground transition duration-300 ease-in-out hover:text-black group ", {})}
                            >
                                <sidebarBtn.icon size={24}/>
                                <div className="pl-2">
                                    {sidebarBtn.title}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
            <div className="flex items-center justify-end">
                <Button
                    variant="link"
                    className="cursor-pointer"
                    onClick={handleLogout}
                >
                    <IoLogOutOutline/>
                    <div>
                        Вийти
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default AccountPageSidebar;
