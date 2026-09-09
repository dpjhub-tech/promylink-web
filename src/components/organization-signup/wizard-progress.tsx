import { Check } from "lucide-react";
import { WIZARD_STEPS } from "./wizard-steps";

export function WizardProgress({ currentIndex }: { currentIndex: number }) {
  return (
    <div className="hidden md:flex items-center">
      {WIZARD_STEPS.map((step, i) => {
        const status = i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
        const isLast = i === WIZARD_STEPS.length - 1;

        return (
          <div key={step.key} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold shrink-0 ${
                status === "done"
                  ? "bg-brand-primary text-white"
                  : status === "current"
                    ? "border-2 border-brand-primary text-brand-primary"
                    : "border-2 border-brand-border text-brand-text-muted"
              }`}
            >
              {status === "done" ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {!isLast && <div className="w-8 h-px bg-brand-border mx-1.5" />}
          </div>
        );
      })}
    </div>
  );
}
