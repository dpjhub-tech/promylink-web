"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { Post } from "@/lib/types";

export function useFeedPosts(categoryId?: string) {
  return useQuery({
    queryKey: ["feed-posts", categoryId ?? "all"],
    queryFn: () =>
      apiFetch<Post[]>(`/posts${categoryId ? `?categoryId=${categoryId}` : ""}`),
  });
}
