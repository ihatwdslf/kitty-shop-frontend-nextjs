"use client"

import {useState} from "react";
import SignInDialog from "@/components/auth/SignInDialog";
import SignUpDialog from "@/components/auth/SignUpDialog";
import RegisteredDynamicToast from "@/components/toast/RegisteredDynamicToast";

export default function AuthDialogs() {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [showRegisterToast, setShowRegisterToast] = useState(false);

    const handleSwitchToSignUp = () => {
        setOpenLogin(false);
        setTimeout(() => setOpenRegister(true), 200); // wait for animation
    }

    const handleSwitchToSignIn = () => {
        setOpenRegister(false);
        setTimeout(() => setOpenLogin(true), 200); // wait for animation
    }

    const handleShowRegisterToast = () => {
        setShowRegisterToast(true);
    }

    return (
        <>
            <SignInDialog
                open={openLogin}
                setOpenAction={setOpenLogin}
                onSwitchToSignUpAction={handleSwitchToSignUp}
            />
            <SignUpDialog
                open={openRegister}
                setOpenAction={setOpenRegister}
                onSwitchToSignInAction={handleSwitchToSignIn}
                onShowSuccessToastAction={handleShowRegisterToast}
            />
            <RegisteredDynamicToast
                open={showRegisterToast}
                setOpen={setShowRegisterToast}
            />
        </>
    )
}