import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  hint?: string;
}

export function AuthInput({ label, icon: Icon, error, hint, className, ...props }: AuthInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-text-primary mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted pointer-events-none" />
        <input
          className={`w-full h-12 rounded-[10px] border bg-brand-surface pl-11 pr-4 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none transition-colors ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              : "border-brand-border focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
          } ${className ?? ""}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-brand-text-muted">{hint}</p>
      ) : null}
    </div>
  );
}
