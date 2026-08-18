"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export interface PlatformStats {
  activePosts: number;
  verifiedPosters: number;
  totalClicks: number;
  totalCategories: number;
}

export function usePlatformStats() {
  return useQuery({
    queryKey: ["platform-stats"],
    queryFn: () => apiFetch<PlatformStats>("/stats/platform"),
    staleTime: 5 * 60 * 1000,
  });
}
