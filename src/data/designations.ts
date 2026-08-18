// Curated designations users can choose to display on their public profile.
// One value is stored on profiles.designation (slug). A custom free-text
// fallback (max 40 chars) lives on profiles.designation_custom.
export interface DesignationOption {
  slug: string;
  label: string;
  emoji: string;
  group: string;
}

export const DESIGNATIONS: DesignationOption[] = [
  // Creative
  { slug: 'creator', label: 'Creator', emoji: '✨', group: 'Creative' },
  { slug: 'artist', label: 'Artist', emoji: '🎨', group: 'Creative' },
  { slug: 'musician', label: 'Musician', emoji: '🎵', group: 'Creative' },
  { slug: 'singer', label: 'Singer', emoji: '🎤', group: 'Creative' },
  { slug: 'photographer', label: 'Photographer', emoji: '📷', group: 'Creative' },
  { slug: 'filmmaker', label: 'Filmmaker', emoji: '🎬', group: 'Creative' },
  { slug: 'writer', label: 'Writer', emoji: '✍️', group: 'Creative' },
  { slug: 'designer', label: 'Designer', emoji: '🖌️', group: 'Creative' },

  // Business
  { slug: 'entrepreneur', label: 'Entrepreneur', emoji: '🚀', group: 'Business' },
  { slug: 'founder', label: 'Founder', emoji: '🏗️', group: 'Business' },
  { slug: 'marketer', label: 'Marketer', emoji: '📈', group: 'Business' },
  { slug: 'investor', label: 'Investor', emoji: '💼', group: 'Business' },
  { slug: 'consultant', label: 'Consultant', emoji: '💡', group: 'Business' },

  // Tech
  { slug: 'developer', label: 'Developer', emoji: '💻', group: 'Tech' },
  { slug: 'engineer', label: 'Engineer', emoji: '⚙️', group: 'Tech' },
  { slug: 'data-scientist', label: 'Data Scientist', emoji: '📊', group: 'Tech' },

  // Health & Wellness
  { slug: 'doctor', label: 'Doctor', emoji: '🩺', group: 'Health' },
  { slug: 'therapist', label: 'Therapist', emoji: '🧠', group: 'Health' },
  { slug: 'fitness-coach', label: 'Fitness Coach', emoji: '💪', group: 'Health' },
  { slug: 'nutritionist', label: 'Nutritionist', emoji: '🥗', group: 'Health' },

  // Education
  { slug: 'teacher', label: 'Teacher', emoji: '📚', group: 'Education' },
  { slug: 'student', label: 'Student', emoji: '🎓', group: 'Education' },
  { slug: 'researcher', label: 'Researcher', emoji: '🔬', group: 'Education' },

  // Public service
  { slug: 'lawyer', label: 'Lawyer', emoji: '⚖️', group: 'Public' },
  { slug: 'journalist', label: 'Journalist', emoji: '📰', group: 'Public' },
  { slug: 'activist', label: 'Activist', emoji: '🌍', group: 'Public' },
  { slug: 'influencer', label: 'Influencer', emoji: '⭐', group: 'Influencer' },

  // Lifestyle
  { slug: 'chef', label: 'Chef', emoji: '👨‍🍳', group: 'Lifestyle' },
  { slug: 'traveller', label: 'Traveller', emoji: '🌐', group: 'Lifestyle' },
  { slug: 'gamer', label: 'Gamer', emoji: '🎮', group: 'Lifestyle' },
  { slug: 'athlete', label: 'Athlete', emoji: '🏆', group: 'Lifestyle' },
];

export function getDesignationLabel(slug?: string | null, custom?: string | null): string | null {
  if (custom && custom.trim()) return custom.trim();
  if (!slug) return null;
  const match = DESIGNATIONS.find(d => d.slug === slug);
  return match ? match.label : slug;
}

export function getDesignationEmoji(slug?: string | null): string {
  const match = DESIGNATIONS.find(d => d.slug === slug);
  return match?.emoji || '👤';
}