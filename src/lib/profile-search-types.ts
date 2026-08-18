export interface SearchableProfile {
  id: string;
  username: string | null;
  name: string | null;
  avatarUrl: string | null;
  bio: string | null;
  isVerified: boolean;
  designation: string | null;
  designationCustom: string | null;
  avgRating: number;
  ratingCount: number;
}
