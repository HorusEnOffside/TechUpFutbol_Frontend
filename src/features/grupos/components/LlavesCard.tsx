import type { Bracket, Match } from '../types';

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

// ─── Single match row ─────────────────────────────────────────────────────────
function MatchRow({ match, spacious = false }: { match: Match; spacious?: boolean }) {
  return (
    <div className={`llaves-match-row ${spacious ? 'llaves-match-row--spacious' : ''}`}>
      <div className="llaves-team llaves-team--home">
        <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="llaves-team-logo" />
        <span className="llaves-team-name">{match.homeTeam.name}</span>
      </div>
      <div className="llaves-match-info">
        <span className="llaves-match-date">{match.date}</span>
        <span className="llaves-match-time">{match.time}</span>
      </div>
      <div className="llaves-team llaves-team--away">
        <span className="llaves-team-name">{match.awayTeam.name}</span>
        <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="llaves-team-logo" />
      </div>
    </div>
  );
}

// ─── Spacious layout (Semis: 2 matches with divider) ─────────────────────────
function SpaciousMatches({ matches }: { matches: Match[] }) {
  return (
    <div className="llaves-matches llaves-matches--spacious">
      {matches.map((match, i) => (
        <div key={match.id}>
          {i > 0 && <div className="llaves-divider" />}
          <MatchRow match={match} spacious />
        </div>
      ))}
    </div>
  );
}

// ─── Grouped matches (Cuartos: with sub-labels) ───────────────────────────────
function GroupedMatches({ matches }: { matches: Match[] }) {
  const groups: { label: string; matches: Match[] }[] = [];
  for (const match of matches) {
    const label = match.subLabel ?? '';
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.matches.push(match);
    else groups.push({ label, matches: [match] });
  }
  return (
    <div className="llaves-matches">
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.label && <div className="llaves-sub-label">{group.label}</div>}
          {group.matches.map((match) => (
            <MatchRow key={match.id} match={match} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Final layout ─────────────────────────────────────────────────────────────
function FinalLayout({ match }: { match: Match }) {
  return (
    <div className="llaves-final">
      <div className="llaves-final-logo-wrap">
        <img src={match.homeTeam.logo} alt="Final" className="llaves-final-logo" />
      </div>
      <p className="llaves-final-winner">
        El ganador fue... <strong>{match.winner ?? match.homeTeam.name}</strong>
      </p>
      <div className="llaves-final-teams">
        <div className="llaves-team llaves-team--home">
          <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="llaves-team-logo" />
          <span className="llaves-team-name">{match.homeTeam.name}</span>
        </div>
        <div className="llaves-final-countdown">
          <span className="llaves-final-countdown-label">D-20</span>
        </div>
        <div className="llaves-team llaves-team--away">
          <span className="llaves-team-name">{match.awayTeam.name}</span>
          <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="llaves-team-logo" />
        </div>
      </div>
    </div>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────
interface LlavesCardProps {
  bracket: Bracket;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function LlavesCard({ bracket, onPrev, onNext, hasPrev, hasNext }: LlavesCardProps) {
  const isFinal    = bracket.stage === 'Final';
  const isSpacious = !isFinal && bracket.matches.length <= 2;

  return (
    <div className="grupos-card llaves-card">
      <div className="grupos-card-header">
        <h2 className="grupos-card-title">{bracket.stage}</h2>
        <div className="grupos-card-nav">
          <button className="grupos-nav-btn" onClick={onPrev} disabled={!hasPrev} aria-label="Fase anterior">
            <ArrowBack />
          </button>
          <button className="grupos-nav-btn" onClick={onNext} disabled={!hasNext} aria-label="Siguiente fase">
            <ArrowForward />
          </button>
        </div>
      </div>

      {isFinal
        ? <FinalLayout match={bracket.matches[0]} />
        : isSpacious
          ? <SpaciousMatches matches={bracket.matches} />
          : <GroupedMatches matches={bracket.matches} />
      }
    </div>
  );
}
