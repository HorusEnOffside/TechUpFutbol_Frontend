import type { Group } from '../types';
import { TeamRow } from './TeamRow';

function ArrowBack() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z" fill="#FCFCFC" />
    </svg>
  );
}

function ArrowForward() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" fill="#FCFCFC" />
    </svg>
  );
}

interface GruposCardProps {
  group: Group;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function GruposCard({ group, onPrev, onNext, hasPrev, hasNext }: GruposCardProps) {
  return (
    <div className="grupos-card">
      <div className="grupos-card-header">
        <h2 className="grupos-card-title">{group.name}</h2>
        <div className="grupos-card-nav">
          <button
            className="grupos-nav-btn"
            onClick={onPrev}
            disabled={!hasPrev}
            aria-label="Grupo anterior"
          >
            <ArrowBack />
          </button>
          <button
            className="grupos-nav-btn"
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Siguiente grupo"
          >
            <ArrowForward />
          </button>
        </div>
      </div>

      <div className="grupos-table-header">
        <span className="grupos-col-equipo">EQUIPO</span>
        <span className="grupos-col-puntos">PUNTOS</span>
      </div>

      <div className="grupos-teams-list">
        {group.teams.map((team, i) => (
          <TeamRow key={team.id} team={team} index={i} />
        ))}
      </div>
    </div>
  );
}
