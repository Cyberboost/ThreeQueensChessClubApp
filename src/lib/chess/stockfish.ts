// ─── Stockfish Integration Placeholder ───────────────────────
// This module will wrap the Stockfish chess engine for AI play
// and training analysis. Stockfish can be integrated via:
//   - stockfish.js (WASM) for client-side play
//   - A Stockfish API service for server-side analysis
//
// Implement this module when the AI opponent feature is built.

import type { SkillLevel } from "@prisma/client";
import { SKILL_LEVEL_CONFIG } from "@/config/app";
import type { MoveEvaluation } from "@/types/chess";

export interface StockfishConfig {
  depth: number;
  timeMs?: number;
}

export function getStockfishConfig(level: SkillLevel): StockfishConfig {
  const config = SKILL_LEVEL_CONFIG[level];
  return {
    depth: config.stockfishDepth,
    timeMs: 1000,
  };
}

/**
 * Request the best move from Stockfish for a given FEN position.
 * Not implemented — requires Stockfish server or WASM integration.
 */
export async function getBestMove(
  _fen: string,
  _config: StockfishConfig,
): Promise<string | null> {
  // TODO: Implement via Stockfish WASM or external API
  throw new Error("Stockfish integration not yet implemented");
}

/**
 * Evaluate a move in a given position.
 * Not implemented — requires Stockfish analysis.
 */
export async function evaluateMove(
  _fen: string,
  _uci: string,
): Promise<MoveEvaluation> {
  // TODO: Implement position analysis via Stockfish
  throw new Error("Move evaluation not yet implemented");
}
