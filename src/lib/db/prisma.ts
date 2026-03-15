import { PrismaClient } from "@prisma/client";

// ─── Prisma Client Singleton ──────────────────────────────────
// Next.js hot reloading creates multiple module instances in dev.
// This pattern ensures we reuse the same Prisma client instance.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
