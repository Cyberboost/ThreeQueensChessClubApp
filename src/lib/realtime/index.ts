// ─── Realtime Integration Placeholder ─────────────────────────
// This module will wrap realtime communication for live gameplay.
// Recommended provider: Ably (serverless-friendly, Vercel-compatible)
//
// Ably provides:
//   - Channel-based pub/sub
//   - Presence (who is online/in a game room)
//   - History replay
//   - React hooks via ably/react
//
// Setup:
//   npm install ably
//   Set ABLY_API_KEY in environment variables

import type { RealtimeGameEvent, RealtimePresence } from "@/types/chess";

export const REALTIME_CHANNELS = {
  game: (matchId: string) => `game:${matchId}`,
  lobby: "lobby",
  presence: (matchId: string) => `game:${matchId}:presence`,
} as const;

/**
 * Publish a game event to the realtime channel.
 * Not implemented — requires Ably SDK integration.
 */
export async function publishGameEvent(
  _matchId: string,
  _event: RealtimeGameEvent,
): Promise<void> {
  // TODO: Implement with Ably REST client for server-side publishing
  throw new Error("Realtime not yet implemented");
}

/**
 * Get current presence for a game room.
 * Not implemented — requires Ably integration.
 */
export async function getGamePresence(
  _matchId: string,
): Promise<RealtimePresence[]> {
  // TODO: Implement with Ably presence API
  throw new Error("Realtime not yet implemented");
}
