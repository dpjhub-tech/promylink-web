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
  role: "user" | "creator" | "business" | "admin";
  govIdType: "aadhaar" | "pan" | null;
  govIdDocUrl: string | null;
  govIdStatus: string;
  walletCredits: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileInput {
  name?: string;
  username?: string;
  bio?: string;
  designation?: string;
  designationCustom?: string;
  phone?: string;
}
