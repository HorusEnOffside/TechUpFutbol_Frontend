import { useNavigate } from 'react-router';
import '../styles/player.css';
import { useAuth } from '../store/AuthContext';
import { NavBarTransparent } from '../components/NavBarTransparent';

import bgVideo from '../assets/James.mp4';

export function PlayerHomePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="player-wrapper">
      <div className="player-page">

        {/* ── Background video ── */}
        <video
          className="player-bg-video"
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* ── Overlays ── */}
        <div className="player-sidebar-overlay" />
        <div className="player-topbar-overlay" />

        {/* ── Top bar ── */}
        <NavBarTransparent onLogoClick={() => navigate('/player/menu')} />

        {/* ── Main welcome content ── */}
        <main className="player-main">
          <div className="player-hero-text">
            Jugador!<br /><br />
            Te damos la bienvenida a<br />
            TECHCUP FÚTBOL!<br /><br />
            &ldquo;Donde el ingenio no<br />
            solo se juega<br />
            en el campeonato&rdquo;
          </div>
        </main>

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
