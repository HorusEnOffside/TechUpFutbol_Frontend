import type { UUID } from './common';
import type { TournamentStatus } from './tournament';

// ─── Tournament (full shape used in phases module) ────────────────────────────

export interface Tournament {
  id: UUID;
  startDate: string;
  endDate: string;
  closingDate: string | null;
  teamsMaxAmount: number;
  teamCost: number;
  status: TournamentStatus;
  reglamento: string | null;
  sanciones: string | null;
}

// ─── Match (GET /matches) — usa MatchResponseDTO del backend ──────────────────
// teamA/teamB son TeamSummaryDTO: {id, name, uniformColor} (sin tournament.id)

export type MatchStatus = 'PENDING' | 'FINISHED' | string;

export interface MatchTeamRef {
  id: UUID;
  name: string;
  uniformColor: string;
}

export interface MatchEvent {
  minute: number;
  playerName: string;
  description: string;
  type?: 'RED' | 'YELLOW';  // presente solo en cards
}

export interface Match {
  id: UUID;
  dateTime: string;
  status: MatchStatus;
  localScore: number;
  visitorScore: number;
  teamA: MatchTeamRef;
  teamB: MatchTeamRef;
  referee: { id: UUID; name: string; mail: string } | null;
  soccerField: { id: UUID; name: string; location: string; foto: string | null } | null;
  goals: MatchEvent[];
  cards: MatchEvent[];
}

// ─── Elimination Bracket ──────────────────────────────────────────────────────
// Backend retorna EliminationBracket directamente o 204 No Content

export interface BracketPlayer {
  userId: UUID;
  name: string;
  position: string;
  dorsalNumber: number;
}

export interface BracketTeam {
  id: UUID;
  name: string;
  uniformColor: string;
  formation: string | null;
  players: BracketPlayer[];
}

export interface MatchPair {
  team1: BracketTeam;
  team2: BracketTeam;
}

export interface EliminationBracket {
  roundOf16?: MatchPair[];
  quarterFinals?: MatchPair[];
  semiFinals?: MatchPair[];
  finals?: MatchPair[];
}

// El servicio retorna EliminationBracket | null
// null = 204 No Content (partidos pendientes o equipos insuficientes)
