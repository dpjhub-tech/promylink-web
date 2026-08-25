import { Sparkles, Flame, LayoutGrid } from "lucide-react";
import type { Category } from "@/lib/category-types";

function RailCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Sparkles;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-surface p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-brand-primary" />
        <h3 className="text-sm font-bold text-brand-text-primary">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// Creator Spotlight and Trending Now have no backend behind them yet — no
// recommendation/follow system, no trending-topics query. Rather than
// inventing fake creator names/follower counts (or fake trending topics
// with fake post counts) to match the reference design cosmetically, these
// show an honest "coming soon" state with the same card structure.
function ComingSoon({ text }: { text: string }) {
  return <p className="text-sm text-brand-text-muted py-2">{text}</p>;
}

export function RightRail({ categories }: { categories: Category[] }) {
  return (
    <aside className="hidden xl:flex flex-col gap-5 w-80 shrink-0">
      <RailCard title="Creator Spotlight" icon={Sparkles}>
        <ComingSoon text="Featured creators will appear here once the recommendation system ships." />
      </RailCard>

      <RailCard title="Trending Now" icon={Flame}>
        <ComingSoon text="Trending topics will appear here once post analytics are tracked over time." />
      </RailCard>

      <RailCard title="Popular Categories" icon={LayoutGrid}>
        {categories.length === 0 ? (
          <ComingSoon text="No categories yet." />
        ) : (
          <div className="space-y-1">
            {categories.slice(0, 6).map((c) => (
              <div key={c.id} className="flex items-center gap-2.5 py-1.5 text-sm">
                <span className="text-base leading-none">{c.icon}</span>
                <span className="text-brand-text-secondary">{c.name}</span>
              </div>
            ))}
          </div>
        )}
      </RailCard>
    </aside>
  );
}
