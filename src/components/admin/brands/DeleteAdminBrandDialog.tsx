import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React from "react";
import KuromiLogo from "@/components/common/KuromiLogo";
import {FaRegTrashAlt} from "react-icons/fa";
import {useBrands} from "@/hooks/use-brands";

interface DeleteAdminBrandDialogProps {
    brandId: number;
}

export default function DeleteAdminBrandDialog({brandId}: DeleteAdminBrandDialogProps) {

    const {deleteBrandMutation} = useBrands();

    const handleDeleteBrandButtonClick = () => {
        deleteBrandMutation.mutate(brandId);
        window.location.reload(); // Перезавантажуємо сторінку
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div
                    className="flex items-center gap-x-1 text-xs text-rose-400 hover:bg-rose-50 rounded-md px-3 py-2 cursor-pointer"
                    onClick={() => {
                    }}
                >
                    <FaRegTrashAlt size={16}/>
                    Видалити
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-200">
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                    <div
                        className="flex pr-2 shrink-0 items-center justify-center"
                        aria-hidden="true"
                    >
                        <KuromiLogo size={40}/>
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle
                            className="text-lg font-medium"
                        >
                            Ох... Ви точно впевнені?
                        </AlertDialogTitle>
                        <AlertDialogDescription
                            className="text-sm font-light"
                        >
                            Натискаючи на &#34;Видалити&#34;, ви повністю видалите бренд.<br/>
                            Його неможна буде повернути, це - кінцевий пункт!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="cursor-pointer"
                    >
                        Ні, я передумав(-ла)
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-rose-400 hover:bg-rose-500 rounded-md cursor-pointer"
                        onClick={handleDeleteBrandButtonClick}
                    >
                        Так, видалити
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
