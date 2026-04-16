import { createBrowserRouter } from 'react-router';
import { LandingLayout } from '../components/LandingLayout';
import { Home } from '../pages/Home';
import AuthContainer from '../pages/AuthContainer';
import { GruposPage } from '../pages/GruposPage';
import { PlayerHomePage } from '../pages/PlayerHomePage';
import { PlayerMenuPage } from '../pages/PlayerMenuPage';
import { ArbitroHomePage } from '../pages/ArbitroHomePage';
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

//cambio
export const router = createBrowserRouter([
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
    path: '/player',
    element: <PlayerHomePage />,
  },
  {
    path: '/player/menu',
    element: <PlayerMenuPage />,
  },
  {
    path: '/arbitro',
    element: <ArbitroHomePage />,
  },
  {
    path: '/arbitro/menu',
    element: <ArbitroMenuPage />,
  },
  {
    path: '/organizador',
    element: <OrganizadorHomePage />,
  },
  {
    path: '/organizador/menu',
    element: <OrganizadorMenuPage />,
  },
  {
    path: '/organizador/sanciones',
    element: <SancionesPage />,
  },
  {
    path: '/player/capitanes',
    element: <CapitanesPage />,
  },
  {
    path: '/player/capitanes/jugadores',
    element: <SeleccionJugadoresPage />,
  },
  {
    path: '/standings',
    element: <Standings />,
  },
  {
    path: '/organizador/match',
    element: <MatchManagementPage />,
  },
  {
    path: '/player/plantilla',
    element: <PlantillaPage />,
  },
  {
    path: '/player/sports-profile',
    element: <SportsProfilePage />,
  },
  {
    path: '/player/estadisticas',
    element: <EstadisticasPage />,
  },
]);
