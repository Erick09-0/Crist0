import { Navigate, Outlet } from 'react-router';

/**
 * Protege todas las rutas hijas.
 * Si el estudiante no ha ingresado su nombre (no hay entrada en localStorage),
 * lo redirige a "/" para que primero se "registre".
 */
export function ProtectedRoute() {
  const studentName = localStorage.getItem('studentName');

  if (!studentName || studentName.trim() === '') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
