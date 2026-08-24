import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
}

export function AuthInput({ label, icon: Icon, className, ...props }: AuthInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-text-primary mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-text-muted" />
        <input
          className={`w-full h-12 rounded-[10px] border border-brand-border bg-brand-surface pl-11 pr-4 text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors ${className ?? ""}`}
          {...props}
        />
      </div>
    </div>
  );
}
