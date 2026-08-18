import { supabase } from "@/lib/supabase/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Thin fetch wrapper for the Nest backend: attaches the current Supabase
// session's access token as a Bearer header so SupabaseAuthGuard can verify
// it server-side. Public endpoints (categories, posts) work fine with no
// session at all — the header is just omitted.
export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${path} failed: ${res.status} ${body}`);
  }
  return res.json() as Promise<T>;
}
