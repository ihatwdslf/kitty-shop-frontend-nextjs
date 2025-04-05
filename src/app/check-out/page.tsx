"use client"

import {useEffect} from "react";
import {useRouter} from "next/navigation";

const CheckOutPage = () => {
    const router = useRouter();
    useEffect(() => {
        router.push(`/check-out/cart`);
    }, [router]);
    return null;
}

export default CheckOutPage;