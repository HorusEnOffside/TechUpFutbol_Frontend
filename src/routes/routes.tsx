import { createBrowserRouter } from 'react-router';
import { LandingLayout } from '../components/LandingLayout';
import { AuthenticatedLayout } from '../components/AuthenticatedLayout';
import { Home } from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout><Home /></LandingLayout>,
  },
  {
    path: '/login',
    element: <LandingLayout><Login /></LandingLayout>,
  },
  {
    path: '/register',
    element: <LandingLayout><Register /></LandingLayout>,
  },
  {
    path: '/app',
    element: <AuthenticatedLayout><Home /></AuthenticatedLayout>,
    // children: [...]
  },
]);
