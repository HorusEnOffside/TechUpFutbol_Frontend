import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/player.css';

import logoBlanco  from '../assets/logoBlanco.png';
import bgVideo     from '../assets/James.mp4';
import llavesCopa       from '../../images/llavesCopa.png';
import image76          from '../../images/image 76.png';
import estadisticasMenu from '../assets/estadisticasMenu.png';
import bandaCapi        from '../../images/BandaCapi.png';
import pagosLogo        from '../../images/PagosLogo.png';

function UserIcon() {
  return (
    <svg width="28" height="32" viewBox="0 0 40 46" fill="none">
      <path
        d="M33.33 40.25V36.42C33.33 34.38 32.63 32.43 31.38 30.99C30.13 29.56 28.44 28.75 26.67 28.75H13.33C11.57 28.75 9.87 29.56 8.62 30.99C7.37 32.43 6.67 34.38 6.67 36.42V40.25M26.67 13.42C26.67 17.65 23.68 21.08 20 21.08C16.32 21.08 13.33 17.65 13.33 13.42C13.33 9.18 16.32 5.75 20 5.75C23.68 5.75 26.67 9.18 26.67 13.42Z"
        stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="22" height="26" viewBox="0 0 29 29" fill="none">
      <path
        d="M14.5 3C9.25 3 5 7.25 5 12.5V20L2 23v1.5h25V23l-3-3.5V12.5C24 7.25 19.75 3 14.5 3ZM14.5 28c1.66 0 3-1.34 3-3h-6c0 1.66 1.34 3 3 3Z"
        fill="rgba(29,27,32,1)"
      />
    </svg>
  );
}

// ─── Menu items — label + where to navigate on content click ─────────────────
const MENU_ITEMS = [
  { id: 'llaves',    label: 'Llaves eliminatorias', path: '/grupos' },
  { id: 'tabla',     label: 'Tabla de posiciones',  path: null },
  { id: 'stats',     label: 'Estadísticas',          path: null },
  { id: 'capitanes', label: 'Capitanes',             path: '/player/capitanes' },
  { id: 'pagos',     label: 'Pagos',                 path: null },
];

// ─── Content for each section ─────────────────────────────────────────────────
// Figma 683-4646: "Llaves" content at x:325 y:322, text 20px Russo One white
function SectionContent({ id, onNavigate }: { id: string; onNavigate: (path: string) => void }) {
  switch (id) {
    case 'llaves':
      return (
        <div className="player-section-content">
          <img src={llavesCopa} alt="Llaves eliminatorias" className="player-section-img player-section-img--llaves" />
          <p className="player-section-text">
            Revisa los cruces y el camino hacia la final.
          </p>
        </div>
      );
    case 'tabla':
      return (
        <div className="player-section-content">
          <img src={image76} alt="Tabla de posiciones" className="player-section-img player-section-img--tabla" />
          <p className="player-section-text">
            Consulta la clasificación y sigue de cerca a tu equipo.
          </p>
        </div>
      );
    case 'capitanes':
      return (
        <div className="player-section-content">
          <img src={bandaCapi} alt="Capitanes" className="player-section-img player-section-img--capi" />
          <p className="player-section-text player-section-text--capi">
            Crea tu equipo, ¡Escoge los mejores jugadores!
          </p>
        </div>
      );
    case 'stats':
      return (
        <div className="player-section-content">
          <img src={estadisticasMenu} alt="Estadísticas" className="player-section-img player-section-img--stats" />
          <p className="player-section-text player-section-text--stats">
            Descubre los mejores números del torneo.
          </p>
        </div>
      );
    case 'pagos':
      return (
        <div className="player-section-content">
          <img src={pagosLogo} alt="Pagos" className="player-section-img player-section-img--pagos" />
          <p className="player-section-text">
            Gestiona tus pagos y revisa tus transacciones.
          </p>
        </div>
      );
    default:
      return (
        <div className="player-section-content">
          <p className="player-section-text">Próximamente disponible.</p>
        </div>
      );
  }
}

export function PlayerMenuPage() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState('llaves');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="player-wrapper">
      <div className="player-page">

        {/* ── Background video ── */}
        <video className="player-bg-video" src={bgVideo} autoPlay loop muted playsInline />

        {/* ── Overlays ── */}
        <div className="player-sidebar-overlay" />
        <div className="player-topbar-overlay" />

        {/* ── Top bar ── */}
        <header className="player-topbar">
          <img src={logoBlanco} alt="TechCup Fútbol" className="player-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/player')} />
          <span className="player-welcome-text">¡Bienvenido James!</span>
          <button className="player-avatar" onClick={() => navigate('/login')} aria-label="Perfil">
            <UserIcon />
          </button>
        </header>

        {/* ── Side nav ── */}
        {/* Figma: items x:33, y:242→456, active=24px white, inactive=20px rgba(178,178,178) */}
        <nav className="player-sidenav" onMouseLeave={() => setHoveredId(null)}>
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`player-sidenav-item ${activeId === item.id ? 'player-sidenav-item--active' : ''}`}
              onClick={() => item.path ? navigate(item.path) : setActiveId(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ── Main content area — shows hovered section or active section ── */}
        <SectionContent id={hoveredId ?? activeId} onNavigate={navigate} />

        {/* ── Footer ── */}
        <footer className="player-footer">
          <button className="player-notif-btn" aria-label="Notificaciones">
            <BellIcon />
          </button>
          <button className="player-logout-btn" onClick={() => navigate('/login')}>
            Cerrar Sesión
          </button>
        </footer>

      </div>
    </div>
  );
}
