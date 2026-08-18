"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Post } from "@/lib/types";

export function useFeedPosts() {
  return useQuery({
    queryKey: ["feed-posts"],
    queryFn: () => apiFetch<Post[]>("/posts"),
  });
}
