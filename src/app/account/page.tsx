"use client"

import {useEffect} from "react";
import {useRouter} from "next/navigation";

import {AccountSidebarButtons} from "@/data/static/account-sidebar-buttons";

const AccountPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.push(`/account/${AccountSidebarButtons[0].link}`);
    }, [router]);
    return null;
}

export default AccountPage;