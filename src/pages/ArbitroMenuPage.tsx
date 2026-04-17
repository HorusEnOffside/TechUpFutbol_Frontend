import { useNavigate } from 'react-router';
import '../styles/player.css';
import { useAuth } from '../store/AuthContext';
import { NavBarTransparent } from '../components/NavBarTransparent';

import bgVideo           from '../assets/menuArbitro.mp4';
import arbitroElemento   from '../assets/menuArbitroElemento.png';

export function ArbitroMenuPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="player-wrapper">
      <div className="player-page">

        <video className="player-bg-video" src={bgVideo} autoPlay loop muted playsInline />

        <div className="player-sidebar-overlay" />
        <div className="player-topbar-overlay" />

        <NavBarTransparent onLogoClick={() => navigate('/arbitro')} />

        {/* imagen + texto centrados en área derecha */}
        <div className="player-section-content">
          <img
            src={arbitroElemento}
            alt="Mis partidos"
            className="player-section-img player-section-img--arbitro"
          />
          <p className="player-section-text arbitro-section-text">
            Ver mis partidos asignados, la ubicación y el listado de jugadores de cada equipo.
          </p>
        </div>

        <footer className="player-footer">
          <button className="player-logout-btn" onClick={() => { logout(); navigate('/auth'); }}>
            Cerrar Sesión
          </button>
        </footer>

      </div>
    </div>
  );
}
