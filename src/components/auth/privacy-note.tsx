import { ShieldCheck } from "lucide-react";

export function PrivacyNote() {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-brand-surface-secondary px-4 py-3 text-sm text-brand-text-secondary">
      <ShieldCheck className="h-4 w-4 shrink-0 text-brand-primary" />
      Your data is safe with us. We never share your information.
    </div>
  );
}
