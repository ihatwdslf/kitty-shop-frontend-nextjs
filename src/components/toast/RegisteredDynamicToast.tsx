"use client"

import {useEffect} from "react"
import {useAuth} from "@/context/AuthContext";
import {useProgressTimer} from "@/hooks/use-progress-timer";
import {CommonLocators, IDLocatorBuilder} from "@/utils/locators/id-locator-builder";

import {Button} from "@/components/ui/button"
import {CircleCheckIcon, XIcon} from "lucide-react"
import {Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport,} from "@/components/ui/toast"

interface RegisteredDynamicToastProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const Locators = {
    TOAST: "registered-dynamic-toast",
    CIRCLE_CHECK_ICON: "circle-check-icon",
}

export default function RegisteredDynamicToast({open, setOpen}: RegisteredDynamicToastProps) {

    const idBuilder = new IDLocatorBuilder(Locators.TOAST);

    const {authorized} = useAuth();

    const toastDuration = 5000
    const {progress, start, reset} = useProgressTimer({
        duration: toastDuration,
        onComplete: () => setOpen(false),
    })

    useEffect(() => {
        if (open) {
            reset();
            start();
        }
    }, [open]);

    return !authorized ? (
        <ToastProvider>
            <Toast
                open={open}
                onOpenChange={setOpen}
            >
                <div className="flex w-full justify-between gap-3">
                    <CircleCheckIcon
                        id={idBuilder.generateLocator(Locators.CIRCLE_CHECK_ICON)}
                        className="mt-0.5 shrink-0 text-green-500"
                        size={16}
                        aria-hidden="true"
                    />
                    <div className="flex grow flex-col gap-3">
                        <div className="space-y-1">
                            <ToastTitle
                                id={idBuilder.generateLocator(CommonLocators.TITLE)}
                            >
                                Ви успішно зареєструвалися!
                            </ToastTitle>
                            <ToastDescription
                                id={idBuilder.generateLocator(CommonLocators.DESCRIPTION)}
                            >
                                Тепер можете увійти у свій обліковий запис з введеними раніше даними.
                            </ToastDescription>
                        </div>
                    </div>
                    <ToastClose asChild>
                        <Button
                            id={idBuilder.generateLocator(CommonLocators.CLOSE_BUTTON)}
                            variant="ghost"
                            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent cursor-pointer"
                            aria-label="Close notification"
                        >
                            <XIcon
                                size={16}
                                className="opacity-60 transition-opacity group-hover:opacity-100"
                                aria-hidden="true"
                            />
                        </Button>
                    </ToastClose>
                </div>
                <div className="contents" aria-hidden="true">
                    <div
                        id={idBuilder.generateLocator(CommonLocators.PROGRESS_BAR)}
                        className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-green-500"
                        style={{
                            width: `${(progress / toastDuration) * 100}%`,
                            transition: "width 100ms linear",
                        }}
                    />
                </div>
            </Toast>
            <ToastViewport/>
        </ToastProvider>
    ) : null;
}
