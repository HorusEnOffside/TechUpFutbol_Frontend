import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/player.css';
import { useAuth } from '../store/AuthContext';
import { NavBarTransparent } from '../components/NavBarTransparent';

import bgVideo     from '../assets/James.mp4';
import llavesCopa       from '../../images/llavesCopa.png';
import image76          from '../../images/image 76.png';
import estadisticasMenu from '../assets/estadisticasMenu.png';
import bandaCapi        from '../../images/BandaCapi.png';
import pagosLogo        from '../../images/PagosLogo.png';

// ─── Menu items — label + where to navigate on content click ─────────────────
const MENU_ITEMS = [
  { id: 'llaves',    label: 'Llaves eliminatorias', path: '/grupos' },
  { id: 'tabla',     label: 'Tabla de posiciones',  path: '/standings' },
  { id: 'stats',     label: 'Estadísticas',          path: '/player/estadisticas' },
  { id: 'capitanes', label: 'Capitanes',             path: '/player/capitanes' },
  { id: 'pagos',     label: 'Pagos',                 path: '/player/pagos' },
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
  const { logout } = useAuth();
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
        <NavBarTransparent onLogoClick={() => navigate('/player')} />

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
          <button className="player-logout-btn" onClick={() => { logout(); navigate('/auth'); }}>
            Cerrar Sesión
          </button>
        </footer>

      </div>
    </div>
  );
}
