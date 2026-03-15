import type { ChildProfile, PlayerRatingProfile, User } from "@prisma/client";

// ─── Auth / Session Context Types ────────────────────────────

export interface AuthenticatedUser {
  clerkId: string;
  email: string;
  role: "GUARDIAN" | "ADMIN";
  dbUser: User;
}

export type ActiveChildProfile = Pick<
  ChildProfile,
  "id" | "displayName" | "avatarUrl" | "isActive"
> & {
  ratingProfile: Pick<
    PlayerRatingProfile,
    "currentLevel" | "internalRating" | "gamesPlayed" | "gamesWon" | "gamesLost" | "gamesDrawn"
  > | null;
};

// ─── Navigation Types ─────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  isExternal?: boolean;
}

// ─── API Response Types ───────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
