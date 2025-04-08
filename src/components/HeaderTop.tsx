import {BsFacebook, BsInstagram, BsLinkedin, BsTwitterX} from "react-icons/bs";

const HeaderTop = () => {
    return (
        <div className="border-b border-gray-200 hidden sm:block">
            <div className="container py-4">
                <div className="flex justify-between items-center">
                    <div className="hidden lg:flex gap-1">
                        <div className="header_top__icon_wrapper">
                            <BsFacebook />
                        </div>
                        <div className="header_top__icon_wrapper">
                            <BsTwitterX />
                        </div>
                        <div className="header_top__icon_wrapper">
                            <BsInstagram />
                        </div>
                        <div className="header_top__icon_wrapper">
                            <BsLinkedin />
                        </div>
                    </div>

                    <div className="text-gray-500 text-[12px] uppercase">
                        <b>Безкоштовна доставка</b> на цьому тижні при замовленні від $55
                    </div>

                    <div>
                        <select
                            className="text-gray-500 text-[12px] w-[70px]"
                            name="currency"
                            id="currency"
                        >
                            <option value="UAH ₴">UAH ₴</option>
                        </select>

                        <select
                            className="text-gray-500 text-[12px] w-[100px]"
                            name="language"
                            id="language"
                        >
                            <option value="Ukrainian">Українська</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;