// ─── Clerk Webhook Handler ────────────────────────────────────
// Syncs Clerk user events to the application database.
//
// Setup:
//   1. Install svix: npm install svix
//   2. Set CLERK_WEBHOOK_SECRET in environment variables
//   3. Configure the webhook endpoint in your Clerk Dashboard:
//      https://dashboard.clerk.com → Webhooks → Add Endpoint
//      URL: https://your-domain/api/webhooks/clerk
//      Events: user.created, user.updated, user.deleted

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { upsertUserFromClerk } from "@/lib/db/queries";

// TODO: Install svix and enable signature verification before production use:
// import { Webhook } from "svix";

interface ClerkEmailAddress {
  email_address: string;
  id: string;
}

interface ClerkUserCreatedEvent {
  type: "user.created" | "user.updated";
  data: {
    id: string;
    email_addresses: ClerkEmailAddress[];
    primary_email_address_id: string;
  };
}

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");

  // Basic guard — in production, verify the webhook signature with svix
  if (!svixId) {
    return NextResponse.json({ error: "Missing webhook headers" }, { status: 400 });
  }

  const payload = (await req.json()) as ClerkUserCreatedEvent;

  try {
    if (payload.type === "user.created" || payload.type === "user.updated") {
      const { id, email_addresses, primary_email_address_id } = payload.data;
      const primaryEmail = email_addresses.find((e) => e.id === primary_email_address_id);

      if (!primaryEmail) {
        return NextResponse.json({ error: "No primary email found" }, { status: 400 });
      }

      await upsertUserFromClerk({
        clerkId: id,
        email: primaryEmail.email_address,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Clerk Webhook] Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
