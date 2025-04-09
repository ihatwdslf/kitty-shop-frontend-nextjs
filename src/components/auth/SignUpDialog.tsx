"use client"

import React, {useState} from "react";

import Image from "next/image";
import {useLoading} from "@/context/LoadingContext";
import {useAuth} from "@/context/AuthContext";

import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

import {UserRegistrationRequestDto} from "@/data/request/auth/UserRegistrationRequestDto";
import {CommonLocators, IDLocatorBuilder} from "@/utils/locators/id-locator-builder";

interface SignUpDialogProps {
    open: boolean;
    setOpenAction: (open: boolean) => void;
    onSwitchToSignInAction: () => void;
    onShowSuccessToastAction: () => void;
}

const Locators = {
    DIALOG: "sign-up-dialog",

    FIRST_NAME_INPUT: "first-name-input",
    FIRST_NAME_INPUT_LABEL: "first-name-input-label",

    LAST_NAME_INPUT: "last-name-input",
    LAST_NAME_INPUT_LABEL: "last-name-input-label",

    EMAIL_INPUT: "email-input",
    EMAIL_INPUT_LABEL: "email-input-label",

    PASSWORD_INPUT: "password-input",
    PASSWORD_INPUT_LABEL: "password-input-label",

    REPEAT_PASSWORD_INPUT: "repeat-password-input",
    REPEAT_PASSWORD_INPUT_LABEL: "repeat-password-input-label",

    OR_LABEL: "or-label",
    SIGN_UP_BUTTON: "sign-up-button",
    SIGN_IN_BUTTON: "sign-in-button",
}

export default function SignUpDialog({
                                         open,
                                         setOpenAction,
                                         onSwitchToSignInAction,
                                         onShowSuccessToastAction
                                     }: SignUpDialogProps) {

    const idBuilder = new IDLocatorBuilder(Locators.DIALOG);

    const {loading} = useLoading();
    const {register, error} = useAuth();

    const [credentials, setCredentials] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: ""
        } as UserRegistrationRequestDto
    );

    // @ts-expect-error("any type")
    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    // @ts-expect-error("any type")
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const registered = await register(credentials); // Call login function from context
            if (registered) {
                setOpenAction(false);
                onShowSuccessToastAction();
            }
        } catch (err) {
            const error = err as Error;
            console.error(error)
        }
    };

    const handleSignInButtonClick = (e: React.MouseEvent) => {
        e.preventDefault()
        onSwitchToSignInAction()
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpenAction(!open)}>
            <DialogContent>
                <div className="flex flex-col items-center gap-2">
                    <Image
                        src="/common/kuromi-logo.png"
                        alt="kuromi-logo"
                        width={40}
                        height={40}
                    />
                    <DialogHeader>
                        <DialogTitle
                            id={idBuilder.generateLocator(CommonLocators.TITLE)}
                            className="sm:text-center"
                        >
                            О! Ти тут вперше?
                        </DialogTitle>
                        <DialogDescription
                            id={idBuilder.generateLocator(CommonLocators.DESCRIPTION)}
                            className="sm:text-center"
                        >
                            Введи свої дані, щоб зареєструватися.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        <div className="*:not-first:mt-2">
                            <Label
                                id={idBuilder.generateLocator(Locators.FIRST_NAME_INPUT_LABEL)}
                                htmlFor={idBuilder.generateLocator(Locators.FIRST_NAME_INPUT)}
                            >
                                Ім&#39;я
                            </Label>
                            <Input
                                id={idBuilder.generateLocator(Locators.FIRST_NAME_INPUT)}
                                name="firstName"
                                placeholder="Введіть своє ім'я"
                                type="text"
                                value={credentials.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label
                                id={idBuilder.generateLocator(Locators.LAST_NAME_INPUT_LABEL)}
                                htmlFor={idBuilder.generateLocator(Locators.LAST_NAME_INPUT)}
                            >
                                Прізвище
                            </Label>
                            <Input
                                id={idBuilder.generateLocator(Locators.LAST_NAME_INPUT)}
                                name="lastName"
                                placeholder="Введіть своє прізвище"
                                type="text"
                                value={credentials.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label
                                id={idBuilder.generateLocator(Locators.EMAIL_INPUT_LABEL)}
                                htmlFor={idBuilder.generateLocator(Locators.EMAIL_INPUT)}
                            >
                                Електронна пошта
                            </Label>
                            <Input
                                id={idBuilder.generateLocator(Locators.EMAIL_INPUT)}
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
                                id={idBuilder.generateLocator(Locators.PASSWORD_INPUT_LABEL)}
                                htmlFor={idBuilder.generateLocator(Locators.PASSWORD_INPUT)}
                            >
                                Пароль
                            </Label>
                            <Input
                                id={idBuilder.generateLocator(Locators.PASSWORD_INPUT)}
                                name="password"
                                placeholder="Введіть свій пароль"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label
                                id={idBuilder.generateLocator(Locators.REPEAT_PASSWORD_INPUT_LABEL)}
                                htmlFor={idBuilder.generateLocator(Locators.REPEAT_PASSWORD_INPUT)}
                            >
                                Повторіть пароль
                            </Label>
                            <Input
                                id={idBuilder.generateLocator(Locators.REPEAT_PASSWORD_INPUT)}
                                name="repeatPassword"
                                placeholder="Повторіть свій пароль"
                                type="password"
                                value={credentials.repeatPassword}
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
                        type="submit"
                        className="w-full bg-rose-400 hover:bg-rose-500 cursor-pointer"
                        disabled={loading}
                        id={idBuilder.generateLocator(Locators.SIGN_UP_BUTTON)}
                    >
                        {loading ? "Завантаження..." : "Зареєструватися"}
                    </Button>
                </form>

                <div
                    className="before:bg-border after:bg-border flex items-center gap-3
                        before:h-px before:flex-1 after:h-px after:flex-1"
                >
                    <span
                        id={idBuilder.generateLocator(Locators.OR_LABEL)}
                        className="text-muted-foreground text-xs"
                    >
                        або
                    </span>
                </div>

                <Button
                    id={idBuilder.generateLocator(Locators.SIGN_IN_BUTTON)}
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={handleSignInButtonClick}
                >
                    Увійти
                </Button>
            </DialogContent>
        </Dialog>
    )
}
