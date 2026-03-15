import prisma from "./prisma";
import type { User, UserRole } from "@prisma/client";

// ─── User / Guardian Data Access ──────────────────────────────

export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { clerkId },
  });
}

export async function upsertUserFromClerk(params: {
  clerkId: string;
  email: string;
  role?: UserRole;
}): Promise<User> {
  return prisma.user.upsert({
    where: { clerkId: params.clerkId },
    create: {
      clerkId: params.clerkId,
      email: params.email,
      role: params.role ?? "GUARDIAN",
    },
    update: {
      email: params.email,
    },
  });
}

export async function getChildProfilesByGuardian(guardianId: string) {
  return prisma.childProfile.findMany({
    where: { guardianId, isActive: true },
    include: {
      ratingProfile: {
        select: {
          currentLevel: true,
          internalRating: true,
          gamesPlayed: true,
          gamesWon: true,
          gamesLost: true,
          gamesDrawn: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function getChildProfileById(id: string, guardianId?: string) {
  return prisma.childProfile.findFirst({
    where: {
      id,
      ...(guardianId ? { guardianId } : {}),
      isActive: true,
    },
    include: {
      ratingProfile: true,
      themeSelections: {
        include: { theme: true },
      },
    },
  });
}

export async function getMatchWithDetails(matchId: string) {
  return prisma.match.findUnique({
    where: { id: matchId },
    include: {
      participants: {
        include: {
          childProfile: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
            },
          },
        },
      },
      moves: {
        orderBy: { moveNumber: "asc" },
      },
    },
  });
}

export async function getRecentMatchesForChild(childProfileId: string, limit = 10) {
  return prisma.match.findMany({
    where: {
      participants: {
        some: { childProfileId },
      },
      status: { in: ["COMPLETED", "ABANDONED"] },
    },
    include: {
      participants: {
        include: {
          childProfile: {
            select: { displayName: true, avatarUrl: true },
          },
        },
      },
    },
    orderBy: { completedAt: "desc" },
    take: limit,
  });
}
