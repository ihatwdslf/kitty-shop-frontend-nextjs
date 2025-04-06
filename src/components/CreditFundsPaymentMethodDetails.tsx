import Image from "next/image";

const CreditFundsPaymentMethodDetails = () => {
    return (
        <div className="mt-4">
            <div className="px-3 py-2 rounded-md bg-amber-100 text-xs font-thin">
                Оплачуй за допомогою кредиту від наших партнерів!
            </div>
            <div className="flex flex-rows gap-x-8 h-6 pl-3 mt-5 my-2">
                <Image
                    src="/raiffeisen-bank-logo.svg"
                    alt="raiffeisen-bank-logo"
                    width={0}
                    height={0}
                    sizes="100vh"
                    quality={100}
                    style={{width: 'auto', height: '100%'}}
                />
                <Image
                    src="/credit-agricole-bank-logo.svg"
                    alt="credit-agricole-bank-logo"
                    width={0}
                    height={0}
                    sizes="100vh"
                    quality={100}
                    style={{width: 'auto', height: '100%'}}
                />
                <Image
                    src="/privat24-bank-logo.png"
                    alt="privat24-bank-logo"
                    width={0}
                    height={0}
                    sizes="100vh"
                    quality={100}
                    style={{width: 'auto', height: '100%'}}
                />
            </div>
        </div>
    );
};

export default CreditFundsPaymentMethodDetails;