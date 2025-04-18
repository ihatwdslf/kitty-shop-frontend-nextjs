import React, {useId} from "react"

import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import type {IconType} from "react-icons";

interface DetailedSwitchWithIconProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label: string;
    description: string;
    icon: IconType;
}

export default function DetailedSwitchWithIcon({
                                                   checked,
                                                   onCheckedChange,
                                                   label,
                                                   description,
                                                   icon
                                               }: DetailedSwitchWithIconProps) {
    const id = useId()
    return (
        <div
            className="border-input has-data-[state=checked]:border-rose-400 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
            <Switch
                id={id}
                className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2 data-[state=checked]:[&_span]:rtl:-translate-x-2"
                aria-describedby={`${id}-description`}
                checked={checked}
                onCheckedChange={onCheckedChange}
            />
            <div className="flex grow items-center gap-3">
                <div className="grid grow gap-2 items-center">
                    <Label htmlFor={id}>
                        {label}
                        <br/>
                        <span className="text-[10px] font-thin text-muted-foreground">
                             (необов&#39;язково)
                        </span>
                    </Label>
                    <p id={`${id}-description`} className="text-muted-foreground text-xs">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}
