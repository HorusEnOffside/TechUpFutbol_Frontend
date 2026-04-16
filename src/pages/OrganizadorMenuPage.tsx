import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/player.css';
import '../styles/organizador.css';
import { useAuth } from '../store/AuthContext';

import logoBlanco    from '../assets/logoBlanco.png';
import bgVideo       from '../assets/menuOrganizador.mp4';
import pagosImg      from '../assets/pagosMenu.png';
import gestionPImg   from '../assets/gestionPMenu.png';
import torneoImg     from '../assets/torneoMenu.png';
import sancionesImg  from '../assets/sanionesMenu.png';

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

const MENU_ITEMS = [
  { id: 'pagos',    label: 'Pagos e inscripciones', path: null },
  { id: 'partidos', label: 'Gestión de partidos',   path: '/organizador/match' },
  { id: 'torneos',  label: 'Gestión de torneos',    path: '/organizador/configuracion' },
  { id: 'sanciones',label: 'Sanciones',             path: '/organizador/sanciones' },
];

function SectionContent({ id }: { id: string }) {
  switch (id) {
    case 'pagos':
      return (
        <div className="player-section-content">
          <img src={pagosImg} alt="Pagos e inscripciones" className="player-section-img org-section-img--pagos" />
          <p className="player-section-text">
            Revisa comprobantes de pago<br />
            Aprueba o rechaza pagos<br />
            Notifica cambios a los capitanes
          </p>
        </div>
      );
    case 'partidos':
      return (
        <div className="player-section-content">
          <img src={gestionPImg} alt="Gestión de partidos" className="player-section-img org-section-img--partidos" />
          <p className="player-section-text">
            Registra resultados<br />
            Asigna árbitros a partidos
          </p>
        </div>
      );
    case 'torneos':
      return (
        <div className="player-section-content">
          <img src={torneoImg} alt="Gestión de torneos" className="player-section-img org-section-img--torneos" />
          <p className="player-section-text">
            Crea torneo<br />
            Consulta, modifica y finaliza torneos<br />
            Configura reglamento, fechas, horarios, canchas y sanciones
          </p>
        </div>
      );
    case 'sanciones':
      return (
        <div className="player-section-content">
          <img src={sancionesImg} alt="Sanciones" className="player-section-img org-section-img--sanciones" />
          <p className="player-section-text">
            Aplica sanciones a jugadores o equipos<br />
            Define motivo y fechas
          </p>
        </div>
      );
    default:
      return null;
  }
}

export function OrganizadorMenuPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeId, setActiveId] = useState('pagos');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="player-wrapper">
      <div className="player-page">

        <video className="player-bg-video" src={bgVideo} autoPlay loop muted playsInline />

        <div className="player-sidebar-overlay" />
        <div className="player-topbar-overlay" />

        <header className="player-topbar">
          <img src={logoBlanco} alt="TechCup Fútbol" className="player-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/organizador')} />
          <span className="player-welcome-text">¡Bienvenido Juan!</span>
          <button className="player-avatar" onClick={() => navigate('/organizador')} aria-label="Perfil">
            <UserIcon />
          </button>
        </header>

        <nav className="player-sidenav org-sidenav" onMouseLeave={() => setHoveredId(null)}>
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

        <SectionContent id={hoveredId ?? activeId} />

        <footer className="player-footer">
          <button className="player-notif-btn" aria-label="Notificaciones">
            <BellIcon />
          </button>
          <button className="player-logout-btn" onClick={() => navigate(-1)}>
            ← Volver
          </button>
          <button className="player-logout-btn" onClick={() => { logout(); navigate('/auth'); }}>
            Cerrar Sesión
          </button>
        </footer>

      </div>
    </div>
  );
}
