"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import type { Post } from "@/lib/types";

export function useSavedPosts() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["saved-posts"],
    queryFn: () => apiFetch<Post[]>("/bookmarks"),
    enabled: !!user,
  });
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, isBookmarked }: { postId: string; isBookmarked: boolean }) =>
      apiFetch(`/bookmarks/${postId}`, { method: isBookmarked ? "DELETE" : "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-posts"] });
    },
  });
}
