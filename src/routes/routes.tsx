import { createBrowserRouter } from 'react-router';
import { LandingLayout } from '../components/LandingLayout';
import { AuthenticatedLayout } from '../components/AuthenticatedLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Home } from '../pages/Home';
import AuthContainer from '../pages/AuthContainer';
import { GruposPage } from '../pages/GruposPage';
import { PlayerHomePage } from '../pages/PlayerHomePage';
import { PlayerMenuPage } from '../pages/PlayerMenuPage';
import { ArbitroHomePage } from '../pages/ArbitroHomePage';
import { ArbitroMenuPage } from '../pages/ArbitroMenuPage';
import OrganizadorHomePage from '../pages/OrganizadorHomePage';
import { OrganizadorMenuPage } from '../pages/OrganizadorMenuPage';
import Standings from '../pages/Standings';

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
    path: '/standings',
    element: <Standings />,
  },
]);
