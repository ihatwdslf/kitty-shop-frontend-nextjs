"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";
import {useLoading} from "@/context/LoadingContext";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

import KuromiLogo from "@/components/common/KuromiLogo";
import AuthDialogsTriggerButton from "@/components/auth/AuthDialogsTriggerButton";

import {UserLoginRequestDto} from "@/data/request/auth/UserLoginRequestDto";
import {CommonLocators, IDLocatorBuilder} from "@/utils/locators/id-locator-builder";

interface SignInDialogProps {
    open: boolean;
    setOpenAction: (open: boolean) => void;
    onSwitchToSignUpAction: () => void;
}

const LocalLocators = {
    DIALOG: "sign-in-dialog",

    EMAIL_INPUT: "email-input",
    EMAIL_INPUT_LABEL: "email-input-label",

    PASSWORD_INPUT: "password-input",
    PASSWORD_INPUT_LABEL: "password-input-label",

    OR_LABEL: "or-label",
    SIGN_IN_BUTTON: "sign-in-button",
    SIGN_UP_BUTTON: "sign-up-button",
}

export default function SignInDialog({open, setOpenAction, onSwitchToSignUpAction}: SignInDialogProps) {

    const idBuilder = new IDLocatorBuilder(LocalLocators.DIALOG);

    const router = useRouter();

    const {loading} = useLoading();
    const {login, error} = useAuth();

    const [credentials, setCredentials] = useState(
        {
            email: "",
            password: ""
        } as UserLoginRequestDto
    );

    // @ts-expect-error("any type")
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    // @ts-expect-error("any type")
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const authorized = await login(credentials); // Call login function from context
            if (authorized) {
                setOpenAction(false);
                router.refresh();
            }
        } catch (err) {
            const error = err as Error;
            console.error(error)
        }
    };

    const handleSignUpButtonClick = (e: React.MouseEvent) => {
        e.preventDefault()
        onSwitchToSignUpAction()
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpenAction(!open)}>
            <DialogTrigger>
                <AuthDialogsTriggerButton/>
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col items-center gap-2">
                    <KuromiLogo size={40}/>
                    <DialogHeader>
                        <DialogTitle
                            id={idBuilder.generateLocator(CommonLocators.TITLE)}
                            className="sm:text-center"
                        >
                            З поверненням!
                        </DialogTitle>
                        <DialogDescription
                            id={idBuilder.generateLocator(CommonLocators.DESCRIPTION)}
                            className="sm:text-center"
                        >
                            Введіть свої дані, щоб увійти до облікового запису.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div className="*:not-first:mt-2">
                            <Label
                                id={idBuilder.generateLocator(LocalLocators.EMAIL_INPUT_LABEL)}
                                htmlFor={idBuilder.generateLocator(LocalLocators.EMAIL_INPUT)}
                            >
                                Електронна пошта
                            </Label>
                            <Input
                                id={idBuilder.generateLocator(LocalLocators.EMAIL_INPUT)}
                                name="email"
                                placeholder="Введіть свою електронну пошту"
                                type="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label
                                id={idBuilder.generateLocator(LocalLocators.PASSWORD_INPUT_LABEL)}
                                htmlFor={idBuilder.generateLocator(LocalLocators.PASSWORD_INPUT)}
                            >
                                Пароль
                            </Label>
                            <Input
                                id={idBuilder.generateLocator(LocalLocators.PASSWORD_INPUT)}
                                name="password"
                                placeholder="Введіть свій пароль"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {error &&
                        <p
                            id={idBuilder.generateLocator(CommonLocators.ERROR_LABEL)}
                            className="text-red-500 text-sm"
                        >
                            {error}
                        </p>
                    }
                    <Button
                        id={idBuilder.generateLocator(LocalLocators.SIGN_IN_BUTTON)}
                        type="submit"
                        className="w-full bg-rose-400 hover:bg-rose-500 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Завантаження..." : "Увійти"}
                    </Button>
                </form>

                <div
                    className="before:bg-border after:bg-border flex items-center gap-3
                        before:h-px before:flex-1 after:h-px after:flex-1"
                >
                    <span
                        id={idBuilder.generateLocator(LocalLocators.OR_LABEL)}
                        className="text-muted-foreground text-xs"
                    >
                        або
                    </span>
                </div>

                <Button
                    id={idBuilder.generateLocator(LocalLocators.SIGN_UP_BUTTON)}
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={handleSignUpButtonClick}
                >
                    Зареєструватися
                </Button>
            </DialogContent>
        </Dialog>
    )
}
