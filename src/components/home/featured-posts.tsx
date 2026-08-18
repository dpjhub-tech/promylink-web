"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PostCard } from "@/components/posts/post-card";
import { useFeedPosts } from "@/hooks/use-feed-posts";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useAuth } from "@/contexts/auth-context";

export function FeaturedPosts() {
  const { data: posts = [] } = useFeedPosts();
  const { ref, isVisible } = useScrollAnimation();
  const { user } = useAuth();
  const router = useRouter();

  const handlePostClick = () => {
    router.push(user ? "/feed" : "/login");
  };

  const featuredPosts = [...posts]
    .filter((post) => post.status === "approved" && post.creditsRemaining > 0)
    .sort((a, b) => {
      if (a.isBoosted && !b.isBoosted) return -1;
      if (!a.isBoosted && b.isBoosted) return 1;
      return b.views - a.views;
    })
    .slice(0, 4);

  return (
    <section className="py-20 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Featured</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Trending Promotions</h2>
          </div>
          <Link href="/feed" className="hidden md:block">
            <Button variant="outline" className="gap-2 group">
              View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <div
                key={post.id}
                className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div onClick={handlePostClick} className="cursor-pointer">
                  <PostCard post={post} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No featured posts yet. Be the first to post!</p>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link href="/feed">
            <Button variant="gradient" className="gap-2">
              View All Posts <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
