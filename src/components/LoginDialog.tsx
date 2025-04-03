"use client"

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import LoginButton from "@/components/LoginButton";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";
import {useLoading} from "@/context/LoadingContext";

export default function LoginDialog() {

    const router = useRouter();

    const { loading } = useLoading();
    const { login, error, user } = useAuth();

    const [opened, setOpened] = useState(false);
    const [credentials, setCredentials] = useState({email: "", password: ""});

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
                setOpened(false);
                router.refresh();
            }
        } catch (err) {
            const error = err as Error;
            console.error(error)
        }
    };

    useEffect(() => {
        console.log("user: " + user)
    }, [user]);

    return (
        <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
            <DialogTrigger>
                <LoginButton/>
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                    >
                        <svg
                            className="stroke-zinc-800 dark:stroke-zinc-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                        >
                            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8"/>
                        </svg>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">З поверненням!</DialogTitle>
                        <DialogDescription className="sm:text-center">
                            Введіть свої дані, щоб увійти до облікового запису.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`login_dialog_email_input`}>Електронна пошта</Label>
                            <Input
                                id={`login_dialog_email_input`}
                                name="email"
                                placeholder="Введіть свою електронну пошту"
                                type="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`login_dialog_password_input`}>Пароль</Label>
                            <Input
                                id={`login_dialog_password_input`}
                                name="password"
                                placeholder="Введіть свій пароль"
                                type="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex justify-between gap-2">
                        <a className="text-sm underline hover:no-underline" href="#">
                            Забули пароль?
                        </a>
                    </div>
                    <Button type="submit" className="w-full bg-rose-400 hover:bg-rose-500 cursor-pointer" disabled={loading}>
                        {loading ? "Завантаження..." : "Увійти"}
                    </Button>
                </form>

                <div
                    className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
                    <span className="text-muted-foreground text-xs">або</span>
                </div>

                <Button variant="outline" className="cursor-pointer">Зареєструватися</Button>
            </DialogContent>
        </Dialog>
    )
}
