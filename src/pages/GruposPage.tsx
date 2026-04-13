import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GruposCard, LlavesCard } from '../features/grupos';
import type { Group, Bracket, GruposTab } from '../features/grupos';
import '../styles/grupos.css';

// ─── Assets ──────────────────────────────────────────────────────────────────
import bgImage from '../assets/Background1.png';
import techcupLogo from '../assets/image 88.png';
import logo1 from '../assets/descarga 1.png';
import logo2 from '../assets/descarga (1) 1.png';
import logo3 from '../assets/pngtree-thats-the-football-logo-vector-png-image_13885485 1.png';

// ─── Mock data ────────────────────────────────────────────────────────────────
const GROUPS: Group[] = [
  {
    id: 'A',
    name: 'Grupo A',
    teams: [
      { id: '1', name: 'EQUIPO 1', logo: logo1, points: 1 },
      { id: '2', name: 'EQUIPO 2', logo: logo2, points: 1 },
      { id: '3', name: 'EQUIPO 3', logo: logo3, points: 1 },
    ],
  },
  {
    id: 'B',
    name: 'Grupo B',
    teams: [
      { id: '4', name: 'EQUIPO 4', logo: logo1, points: 3 },
      { id: '5', name: 'EQUIPO 5', logo: logo2, points: 0 },
      { id: '6', name: 'EQUIPO 6', logo: logo3, points: 1 },
    ],
  },
];

const BRACKETS: Bracket[] = [
  {
    id: '1',
    stage: 'Octavos de final 1',
    matches: [
      { id: 'm1', homeTeam: { name: 'EQUIPO 1', logo: logo1 }, awayTeam: { name: 'EQUIPO 5', logo: logo3 }, date: 'Miercoles 10 de Marzo', time: '11:30 am' },
      { id: 'm2', homeTeam: { name: 'EQUIPO 2', logo: logo2 }, awayTeam: { name: 'EQUIPO 6', logo: logo1 }, date: 'Miercoles 10 de Marzo', time: '11:30 am' },
      { id: 'm3', homeTeam: { name: 'EQUIPO 3', logo: logo3 }, awayTeam: { name: 'EQUIPO 7', logo: logo2 }, date: 'Miercoles 11 de Marzo', time: '11:30 am' },
      { id: 'm4', homeTeam: { name: 'EQUIPO 4', logo: logo2 }, awayTeam: { name: 'EQUIPO 8', logo: logo3 }, date: 'Miercoles 11 de Marzo', time: '11:30 am' },
    ],
  },
  {
    id: '2',
    stage: 'Cuartos de final',
    matches: [
      { id: 'm5', homeTeam: { name: 'EQUIPO 1', logo: logo1 }, awayTeam: { name: 'EQUIPO 5', logo: logo3 }, date: 'Viernes 12 de Marzo', time: '10:00 am' },
      { id: 'm6', homeTeam: { name: 'EQUIPO 2', logo: logo2 }, awayTeam: { name: 'EQUIPO 6', logo: logo1 }, date: 'Viernes 12 de Marzo', time: '11:30 am' },
      { id: 'm7', homeTeam: { name: 'EQUIPO 3', logo: logo3 }, awayTeam: { name: 'EQUIPO 7', logo: logo2 }, date: 'Viernes 12 de Marzo', time: '01:00 pm' },
      { id: 'm8', homeTeam: { name: 'EQUIPO 4', logo: logo2 }, awayTeam: { name: 'EQUIPO 8', logo: logo3 }, date: 'Viernes 12 de Marzo', time: '02:30 pm' },
    ],
  },
  {
    id: '3',
    stage: 'Semifinales',
    matches: [
      { id: 'm9',  homeTeam: { name: 'EQUIPO 1', logo: logo1 }, awayTeam: { name: 'EQUIPO 5', logo: logo3 }, date: 'Sabado 13 de Marzo', time: '10:00 am' },
      { id: 'm10', homeTeam: { name: 'EQUIPO 2', logo: logo2 }, awayTeam: { name: 'EQUIPO 6', logo: logo1 }, date: 'Sabado 13 de Marzo', time: '12:00 pm' },
    ],
  },
  {
    id: '4',
    stage: 'Final',
    matches: [
      { id: 'm11', homeTeam: { name: 'EQUIPO 2', logo: logo2 }, awayTeam: { name: 'EQUIPO 5', logo: logo3 }, date: 'Domingo 14 de Marzo', time: '11:00 am', winner: 'EQUIPO 2' },
    ],
  },
];

// ─── User icon ────────────────────────────────────────────────────────────────
function UserIcon() {
  return (
    <svg width="28" height="32" viewBox="0 0 40 46" fill="none">
      <path
        d="M33.3337 40.25V36.4167C33.3337 34.3833 32.6313 32.4333 31.381 30.9955C30.1308 29.5577 28.4351 28.75 26.667 28.75H13.3337C11.5655 28.75 9.86986 29.5577 8.61961 30.9955C7.36937 32.4333 6.66699 34.3833 6.66699 36.4167V40.25M26.667 13.4167C26.667 17.6508 23.6822 21.0833 20.0003 21.0833C16.3184 21.0833 13.3337 17.6508 13.3337 13.4167C13.3337 9.18248 16.3184 5.75 20.0003 5.75C23.6822 5.75 26.667 9.18248 26.667 13.4167Z"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function GruposPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<GruposTab>('GRUPOS');
  const [groupIndex, setGroupIndex] = useState(0);
  const [bracketIndex, setBracketIndex] = useState(0);

  return (
    <div className="grupos-wrapper">
      <div className="grupos-page">
        <div className="grupos-bg" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="grupos-left-overlay" />

        {/* ── Top bar ── */}
        <header className="grupos-topbar">
          <img src={techcupLogo} alt="TechCup Fútbol" className="grupos-topbar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/player/menu')} />
          <button className="grupos-avatar" onClick={() => navigate('/login')} aria-label="Perfil">
            <UserIcon />
          </button>
        </header>

        {/* ── Tabs ── */}
        <nav className="grupos-tabs" aria-label="Secciones">
          <button
            className={`grupos-tab ${activeTab === 'GRUPOS' ? 'grupos-tab--active' : ''}`}
            onClick={() => setActiveTab('GRUPOS')}
          >
            GRUPOS
          </button>
          <button
            className={`grupos-tab ${activeTab === 'LLAVES' ? 'grupos-tab--active' : ''}`}
            onClick={() => setActiveTab('LLAVES')}
          >
            LLAVES
          </button>
        </nav>

        {/* ── Content ── */}
        <main className="grupos-content">
          {activeTab === 'GRUPOS' && (
            <GruposCard
              group={GROUPS[groupIndex]}
              onPrev={() => setGroupIndex((i) => Math.max(0, i - 1))}
              onNext={() => setGroupIndex((i) => Math.min(GROUPS.length - 1, i + 1))}
              hasPrev={groupIndex > 0}
              hasNext={groupIndex < GROUPS.length - 1}
            />
          )}

          {activeTab === 'LLAVES' && (
            <LlavesCard
              bracket={BRACKETS[bracketIndex]}
              onPrev={() => setBracketIndex((i) => Math.max(0, i - 1))}
              onNext={() => setBracketIndex((i) => Math.min(BRACKETS.length - 1, i + 1))}
              hasPrev={bracketIndex > 0}
              hasNext={bracketIndex < BRACKETS.length - 1}
            />
          )}
        </main>
      </div>
    </div>
  );
}
