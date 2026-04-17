import type { UUID } from './common';

// ─── Standings (GET /standings/{tournamentId}) ────────────────────────────────

export interface StandingsEntryDTO {
  id: UUID;
  name: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

// ─── Top Scorers (GET /standings/{tournamentId}/top-scorers) ──────────────────

export interface TopScorerDTO {
  userId: UUID;
  name: string;
  goals: number;
  teamId: UUID;
}

// ─── Cards History (GET /standings/{tournamentId}/cards-history) ──────────────

export type CardType = 'YELLOW' | 'RED';

export interface CardEventDTO {
  id: UUID;
  type: CardType;
  playerId: UUID;
  teamId: UUID;
  matchId: UUID;
  minute: number;
}

// ─── Team Full Info (GET /teams/{id}/full) ────────────────────────────────────

export interface TeamPlayerInfoDTO {
  playerId: UUID;
  name: string;
  mail: string;
  position: string;
  dorsalNumber: number;
  isCaptain: boolean;
}

export interface TeamMatchInfoDTO {
  matchId: UUID;
  dateTime: string;
  opponentName: string;
  goalsFor: number;
  goalsAgainst: number;
  result: 'WIN' | 'LOSS' | 'DRAW' | 'PENDING';
}

export interface TeamStatsDTO {
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface TeamFullInfoDTO {
  teamId: UUID;
  name: string;
  uniformColor: string;
  tournamentId: UUID;
  tournamentName: string;
  captainName: string;
  players: TeamPlayerInfoDTO[];
  matches: TeamMatchInfoDTO[];
  stats: TeamStatsDTO;
}

// ─── Player Search (GET /players/search) ─────────────────────────────────────

export interface PlayerSearchParams {
  position?: string;
  semester?: number;
  age?: number;
  gender?: string;
  name?: string;
  playerId?: UUID;
}

export interface PlayerSearchResultDTO {
  playerId: UUID;
  name: string;
  mail: string;
  position: string;
  dorsalNumber: number;
  gender: string;
  status: string;
  teamName: string | null;
}
