import type { SkillLevel } from "@prisma/client";

// ─── Chess Domain Types ───────────────────────────────────────

export type Square =
  | "a1" | "b1" | "c1" | "d1" | "e1" | "f1" | "g1" | "h1"
  | "a2" | "b2" | "c2" | "d2" | "e2" | "f2" | "g2" | "h2"
  | "a3" | "b3" | "c3" | "d3" | "e3" | "f3" | "g3" | "h3"
  | "a4" | "b4" | "c4" | "d4" | "e4" | "f4" | "g4" | "h4"
  | "a5" | "b5" | "c5" | "d5" | "e5" | "f5" | "g5" | "h5"
  | "a6" | "b6" | "c6" | "d6" | "e6" | "f6" | "g6" | "h6"
  | "a7" | "b7" | "c7" | "d7" | "e7" | "f7" | "g7" | "h7"
  | "a8" | "b8" | "c8" | "d8" | "e8" | "f8" | "g8" | "h8";

export type PieceColor = "w" | "b";
export type PieceType = "p" | "n" | "b" | "r" | "q" | "k";

export interface Piece {
  type: PieceType;
  color: PieceColor;
}

export interface ChessMove {
  from: Square;
  to: Square;
  promotion?: PieceType;
  san: string;
  uci: string;
  fenAfter: string;
  isCapture: boolean;
  isCheck: boolean;
  isCastle: boolean;
  isPromotion: boolean;
}

export type GameStatus =
  | "active"
  | "checkmate"
  | "stalemate"
  | "draw_insufficient"
  | "draw_threefold"
  | "draw_fifty_move"
  | "draw_agreement"
  | "abandoned";

export interface GameState {
  fen: string;
  turn: PieceColor;
  status: GameStatus;
  isCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  isGameOver: boolean;
  moves: ChessMove[];
  pgn: string;
}

// ─── AI / Engine Types ────────────────────────────────────────

export interface AIOpponentConfig {
  level: SkillLevel;
  stockfishDepth: number;
  moveDelayMs: number;
}

export interface MoveEvaluation {
  score: number;
  category: "brilliant" | "great" | "good" | "inaccuracy" | "mistake" | "blunder";
  bestMove?: string;
  explanation?: string;
}

export interface TrainingHint {
  type: "general" | "tactic" | "strategy" | "warning";
  message: string;
  suggestedMove?: string;
}

// ─── Realtime Types ───────────────────────────────────────────

export interface RealtimeGameEvent {
  type: "move" | "resign" | "draw_offer" | "draw_accept" | "draw_decline" | "timeout";
  matchId: string;
  payload: unknown;
  timestamp: string;
}

export interface RealtimePresence {
  childProfileId: string;
  displayName: string;
  avatarUrl?: string;
  isConnected: boolean;
}
