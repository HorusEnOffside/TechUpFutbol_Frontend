import { useNavigate } from 'react-router';
import '../styles/player.css';

import logoBlanco from '../assets/logoBlanco.png';
import bgVideo    from '../assets/menuOrganizador.mp4';

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

export function OrganizadorHomePage() {
  const navigate = useNavigate();

  return (
    <div className="player-wrapper">
      <div className="player-page">

        <video className="player-bg-video" src={bgVideo} autoPlay loop muted playsInline />

        <div className="player-sidebar-overlay" />
        <div className="player-topbar-overlay" />

        <header className="player-topbar">
          <img src={logoBlanco} alt="TechCup Fútbol" className="player-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/organizador/menu')} />
          <span className="player-welcome-text">¡Bienvenido Juan!</span>
          <button className="player-avatar" aria-label="Perfil">
            <UserIcon />
          </button>
        </header>

        <main className="player-main">
          <div className="player-hero-text">
            Organizador!<br /><br />
            Te damos la bienvenida a<br />
            TECHCUP FÚTBOL!<br /><br />
            &ldquo;Donde el ingenio no<br />
            solo se juega<br />
            en el campeonato&rdquo;
          </div>
        </main>

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
