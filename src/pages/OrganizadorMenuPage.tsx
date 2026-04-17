import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/player.css';
import '../styles/organizador.css';
import { useAuth } from '../store/AuthContext';
import { NavBarTransparent } from '../components/NavBarTransparent';

import bgVideo       from '../assets/menuOrganizador.mp4';
import pagosImg      from '../assets/pagosMenu.png';
import gestionPImg   from '../assets/gestionPMenu.png';
import torneoImg     from '../assets/torneoMenu.png';
import sancionesImg  from '../assets/sanionesMenu.png';

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

        <NavBarTransparent onLogoClick={() => navigate('/organizador')} />

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
          <button className="player-logout-btn" onClick={() => { logout(); navigate('/auth'); }}>
            Cerrar Sesión
          </button>
        </footer>

      </div>
    </div>
  );
}
