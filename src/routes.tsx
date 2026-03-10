import { createBrowserRouter, redirect } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import JuegosPage from './pages/JuegosPage';
import JuegoPage from './pages/JuegoPage';
import ModuloPage from './pages/ModuloPage';
import ProgresoPage from './pages/ProgresoPage';

export const router = createBrowserRouter([
  // ── Página de bienvenida (pública) ──
  {
    path: '/',
    Component: WelcomePage,
  },
  // /login redirige a /
  {
    path: '/login',
    loader: () => redirect('/'),
  },
  // ── Rutas protegidas con navbar persistente ──
  {
    Component: Layout,
    children: [
      {
        Component: ProtectedRoute,
        children: [
          { path: '/menu',                  Component: MenuPage    },
          { path: '/juegos',                Component: JuegosPage  },
          { path: '/juegos/:gameType',      Component: JuegoPage   },
          { path: '/modulo/:moduleId',      Component: ModuloPage  },
          { path: '/progreso',              Component: ProgresoPage},
        ],
      },
    ],
  },
  // ── 404 → redirige al inicio ──
  {
    path: '*',
    loader: () => redirect('/'),
  },
]);