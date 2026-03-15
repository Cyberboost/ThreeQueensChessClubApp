// ─── AI Coaching / Recommendation Placeholder ─────────────────
// This module will house:
//   - skill level recommendation logic
//   - personalized training suggestions
//   - post-game analysis summaries
//   - hint generation during training mode
//
// The AI layer will eventually integrate with:
//   - Stockfish for position analysis
//   - A language model (e.g. OpenAI) for natural language hints
//   - Custom recommendation logic based on PlayerRatingProfile

import type { SkillLevel } from "@prisma/client";
import type { TrainingHint } from "@/types/chess";
import { SKILL_LEVEL_CONFIG } from "@/config/app";

/**
 * Recommend an AI difficulty level based on a player's performance.
 * Not fully implemented — stub for future AI recommendation engine.
 */
export function recommendLevelFromRating(rating: number): SkillLevel {
  const levels = Object.entries(SKILL_LEVEL_CONFIG) as [
    SkillLevel,
    (typeof SKILL_LEVEL_CONFIG)[SkillLevel],
  ][];

  for (const [level, config] of levels) {
    if (rating >= config.minRating && rating < config.maxRating) {
      return level;
    }
  }

  return "QUEEN";
}

/**
 * Generate a training hint for the current position.
 * Not implemented — requires Stockfish + language model integration.
 */
export async function generateTrainingHint(
  _fen: string,
  _moveHistory: string[],
): Promise<TrainingHint> {
  // TODO: Implement using Stockfish analysis + LLM coaching
  return {
    type: "general",
    message: "Think about what your opponent might do next.",
  };
}
