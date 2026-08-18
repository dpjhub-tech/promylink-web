export interface Profile {
  id: string;
  email: string;
  name: string;
  username: string | null;
  bio: string | null;
  phone: string | null;
  designation: string | null;
  designationCustom: string | null;
  avgRating: number;
  ratingCount: number;
  avatarUrl: string | null;
  isVerified: boolean;
  govIdStatus: string | null;
  walletCredits: number;
  createdAt: string;
  updatedAt: string;
  roles: string[];
}

export interface UpdateProfileInput {
  name?: string;
  username?: string;
  bio?: string;
  designation?: string;
  designationCustom?: string;
  phone?: string;
}
