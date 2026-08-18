"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PostCard } from "@/components/posts/post-card";
import { PostCardSkeleton } from "@/components/posts/post-card-skeleton";
import { Button } from "@/components/ui/button";
import { useSavedPosts, useToggleBookmark } from "@/hooks/use-bookmarks";

// Faithful port of Promylink/src/pages/SavedLinks.tsx. The new GET
// /bookmarks endpoint returns full post rows directly (joined server-side),
// so there's no separate "fetch bookmarked ids then fetch posts by id" step
// like the original's two-query dance.
export default function SavedLinksPage() {
  const { data: posts = [], isLoading } = useSavedPosts();
  const toggleBookmark = useToggleBookmark();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Bookmark className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Saved Links</h1>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isBookmarked={true}
                  onToggleBookmark={() => toggleBookmark.mutate({ postId: post.id, isBookmarked: true })}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Bookmark className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No saved links yet</h3>
              <p className="text-muted-foreground mb-4">
                Bookmark links from the feed to save them here
              </p>
              <Link href="/">
                <Button variant="outline">Browse Feed</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
