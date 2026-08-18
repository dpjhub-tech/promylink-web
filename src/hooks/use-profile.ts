"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import type { Profile, UpdateProfileInput } from "@/lib/profile-types";

export function useProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => apiFetch<Profile>("/users/me"),
    enabled: !!user,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateProfileInput) =>
      apiFetch<Profile>("/users/me", { method: "PATCH", body: JSON.stringify(input) }),
    onSuccess: (profile) => {
      queryClient.setQueryData(["profile"], profile);
    },
  });
}
