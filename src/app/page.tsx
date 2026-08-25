"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

// `/` is now a smart redirect rather than the marketing page itself (that
// moved to /about): logged-in users land on /dashboard by default, logged-
// out visitors land on /about. Every "go home after auth" spot in the app
// points at /dashboard directly now (see auth-context.tsx, /login, /signup)
// — this redirect only matters for someone landing on `/` directly (typed
// URL, bookmark, logo click, etc.).
export default function RootPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    router.replace(user ? "/dashboard" : "/about");
  }, [user, loading, router]);

  return <div className="min-h-screen bg-brand-background" />;
}
