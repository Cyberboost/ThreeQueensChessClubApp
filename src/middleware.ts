import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes that are publicly accessible (no auth required)
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

// Admin-only routes
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// Type for the role stored in Clerk's public metadata
interface ClerkSessionMetadata {
  role?: "GUARDIAN" | "ADMIN";
}

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes without authentication
  if (isPublicRoute(req)) return;

  // Protect all other routes
  const { sessionClaims } = await auth.protect();

  // Restrict admin routes to users with the ADMIN role
  // Role is stored in Clerk's public metadata
  if (isAdminRoute(req)) {
    const metadata = sessionClaims?.metadata as ClerkSessionMetadata | undefined;
    if (metadata?.role !== "ADMIN") {
      const dashboardUrl = new URL("/dashboard", req.url);
      return Response.redirect(dashboardUrl);
    }
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
