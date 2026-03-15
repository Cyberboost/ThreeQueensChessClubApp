import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserByClerkId } from "@/lib/db/queries";
import { ROUTES } from "@/config/app";
import type { User } from "@prisma/client";

// ─── Auth Helpers ─────────────────────────────────────────────

/**
 * Returns the current authenticated Clerk user and their DB record.
 * Redirects to sign-in if not authenticated.
 */
export async function requireAuth(): Promise<{
  clerkUser: NonNullable<Awaited<ReturnType<typeof currentUser>>>;
  dbUser: User;
}> {
  const { userId } = await auth();

  if (!userId) {
    redirect(ROUTES.signIn);
  }

  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect(ROUTES.signIn);
  }

  const dbUser = await getUserByClerkId(userId);
  if (!dbUser) {
    // User authenticated with Clerk but not yet in DB — send to onboarding
    redirect(ROUTES.onboarding);
  }

  return { clerkUser, dbUser };
}

/**
 * Returns the current Clerk auth without redirecting.
 * Useful for conditionally rendering auth-aware UI.
 */
export async function getOptionalAuth() {
  const { userId } = await auth();
  if (!userId) return null;

  const dbUser = await getUserByClerkId(userId);
  return dbUser;
}

/**
 * Require that the current user has the ADMIN role.
 * Redirects to dashboard if not authorized.
 */
export async function requireAdmin(): Promise<{ clerkUser: NonNullable<Awaited<ReturnType<typeof currentUser>>>; dbUser: User }> {
  const result = await requireAuth();

  if (result.dbUser.role !== "ADMIN") {
    redirect(ROUTES.dashboard);
  }

  return result;
}

/**
 * Require that the current user has GUARDIAN role (default for all non-admin users).
 */
export async function requireGuardian() {
  return requireAuth();
}
