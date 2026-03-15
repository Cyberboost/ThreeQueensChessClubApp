import { Chess } from "chess.js";
import { INITIAL_FEN } from "@/config/app";
import type { ChessMove, GameState, GameStatus } from "@/types/chess";

// ─── Chess.js Utilities ───────────────────────────────────────

/**
 * Create a new Chess instance from a FEN string.
 */
export function createGame(fen: string = INITIAL_FEN): Chess {
  return new Chess(fen);
}

/**
 * Get the full game state from a Chess instance.
 */
export function getGameState(game: Chess): GameState {
  const status = resolveGameStatus(game);
  const verbose = game.moves({ verbose: true });

  // Compute FEN after each move by making the move on a copy of the game
  const moves: ChessMove[] = verbose.map((m) => {
    const copy = new Chess(game.fen());
    copy.move(m.san);
    return {
      from: m.from as ChessMove["from"],
      to: m.to as ChessMove["to"],
      promotion: m.promotion as ChessMove["promotion"],
      san: m.san,
      uci: `${m.from}${m.to}${m.promotion ?? ""}`,
      fenAfter: copy.fen(),
      isCapture: m.captured !== undefined,
      isCheck: m.san.includes("+"),
      isCastle: m.san === "O-O" || m.san === "O-O-O",
      isPromotion: m.san.includes("="),
    };
  });

  return {
    fen: game.fen(),
    turn: game.turn(),
    status,
    isCheck: game.inCheck(),
    isCheckmate: game.isCheckmate(),
    isDraw:
      game.isDraw() ||
      game.isStalemate() ||
      game.isInsufficientMaterial() ||
      game.isThreefoldRepetition(),
    isGameOver: game.isGameOver(),
    moves,
    pgn: game.pgn(),
  };
}

/**
 * Resolve a semantic game status from the Chess instance.
 */
export function resolveGameStatus(game: Chess): GameStatus {
  if (game.isCheckmate()) return "checkmate";
  if (game.isStalemate()) return "stalemate";
  if (game.isInsufficientMaterial()) return "draw_insufficient";
  if (game.isThreefoldRepetition()) return "draw_threefold";
  if (game.isDraw()) return "draw_fifty_move";
  return "active";
}

/**
 * Validate and apply a move. Returns updated FEN or null if illegal.
 */
export function applyMove(
  fen: string,
  move: { from: string; to: string; promotion?: string },
): { fen: string; san: string } | null {
  const game = createGame(fen);

  try {
    const result = game.move({ from: move.from, to: move.to, promotion: move.promotion });
    if (!result) return null;
    return { fen: game.fen(), san: result.san };
  } catch {
    return null;
  }
}

/**
 * Check if a move is legal in the current position.
 */
export function isMoveLegal(
  fen: string,
  from: string,
  to: string,
  promotion?: string,
): boolean {
  return applyMove(fen, { from, to, promotion }) !== null;
}

/**
 * Get all legal moves for a given square.
 */
export function getLegalMovesForSquare(fen: string, square: string): string[] {
  const game = createGame(fen);
  return game
    .moves({ square: square as Parameters<typeof game.moves>[0]["square"], verbose: true })
    .map((m) => m.to);
}

/**
 * Converts a FEN string to a human-readable description of the position.
 * Minimal implementation — expand with a proper parser later.
 */
export function fenToPositionSummary(fen: string): {
  turn: "white" | "black";
  fullMoveNumber: number;
  halfMoveClock: number;
} {
  const parts = fen.split(" ");
  return {
    turn: parts[1] === "w" ? "white" : "black",
    halfMoveClock: parseInt(parts[4] ?? "0", 10),
    fullMoveNumber: parseInt(parts[5] ?? "1", 10),
  };
}
