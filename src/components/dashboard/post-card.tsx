import Image from "next/image";
import { CheckCircle2, Bookmark, MoreHorizontal, Eye, MousePointerClick } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Post } from "@/lib/types";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function PostCard({ post }: { post: Post }) {
  const image = post.bannerUrl || post.imageUrl;

  return (
    <article className="rounded-2xl border border-brand-border bg-brand-surface p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-9 w-9">
            <AvatarImage src={post.user?.avatarUrl ?? undefined} alt={post.user?.name ?? "User"} />
            <AvatarFallback className="bg-brand-primary/10 text-brand-primary text-sm font-semibold">
              {post.user?.name?.charAt(0)?.toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-brand-text-primary">{post.user?.name ?? "Unknown"}</p>
              {post.user?.isVerified && <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary fill-brand-primary/20" />}
            </div>
            <p className="text-xs text-brand-text-muted">
              {post.user?.username ? `@${post.user.username} · ` : ""}
              {timeAgo(post.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-brand-text-muted">
          <button className="p-1.5 rounded-lg hover:bg-brand-surface-secondary transition-colors" title="Bookmark">
            <Bookmark className="h-4 w-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-brand-surface-secondary transition-colors" title="More">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          {post.category && (
            <span className="inline-block mb-2 text-xs font-semibold text-brand-primary bg-brand-primary/10 rounded-md px-2 py-0.5">
              {post.category.name}
            </span>
          )}
          <h3 className="font-bold text-brand-text-primary leading-snug">{post.title}</h3>
          <p className="text-sm text-brand-text-muted mt-1 line-clamp-2">{post.description}</p>
          <a
            href={post.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm font-semibold text-brand-primary hover:underline"
          >
            Read More →
          </a>
        </div>

        {image && (
          <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-brand-surface-secondary">
            <Image src={image} alt={post.title} fill className="object-cover" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-brand-border text-xs text-brand-text-muted">
        <span className="inline-flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" /> {post.views.toLocaleString()}
        </span>
        <span className="inline-flex items-center gap-1">
          <MousePointerClick className="h-3.5 w-3.5" /> {post.clicks.toLocaleString()}
        </span>
      </div>
    </article>
  );
}
