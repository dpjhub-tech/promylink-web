const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Server Component fetch helper for public (unauthenticated) Nest endpoints
// only — e.g. GET /posts, GET /categories. Doesn't touch the browser Supabase
// client (which relies on localStorage and can't run server-side).
export async function fetchPublic<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}
