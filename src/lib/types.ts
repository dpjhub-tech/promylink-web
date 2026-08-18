// Mirrors the shape returned by GET /posts on promylink-backend
// (src/modules/posts/posts.service.ts PUBLIC_POST_SELECT).
export interface Post {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  linkUrl: string;
  promoCode: string | null;
  imageUrl: string | null;
  appIcon: string | null;
  bannerUrl: string | null;
  targetLocation: string | null;
  status: string;
  isVerified: boolean;
  isBoosted: boolean;
  boostExpiresAt: string | null;
  creditsRemaining: number;
  totalCredits: number;
  clicks: number;
  views: number;
  actionType: string;
  keywords: string[];
  createdAt: string;
  expiresAt: string | null;
  category: { id: string; name: string; slug: string; icon: string } | null;
  subcategory: { id: string; name: string; slug: string } | null;
}

// Adds the owner-only fields returned by GET /posts/mine on top of the
// public Post shape above.
export interface OwnedPost extends Post {
  rejectionFeedback: string | null;
  gracePeriodEndsAt: string | null;
}
