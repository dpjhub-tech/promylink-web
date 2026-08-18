import Image from "next/image";
import { BadgeCheck, MousePointerClick, Eye, Bookmark, BookmarkCheck } from "lucide-react";
import type { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export function PostCard({ post, isBookmarked, onToggleBookmark }: PostCardProps) {
  return (
    <a
      href={post.linkUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="post-card glass-card block relative"
    >
      {onToggleBookmark && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleBookmark();
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all shadow-sm ${
            isBookmarked ? "bg-primary/20 text-primary" : "bg-background/60 text-foreground hover:bg-background/80"
          }`}
        >
          {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      )}

      {post.bannerUrl && (
        <div className="relative w-full aspect-[16/9] mb-4 rounded-lg overflow-hidden bg-secondary">
          <Image src={post.bannerUrl} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-base line-clamp-2">{post.title}</h3>
        {post.isVerified && <BadgeCheck className="h-5 w-5 text-primary shrink-0" />}
      </div>

      {post.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="category-chip bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
          {post.category?.name ?? "Uncategorized"}
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {post.views}
          </span>
          <span className="flex items-center gap-1">
            <MousePointerClick className="h-3.5 w-3.5" /> {post.clicks}
          </span>
        </div>
      </div>
    </a>
  );
}
