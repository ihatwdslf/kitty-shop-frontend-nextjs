import {Button} from "@/components/ui/button"
import {CgMenuGridR} from "react-icons/cg";
import {useRouter} from "next/navigation";

export default function CatalogButton() {

    const router = useRouter();

    return (
        <Button onClick={() => router.push("/products")} className="bg-rose-400 hover:bg-rose-500 cursor-pointer gap-1 px-3">
            <CgMenuGridR size={32} aria-hidden="true"/>
            Каталог
        </Button>
    )
}
