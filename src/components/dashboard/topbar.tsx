"use client";

import { Search, Plus, ChevronDown, Bell, Coins } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Profile } from "@/lib/profile-types";

const ROLE_LABEL: Record<Profile["role"], string> = {
  user: "User",
  creator: "Creator",
  business: "Business",
  admin: "Admin",
};

export function DashboardTopbar({ profile }: { profile?: Profile }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-brand-border bg-brand-surface/95 backdrop-blur px-6 py-3">
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted" />
        <input
          type="text"
          placeholder="Search posts, creators, categories, deals..."
          className="w-full h-10 rounded-[10px] border border-brand-border bg-brand-surface-secondary pl-10 pr-14 text-sm placeholder:text-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-colors"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-brand-text-muted border border-brand-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </div>

      <button
        disabled
        title="Coming soon"
        className="brand-gradient inline-flex items-center gap-1.5 rounded-[10px] pl-4 pr-3 py-2.5 text-sm font-semibold text-white cursor-not-allowed opacity-90 shrink-0"
      >
        <Plus className="h-4 w-4" />
        Create
        <ChevronDown className="h-3.5 w-3.5 ml-1 opacity-80" />
      </button>

      <div className="hidden md:flex items-center gap-1.5 rounded-[10px] border border-brand-border bg-brand-surface-secondary px-3 py-2 shrink-0">
        <Coins className="h-4 w-4 text-brand-warning" />
        <span className="text-sm font-semibold text-brand-text-primary">{profile?.walletCredits ?? 0}</span>
        <span className="text-xs text-brand-text-muted">Credits</span>
      </div>

      <button
        title="Notifications (coming soon)"
        disabled
        className="relative shrink-0 h-10 w-10 flex items-center justify-center rounded-[10px] border border-brand-border text-brand-text-secondary cursor-not-allowed"
      >
        <Bell className="h-4.5 w-4.5" />
      </button>

      <div className="flex items-center gap-2.5 shrink-0">
        <Avatar className="h-9 w-9">
          <AvatarImage src={profile?.avatarUrl ?? undefined} alt={profile?.name ?? "User"} />
          <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-semibold">
            {profile?.name?.charAt(0)?.toUpperCase() ?? "?"}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block leading-tight">
          <p className="text-sm font-semibold text-brand-text-primary">{profile?.name || "—"}</p>
          <p className="text-xs text-brand-text-muted">{profile ? ROLE_LABEL[profile.role] : ""}</p>
        </div>
        <ChevronDown className="hidden sm:block h-4 w-4 text-brand-text-muted" />
      </div>
    </header>
  );
}
