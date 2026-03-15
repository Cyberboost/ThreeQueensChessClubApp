import { SkillLevel } from "@prisma/client";

// ─── App Meta ─────────────────────────────────────────────────

export const APP_NAME = "Three Queens Chess Club";
export const APP_DESCRIPTION =
  "An AI-powered virtual chess club for girls. Play, learn, and grow with confidence.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ─── Skill Level Config ───────────────────────────────────────

export const SKILL_LEVEL_CONFIG: Record<
  SkillLevel,
  {
    label: string;
    description: string;
    minRating: number;
    maxRating: number;
    stockfishDepth: number;
    color: string;
  }
> = {
  [SkillLevel.BEGINNER]: {
    label: "Beginner",
    description: "Just getting started. Every queen was once a pawn!",
    minRating: 600,
    maxRating: 800,
    stockfishDepth: 1,
    color: "#059669",
  },
  [SkillLevel.EXPLORER]: {
    label: "Explorer",
    description: "Learning the board and discovering your style.",
    minRating: 800,
    maxRating: 1000,
    stockfishDepth: 3,
    color: "#2563EB",
  },
  [SkillLevel.ADVENTURER]: {
    label: "Adventurer",
    description: "Thinking ahead and taking on new challenges.",
    minRating: 1000,
    maxRating: 1200,
    stockfishDepth: 5,
    color: "#7C3AED",
  },
  [SkillLevel.CHALLENGER]: {
    label: "Challenger",
    description: "Confident and strategic. Watch out!",
    minRating: 1200,
    maxRating: 1400,
    stockfishDepth: 8,
    color: "#D97706",
  },
  [SkillLevel.CHAMPION]: {
    label: "Champion",
    description: "A force on the board. Your opponents feel it.",
    minRating: 1400,
    maxRating: 1600,
    stockfishDepth: 12,
    color: "#DC2626",
  },
  [SkillLevel.QUEEN]: {
    label: "Queen",
    description: "Masterful, creative, and unstoppable.",
    minRating: 1600,
    maxRating: 9999,
    stockfishDepth: 18,
    color: "#DB2777",
  },
};

// ─── Route Constants ──────────────────────────────────────────

export const ROUTES = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  onboarding: "/onboarding",
  dashboard: "/dashboard",
  play: "/play",
  playAi: "/play-ai",
  training: "/training",
  profile: "/profile",
  parent: "/parent",
  admin: "/admin",
} as const;

// ─── Match Config ─────────────────────────────────────────────

export const TIME_CONTROLS = [
  { label: "No clock", seconds: null },
  { label: "5 min (Blitz)", seconds: 300 },
  { label: "10 min (Rapid)", seconds: 600 },
  { label: "15 min (Rapid)", seconds: 900 },
  { label: "30 min (Classical)", seconds: 1800 },
] as const;

export const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
