"use client";

import { HelpCircle, LogOut } from "lucide-react";
import { AuthLogo } from "@/components/auth/auth-logo";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export function WizardTopbar() {
  const { signOut } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 bg-brand-surface shrink-0 flex items-center justify-between border-b border-brand-border px-6 lg:px-10 py-4">
      <AuthLogo />
      <div className="flex items-center gap-3">
        <button className="hidden sm:inline-flex items-center gap-1.5 text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors">
          Need help?
          <HelpCircle className="h-4 w-4" />
        </button>
        <button
          onClick={async () => {
            await signOut();
            router.push("/login");
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border px-3.5 py-2 text-sm font-semibold text-brand-text-primary hover:bg-brand-surface-secondary transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          Log out
        </button>
      </div>
    </header>
  );
}
