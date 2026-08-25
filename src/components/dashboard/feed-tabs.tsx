"use client";

import type { Category } from "@/lib/category-types";

interface FeedTabsProps {
  categories: Category[];
  activeCategoryId: string | null;
  onSelect: (categoryId: string | null) => void;
}

// "Following"/"Trending"/"Deals" have no distinct backend query behind them
// yet (no follow graph, no separate trending/deals endpoint) — shown
// disabled rather than silently pretending to filter anything.
const SOON_TABS = ["Following", "Trending", "Deals"];

export function FeedTabs({ categories, activeCategoryId, onSelect }: FeedTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          activeCategoryId === null
            ? "brand-gradient text-white"
            : "bg-brand-surface-secondary text-brand-text-secondary hover:text-brand-text-primary"
        }`}
      >
        For You
      </button>

      {SOON_TABS.map((label) => (
        <button
          key={label}
          disabled
          title="Coming soon"
          className="shrink-0 rounded-full px-4 py-2 text-sm font-medium bg-brand-surface-secondary text-brand-text-muted/50 cursor-not-allowed"
        >
          {label}
        </button>
      ))}

      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            activeCategoryId === c.id
              ? "brand-gradient text-white"
              : "bg-brand-surface-secondary text-brand-text-secondary hover:text-brand-text-primary"
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
