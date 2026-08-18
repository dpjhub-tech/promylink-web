"use client";

import Link from "next/link";
import { Coins } from "lucide-react";
import { useProfile } from "@/hooks/use-profile";

// Faithful port of Promylink/src/components/layout/HeaderCredits.tsx.
// The original subscribed to Supabase Realtime (`postgres_changes` on
// profiles) for live balance updates — that only works against Supabase's
// own Postgres, and profile data now lives in local Postgres instead, so
// this relies on react-query's normal refetch-on-focus/invalidation instead
// (already invalidated wherever wallet credits would change, e.g. Settings).
export function HeaderCredits() {
  const { data: profile } = useProfile();

  if (!profile) return null;

  return (
    <Link
      href="/settings"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
      title="Wallet Credits"
    >
      <span className="relative flex items-center justify-center">
        <Coins className="h-4 w-4 text-primary animate-[bounce_2s_ease-in-out_infinite]" />
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-30 pointer-events-none" />
      </span>
      <span className="text-sm font-bold text-primary group-hover:text-primary/80 transition-colors">
        {profile.walletCredits.toLocaleString()}
      </span>
    </Link>
  );
}
