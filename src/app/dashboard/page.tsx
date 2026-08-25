"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "@/hooks/use-profile";
import { useCategories } from "@/hooks/use-categories";
import { useFeedPosts } from "@/hooks/use-feed-posts";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { FeedTabs } from "@/components/dashboard/feed-tabs";
import { PostCard } from "@/components/dashboard/post-card";
import { RightRail } from "@/components/dashboard/right-rail";
import { Newspaper } from "lucide-react";

// This is the home feed — replaces the previous posts/analytics dashboard
// entirely (per project decision). Deliberately not role-gated yet: any
// authenticated user (creator, business, or otherwise) lands here for now.
// Creator vs. business are "almost the same page with some RBAC" per
// project decision — that differentiation is planned as later work on top
// of this same page, not a separate one.
export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: categories = [] } = useCategories();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const { data: posts = [], isLoading: postsLoading } = useFeedPosts(activeCategoryId ?? undefined);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, user, router]);

  if (authLoading || profileLoading || !profile) {
    return <div className="min-h-screen bg-brand-background" />;
  }

  return (
    // -mt-16 cancels out globals.css's `body { padding-top: 4rem }`, which
    // exists to offset content below the site's normal fixed <Header /> —
    // this page has its own sticky topbar instead, so that space isn't
    // needed here. Same fix as AuthPageShell; kept local rather than
    // touching the global rule, which other pages still rely on.
    <div className="flex bg-brand-background min-h-screen -mt-16">
      <DashboardSidebar />

      <div className="flex-1 min-w-0">
        <DashboardTopbar profile={profile} />

        <div className="flex gap-6 p-6">
          <main className="flex-1 min-w-0 space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-brand-text-primary">Home Feed</h1>
              <p className="text-sm text-brand-text-muted mt-0.5">Discover amazing content from creators and brands</p>
            </div>

            <FeedTabs categories={categories} activeCategoryId={activeCategoryId} onSelect={setActiveCategoryId} />

            {postsLoading ? (
              <div className="space-y-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-40 rounded-2xl border border-brand-border bg-brand-surface-secondary animate-pulse" />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-2xl border border-brand-border bg-brand-surface p-12 text-center">
                <Newspaper className="h-10 w-10 mx-auto mb-3 text-brand-text-muted/40" />
                <p className="font-semibold text-brand-text-primary">No posts yet</p>
                <p className="text-sm text-brand-text-muted mt-1">
                  {activeCategoryId ? "No posts in this category yet." : "Once posts are approved, they'll show up here."}
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </main>

          <RightRail categories={categories} />
        </div>
      </div>
    </div>
  );
}
