import { LucideIcon, ArrowRight } from "lucide-react";

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
  tone: "primary" | "accent";
  selected: boolean;
  onSelect: () => void;
}

// Tailwind needs complete, static class strings (no runtime string building),
// so the two tones are spelled out rather than interpolated.
const TONE_STYLES = {
  primary: {
    border: "border-brand-primary",
    bg: "bg-brand-primary/5",
    icon: "text-brand-primary",
    button: "bg-brand-primary hover:bg-brand-primary-dark",
  },
  accent: {
    border: "border-brand-accent",
    bg: "bg-brand-accent/5",
    icon: "text-brand-accent",
    button: "bg-brand-accent hover:opacity-90",
  },
} as const;

export function RoleCard({ icon: Icon, title, description, buttonLabel, tone, selected, onSelect }: RoleCardProps) {
  const styles = TONE_STYLES[tone];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-xl border-2 p-5 transition-colors ${selected ? `${styles.border} ${styles.bg}` : "border-brand-border bg-brand-surface hover:border-brand-border-strong"
        }`}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-surface shadow-sm mb-2.5">
        <Icon className={`h-4 w-4 ${styles.icon}`} />
      </div>
      <p className="text-sm font-bold text-brand-text-primary">{title}</p>
      <p className="text-xs text-brand-text-muted mt-0.5 mb-3 leading-relaxed">{description}</p>
      <span
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-colors ${styles.button}`}
      >
        {buttonLabel}
        <ArrowRight className="h-3 w-3" />
      </span>
    </button>
  );
}
