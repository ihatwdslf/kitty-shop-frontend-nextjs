import {Button} from "@/components/ui/button"
import {BiUserCircle} from "react-icons/bi";

export default function LoginButton() {
    return (
        <Button className="bg-rose-400 hover:bg-rose-500 cursor-pointer">
            <BiUserCircle size={32} aria-hidden="true"/>
            Увійти
        </Button>
    )
}
