import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WelcomeScreen } from '../components/WelcomeScreen';

export default function WelcomePage() {
  const navigate = useNavigate();

  // Si ya hay un nombre guardado, ir directo al menú sin pedir nombre de nuevo
  useEffect(() => {
    const saved = localStorage.getItem('studentName');
    if (saved && saved.trim() !== '') {
      navigate('/menu', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <WelcomeScreen onStart={() => navigate('/menu')} />
    </div>
  );
}