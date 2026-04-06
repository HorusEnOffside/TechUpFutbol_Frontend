import { createBrowserRouter } from 'react-router';
import { LandingLayout } from '../components/LandingLayout';
import { AuthenticatedLayout } from '../components/AuthenticatedLayout';
import { Home } from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout><Home /></LandingLayout>,
  },
  {
    path: '/app',
    element: <AuthenticatedLayout><Home /></AuthenticatedLayout>,
    // children: [...]
  },
]);
