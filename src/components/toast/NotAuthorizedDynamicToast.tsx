"use client"

import {RefObject, useCallback, useEffect, useState} from "react"
import {CircleCheckIcon, XIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport,} from "@/components/ui/toast"
import {useAuth} from "@/context/AuthContext";
import {useProgressTimer} from "@/hooks/use-progress-timer";

interface NotAuthorizedDynamicToastProps {
    triggerRef: RefObject<HTMLElement> | RefObject<HTMLDivElement | null> | RefObject<HTMLButtonElement | null>;
}

export default function NotAuthorizedDynamicToast({triggerRef}: NotAuthorizedDynamicToastProps) {

    const {authorized} = useAuth();

    const [open, setOpen] = useState(false)
    const toastDuration = 5000
    const {progress, start, reset} = useProgressTimer({
        duration: toastDuration,
        onComplete: () => setOpen(false),
    })

    const handleOpenChange = useCallback(
        (isOpen: boolean) => {
            setOpen(isOpen)
            if (isOpen) {
                reset()
                start()
            }
        },
        [reset, start]
    )

    const handleTriggerClick = useCallback(() => {
        handleOpenChange(true)
    }, [handleOpenChange])

    useEffect(() => {
        const triggerElement = triggerRef.current;
        if (triggerElement) {
            triggerElement.addEventListener('click', handleTriggerClick);
        }

        return () => {
            if (triggerElement) {
                triggerElement.removeEventListener('click', handleTriggerClick);
            }
        };
    }, [triggerRef, handleTriggerClick]);

    return !authorized ? (
        <ToastProvider>
            <Toast
                open={open}
                onOpenChange={handleOpenChange}
            >
                <div className="flex w-full justify-between gap-3">
                    <CircleCheckIcon
                        className="mt-0.5 shrink-0 text-red-500"
                        size={16}
                        aria-hidden="true"
                    />
                    <div className="flex grow flex-col gap-3">
                        <div className="space-y-1">
                            <ToastTitle>Необхідно авторизуватися!</ToastTitle>
                            <ToastDescription>
                                Для виконання цієї дії необхідно авторизуватися на сайті.
                            </ToastDescription>
                        </div>
                    </div>
                    <ToastClose asChild>
                        <Button
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
                        className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-red-500"
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
