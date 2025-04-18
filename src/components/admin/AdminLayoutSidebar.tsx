import {useAuth} from "@/context/AuthContext";
import UserSidebarAvatar from "@/components/account/sidebar/UserSidebarAvatar";
import UserShortInformationSidebar from "@/components/account/sidebar/UserShortInformationSidebar";
import Link from "next/link";
import {Routes} from "@/data/static/routes";
import {cn} from "@/utils/class-value";
import {AdminSidebarButtons} from "@/data/static/admin-sidebar-buttons";

const AdminLayoutSidebar = () => {

    const {user} = useAuth();

    return (
        <div className="bg-white w-full h-full col-span-2 p-4 overflow-hidden">
            <div className="py-5 items-center justify-center">
                <div className="border-b-2 flex flex-cols justify-between items-center pb-5">
                    <UserSidebarAvatar user={user?.data}/>
                    <UserShortInformationSidebar user={user?.data}/>
                </div>
                <div className="py-5">
                    {AdminSidebarButtons.map((sidebarBtn) => (
                        <div
                            className="py-3 border-b-1 border-opacity-10"
                            key={`sidebar_btn:${sidebarBtn.link}`}
                        >
                            <Link
                                href={Routes.ADMIN_SIDEBAR(sidebarBtn.link)}
                                className={cn("inline-flex items-center justify-center font-light text-[12px] " +
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
        </div>
    );
};

export default AdminLayoutSidebar;