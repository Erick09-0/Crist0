import { Home, Gamepad2, TrendingUp, Sparkles, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [studentName, setStudentName] = useState('Estudiante');
  const [activeTab, setActiveTab] = useState('inicio');

  useEffect(() => {
    const saved = localStorage.getItem('studentName');
    if (saved) setStudentName(saved);
  }, []);

  // Sync active tab with current route
  useEffect(() => {
    if (location.pathname === '/menu' || location.pathname.startsWith('/modulo')) {
      setActiveTab('inicio');
    } else if (location.pathname.startsWith('/juegos')) {
      setActiveTab('juegos');
    } else if (location.pathname === '/progreso') {
      setActiveTab('progreso');
    }
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'inicio') navigate('/menu');
    else if (value === 'juegos') navigate('/juegos');
    else if (value === 'progreso') navigate('/progreso');
  };

  const handleLogout = () => {
    localStorage.removeItem('studentName');
    navigate('/', { replace: true });
  };

  const initial = studentName[0]?.toUpperCase() ?? '?';

  return (
    <nav className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => navigate('/menu')}
          >
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">Lumina</span>
          </div>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="hidden md:block">
            <TabsList className="h-10 p-1 bg-secondary rounded-2xl">
              <TabsTrigger 
                value="inicio" 
                className="rounded-xl data-[state=active]:bg-foreground data-[state=active]:text-background gap-2"
              >
                <Home className="w-4 h-4" />
                <span className="hidden lg:inline">Inicio</span>
              </TabsTrigger>
              <TabsTrigger 
                value="juegos"
                className="rounded-xl data-[state=active]:bg-foreground data-[state=active]:text-background gap-2"
              >
                <Gamepad2 className="w-4 h-4" />
                <span className="hidden lg:inline">Mis Juegos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="progreso"
                className="rounded-xl data-[state=active]:bg-foreground data-[state=active]:text-background gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden lg:inline">Mi Progreso</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Mobile tabs */}
          <div className="md:hidden flex-1 mx-4">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="w-full grid grid-cols-3 h-10 p-1 bg-secondary rounded-2xl">
                <TabsTrigger 
                  value="inicio" 
                  className="rounded-xl data-[state=active]:bg-foreground data-[state=active]:text-background"
                >
                  <Home className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger 
                  value="juegos"
                  className="rounded-xl data-[state=active]:bg-foreground data-[state=active]:text-background"
                >
                  <Gamepad2 className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger 
                  value="progreso"
                  className="rounded-xl data-[state=active]:bg-foreground data-[state=active]:text-background"
                >
                  <TrendingUp className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-full gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
            <div
              className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold cursor-pointer flex-shrink-0"
              title={studentName}
            >
              {initial}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
