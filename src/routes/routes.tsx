import { createBrowserRouter, Navigate } from 'react-router';
import type { ReactNode } from 'react';
import { LandingLayout } from '../components/LandingLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Home } from '../pages/Home';
import AuthContainer from '../pages/AuthContainer';
import { GruposPage } from '../pages/GruposPage';
import { PlayerHomePage } from '../pages/PlayerHomePage';
import { PlayerMenuPage } from '../pages/PlayerMenuPage';
import ArbitroHomePage  from '../pages/ArbitroHomePage';
import { ArbitroMenuPage } from '../pages/ArbitroMenuPage';
import OrganizadorHomePage from '../pages/OrganizadorHomePage';
import { OrganizadorMenuPage } from '../pages/OrganizadorMenuPage';
import { CapitanesPage } from '../pages/CapitanesPage';
import { SeleccionJugadoresPage } from '../pages/SeleccionJugadoresPage';
import { SancionesPage } from '../pages/SancionesPage';
import Standings from '../pages/Standings';
import { EstadisticasPage } from '../pages/EstadisticasPage';
import { PlantillaPage } from '../pages/PlantillaPage';
import MatchManagementPage from '../pages/MatchManagementPage';
import SportsProfilePage from '../pages/SportsProfilePage';
import OrganizadorPaymentManagement from '../pages/OrganizadorPaymentManagement';
import HistorialPagosPage from '../pages/HistorialPagosPage';
import OrganizadorCreationTournamentPage from '../pages/OrganizadorCreationTournamentPage';
import OrganizadorProfilePage from '../pages/OrganizadorProfilePage';
import ArbitroProfilePage from '../pages/ArbitroProfilePage';
import OrganizerTournamentHistory from '../pages/OrganizerTournamentHistory';
import OrganizadorConfigurarPartidoPage from '../pages/OrganizadorConfigurarPartidoPage';

const guard = (children: ReactNode, role?: string) => (
  <ProtectedRoute role={role}>{children}</ProtectedRoute>
);

export const router = createBrowserRouter([
  // ── Public routes ──────────────────────────────────────────────────────────
  {
    path: '/',
    element: <LandingLayout><Home /></LandingLayout>,
  },
  {
    path: '/auth',
    element: <AuthContainer />,
  },
  {
    path: '/grupos',
    element: <GruposPage />,
  },
  {
    path: '/standings',
    element: <Standings />,
  },

  // ── Player routes ─────────────────────────────────────────────────────────
  {
    path: '/player',
    element: guard(<PlayerHomePage />),
  },
  {
    path: '/player/menu',
    element: guard(<PlayerMenuPage />),
  },
  {
    path: '/player/capitanes',
    element: guard(<CapitanesPage />),
  },
  {
    path: '/player/capitanes/jugadores',
    element: guard(<SeleccionJugadoresPage />),
  },
  {
    path: '/player/plantilla',
    element: guard(<PlantillaPage />),
  },
  {
    path: '/player/sports-profile',
    element: guard(<SportsProfilePage />),
  },
  {
    path: '/player/estadisticas',
    element: guard(<EstadisticasPage />),
  },

  // ── Árbitro routes ────────────────────────────────────────────────────────
  {
    path: '/arbitro',
    element: guard(<ArbitroHomePage />, 'REFEREE'),
  },
  {
    path: '/arbitro/perfil',
    element: guard(<ArbitroProfilePage />, 'REFEREE'),
  },
  {
    path: '/arbitro/menu',
    element: guard(<ArbitroMenuPage />, 'REFEREE'),
  },

  // ── Organizador routes ────────────────────────────────────────────────────
  {
    path: '/organizador',
    element: guard(<OrganizadorHomePage />, 'ORGANIZER'),
  },
  {
    path: '/organizador/perfil',
    element: guard(<OrganizadorProfilePage />, 'ORGANIZER'),
  },
  {
    path: '/organizador/menu',
    element: guard(<OrganizadorMenuPage />, 'ORGANIZER'),
  },
  {
    path: '/organizador/Payments',
    element: guard(<OrganizadorPaymentManagement />, 'ORGANIZER'),
  },
  {
    path: '/organizador/historial-pagos',
    element: guard(<HistorialPagosPage />, 'ORGANIZER'),
  },
  {
    path: '/organizador/editar-partidos',
    element: guard(<OrganizadorConfigurarPartidoPage />, 'ORGANIZER'),
  },
  {
    path: '/organizador/historial-torneos',
    element: guard(<OrganizerTournamentHistory />, 'ORGANIZER'),
  },
  {
    path: '/organizador/creacion-torneo',
    element: guard(<OrganizadorCreationTournamentPage />, 'ORGANIZER'),
  },
  {
    path: '/organizador/sanciones',
    element: guard(<SancionesPage />, 'ORGANIZER'),
  },
  {
    path: '/organizador/match',
    element: guard(<MatchManagementPage />, 'ORGANIZER'),
  },

  // ── Catch-all ─────────────────────────────────────────────────────────────
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
