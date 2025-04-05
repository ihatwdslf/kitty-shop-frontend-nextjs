import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {useAuth} from "@/context/AuthContext";
import {ApiError} from "@/data/response/ApiError";
import {FcSupport} from "react-icons/fc";
import {AUTH_TOKEN_COOKIE_NAME} from "@/data/apiClient";

const SessionErrorOccurredAlert = () => {

    const {user} = useAuth();

    const response = user as ApiError;
    const isCouldNotUser = () => {
        const isMsgStartsWithCouldNotLoadUserByEmail = response?.message?.startsWith("Couldn't load user");
        const isDetailsContainsData = !!response?.details?.search("user were deleted or deactivated");
        const isTrySolutionContainsCookieName = response?.try?.search(AUTH_TOKEN_COOKIE_NAME);
        return !!(response?.code === 404
            && isMsgStartsWithCouldNotLoadUserByEmail
            && isDetailsContainsData
            && isTrySolutionContainsCookieName);
    }

    function extractEmail(message: string) {
        if (!message) return null;
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const match = message.match(emailRegex);
        return match ? match[0] : null;
    }

    return (
        <AlertDialog open={isCouldNotUser()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">Помилка сесії !</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="py-3">
                            Неможливо завантажити користувача:
                            <div className="font-light">
                                {extractEmail(response?.message)}
                            </div>
                        </div>
                        <hr/>
                        <div className="py-5">
                            <div className="flex flex-cols items-center justify-start gap-2">
                                <FcSupport/>
                                <div>
                                    Зверніться до служби підтримки.
                                </div>
                            </div>
                            <div className="pt-3 font-light">
                                Можливо, ваш користувач був видалений або деактивований на попередньому екземплярі
                                сервера.
                            </div>
                        </div>
                        <hr/>
                        <div className="py-5">
                            Також ви можете спробувати рішення проблеми, передбачене розробниками:
                            <ul className="list-decimal pt-3 pl-7 font-light">
                                <li>Відкрийте DevTools (F12)</li>
                                <li>Application (Додаток)</li>
                                <li>Файли cookie</li>
                                <li>{window.location.host}</li>
                                <li> Видалити файл cookie {AUTH_TOKEN_COOKIE_NAME}</li>
                            </ul>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={() => window.location.reload()}
                        className="w-full cursor-pointer bg-rose-400 hover:bg-rose-500"
                    >
                        Зрозуміло! Я видалив(-ла) токен
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SessionErrorOccurredAlert;