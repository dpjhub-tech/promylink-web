import { Check, Headphones, ArrowRight } from "lucide-react";
import { WIZARD_STEPS } from "./wizard-steps";

export function WizardSidebar({ currentIndex }: { currentIndex: number }) {
  return (
    <aside className="hidden lg:flex fixed left-0 top-[65px] w-72 h-[calc(100vh-65px)] flex-col justify-between border-r border-brand-border bg-brand-surface px-6 py-6 z-20 overflow-hidden">
      <div>
        <h1 className="font-bold text-base text-brand-text-primary mb-4">Organization Signup</h1>

        <ol className="space-y-0">
          {WIZARD_STEPS.map((step, i) => {
            const status = i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
            const isLast = i === WIZARD_STEPS.length - 1;

            return (
              <li key={step.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      status === "done"
                        ? "bg-brand-primary text-white"
                        : status === "current"
                          ? "bg-brand-primary text-white"
                          : "border-2 border-brand-border text-brand-text-muted"
                    }`}
                  >
                    {status === "done" ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  {!isLast && <div className="w-px flex-1 min-h-4 bg-brand-border" />}
                </div>
                <div className="pb-3.5">
                  <p
                    className={`text-sm font-semibold leading-tight ${
                      status === "upcoming" ? "text-brand-text-muted" : "text-brand-text-primary"
                    }`}
                  >
                    {step.label}
                  </p>
                  {status === "done" ? (
                    <p className="text-xs font-medium text-brand-success mt-0.5">Completed</p>
                  ) : (
                    <p className="text-xs text-brand-text-muted mt-0.5">{step.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-xl border border-brand-border bg-brand-surface-secondary p-3 mt-auto">
        <div className="flex items-start gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
            <Headphones className="h-4 w-4 text-brand-primary" />
          </div>
          <div>
            <p className="font-semibold text-xs text-brand-text-primary">Need help?</p>
            <p className="text-[11px] text-brand-text-muted">Our support team is here 24/7.</p>
          </div>
        </div>
        <button className="w-full mt-2 inline-flex items-center justify-center gap-1 rounded-lg border border-brand-border bg-brand-surface py-1.5 text-xs font-semibold text-brand-primary hover:bg-brand-surface-secondary transition-colors">
          Contact Support
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </aside>
  );
}
