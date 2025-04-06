import {Input} from "@/components/ui/input";
import React from "react";

interface CompanyPaymentScalableInputProps {
    id: string;
    placeholder: string;
    value: any;
    onChange: (value: any) => void;
}

const CompanyPaymentScalableInput: React.FC<CompanyPaymentScalableInputProps> = ({
                                                                                     id,
                                                                                     placeholder,
                                                                                     value,
                                                                                     onChange
                                                                                 }) => {
    return (
        <div className="group relative">
            <label
                htmlFor={id}
                className="origin-start text-muted-foreground/70
                            group-focus-within:text-muted-foreground
                            absolute top-3/4 block
                            -translate-y-1/2 cursor-text px-1 text-xs transition-all
                            group-focus-within:pointer-events-none
                            group-focus-within:top-0
                            group-focus-within:cursor-default
                            group-focus-within:text-xs
                            group-focus-within:font-normal
                            has-[+input:not(:placeholder-shown)]:pointer-events-none
                            has-[+input:not(:placeholder-shown)]:top-0
                            has-[+input:not(:placeholder-shown)]:cursor-default
                            has-[+input:not(:placeholder-shown)]:text-xs
                            has-[+input:not(:placeholder-shown)]:font-normal
                            has-[+input:not(:placeholder-shown)]:text-muted-foreground"
            >
                        <span className="bg-background inline-flex px-2">
                          {placeholder}
                        </span>
            </label>
            <Input
                id={id}
                type="text"
                placeholder=" "
                className="z-99"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default CompanyPaymentScalableInput;