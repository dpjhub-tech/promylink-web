"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { WizardTopbar } from "./wizard-topbar";
import { WizardSidebar } from "./wizard-sidebar";
import { WizardProgress } from "./wizard-progress";

interface WizardShellProps {
  currentIndex: number;
  backHref?: string;
  containerClassName?: string;
  children: ReactNode;
}

// Shared shell for wizard steps 2+ (step 1 "Create account" has its own,
// simpler layout — not this one). -mt-16 cancels globals.css's
// `body { padding-top: 4rem }`, same fix as every other custom-header page.
export function WizardShell({
  currentIndex,
  backHref,
  containerClassName = "max-w-3xl",
  children,
}: WizardShellProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-brand-background -mt-16 relative">
      <WizardTopbar />

      <div className="flex flex-1">
        <WizardSidebar currentIndex={currentIndex} />

        <main className="flex-1 min-w-0 lg:ml-72 px-6 lg:px-10 xl:px-12 py-8">
          <div className={`${containerClassName} mx-auto`}>
            <div className="flex items-center justify-between mb-8">
              {backHref ? (
                <button
                  onClick={() => router.push(backHref)}
                  className="inline-flex items-center gap-1 rounded-lg border border-brand-border bg-brand-surface px-3 py-1.5 text-sm font-medium text-brand-text-primary hover:bg-brand-surface-secondary transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}
              <WizardProgress currentIndex={currentIndex} />
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
