import { ShieldCheck, Star, Lock } from "lucide-react";

export const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    title: "100% Verified",
    description: "Every account is verified for your safety.",
  },
  {
    icon: Star,
    title: "Real Trust Metrics",
    description: "Ratings, clicks and impressions you can trust.",
  },
  {
    icon: Lock,
    title: "Secure Platform",
    description: "Built for safety, privacy and transparency.",
  },
];

// Signup layout: three columns, icon centered above the text.
export function TrustBadgesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {TRUST_BADGES.map(({ icon: Icon, title, description }) => (
        <div key={title} className="rounded-xl border border-brand-border bg-brand-surface p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-surface-secondary mb-2">
            <Icon className="h-4.5 w-4.5 text-brand-primary" />
          </div>
          <p className="text-sm font-semibold text-brand-text-primary">{title}</p>
          <p className="text-xs text-brand-text-muted mt-0.5">{description}</p>
        </div>
      ))}
    </div>
  );
}

// Sign-in layout: stacked rows, icon in a tinted circle to the left.
export function TrustBadgesList() {
  return (
    <div className="space-y-6">
      {TRUST_BADGES.map(({ icon: Icon, title, description }) => (
        <div key={title} className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-surface-secondary">
            <Icon className="h-5 w-5 text-brand-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-text-primary">{title}</p>
            <p className="text-sm text-brand-text-muted">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
