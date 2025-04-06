import Link from "next/link";
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/ui/stepper"
import {PurchaseSteps} from "@/data/static/purchase-steps";

interface PurchaseStepsProgressLineProps {
    activeStep: number;
}

export default function PurchaseStepsProgressLine({activeStep}: PurchaseStepsProgressLineProps) {

    return (
        <div className="space-y-8 text-center">
            <Stepper value={activeStep}>
                {PurchaseSteps.map(({step, title, linkPart}) => (
                    <StepperItem
                        key={step}
                        step={step}
                        className="not-last:flex-1 max-md:items-start"
                    >
                        <Link href={`/check-out/purchase/${linkPart}`}>
                            <StepperTrigger className="rounded max-md:flex-col cursor-pointer">
                                <StepperIndicator/>
                                <div className="text-center md:text-left">
                                    <StepperTitle>{title}</StepperTitle>
                                </div>
                            </StepperTrigger>
                        </Link>
                        {step < PurchaseSteps.length && (
                            <StepperSeparator className="max-md:mt-3.5 md:mx-4"/>
                        )}
                    </StepperItem>
                ))}
            </Stepper>
        </div>
    )
}
