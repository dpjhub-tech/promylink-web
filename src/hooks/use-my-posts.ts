"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import type { OwnedPost } from "@/lib/types";

export function useMyPosts() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my-posts"],
    queryFn: () => apiFetch<OwnedPost[]>("/posts/mine"),
    enabled: !!user,
  });
}
