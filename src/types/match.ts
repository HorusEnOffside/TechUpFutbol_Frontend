// ─── Supporting types ─────────────────────────────────────────────────────────

export interface TeamSummaryDTO {
  id: string;
  name: string;
  uniformColor: string;
}

export interface RefereeSummaryDTO {
  id: string;
  name: string;
  mail: string;
}

export interface SoccerFieldResponseDTO {
  id: string;
  name: string;
  location: string;
  foto: string | null;
}

export interface GoalResponseDTO {
  minute: number;
  playerName: string;
  description: string;
}

export interface CardResponseDTO {
  minute: number;
  playerName: string;
  type: 'RED' | 'YELLOW';
  description: string;
}

// ─── Match ────────────────────────────────────────────────────────────────────

export interface MatchResponseDTO {
  id: string;
  dateTime: string;           // LocalDateTime → ISO string
  status: string;
  localScore: number;
  visitorScore: number;
  teamA: TeamSummaryDTO;
  teamB: TeamSummaryDTO;
  referee: RefereeSummaryDTO | null;
  soccerField: SoccerFieldResponseDTO | null;
  goals: GoalResponseDTO[];
  cards: CardResponseDTO[];
}

// Alias mantenido por compatibilidad con código existente
export type MatchDTO = MatchResponseDTO;

// ─── Match result (POST /matches/{id}/result) ─────────────────────────────────

export interface PlayerMatchStats {
  playerId: string;
  yellowCards: number;
  redCards: number;
  goals: number;
}

export interface MatchResultDTO {
  localScore: number;
  visitorScore: number;
  playerStats: PlayerMatchStats[] | null;
}
