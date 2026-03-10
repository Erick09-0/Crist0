import { BookOpen, Star, Clock, ChevronRight, Sparkles, Trophy, Flame, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProgress } from '../context/ProgressContext';
import { readingsData } from '../data/activitiesData';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import bosqueImage from '../img/Bosque.jpg';
import delfinesImage from '../img/Delfines.jpg';
import milesImage from '../img/Miles.jpg';

const modules = [
  {
    id: 'cuentos-magicos',
    title: 'Cuentos Mágicos',
    description: 'Lee historias fantásticas llenas de magia',
    imageUrl: bosqueImage,
    category: 'destacados',
    level: 'Principiante',
    duration: '10 min',
  },
  {
    id: 'animales-amigos',
    title: 'Animales Amigos',
    description: 'Aprende sobre tus animales favoritos',
    imageUrl: delfinesImage,
    category: 'nuevos',
    level: 'Principiante',
    duration: '8 min',
  },
  {
    id: 'aventuras-espaciales',
    title: 'Aventuras Espaciales',
    description: 'Explora galaxias y planetas lejanos',
    imageUrl: 'https://images.unsplash.com/photo-1607667708873-ad00f2c4c1a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHJvY2tldCUyMGdhbGF4eSUyMHN0YXJzfGVufDF8fHx8MTc3MjY2MzE0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'destacados',
    level: 'Intermedio',
    duration: '12 min',
  },
  {
    id: 'historias-heroes',
    title: 'Historias de Héroes',
    description: 'Conoce héroes valientes y sus hazañas',
    imageUrl: milesImage,
    category: 'nuevos',
    level: 'Intermedio',
    duration: '10 min',
  },
];

function getReadingTitle(moduleId: string): string {
  return readingsData.find(m => m.moduleId === moduleId)?.readings[0]?.title ?? 'Historia';
}

export function MainMenu() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('Estudiante');
  const { completedReadings, totalXP, getCompletedByModule } = useProgress();

  useEffect(() => {
    const saved = localStorage.getItem('studentName');
    if (saved) setStudentName(saved);
  }, []);

  // Featured module for hero card
  const featuredModule = modules.find(m => getCompletedByModule(m.id).length === 0) || modules[0];
  const featuredProgress = getCompletedByModule(featuredModule.id).length;

  // Recent/continue reading
  const recentModules = modules.filter(m => getCompletedByModule(m.id).length > 0).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Featured Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card 
            className="overflow-hidden rounded-3xl border-none shadow-lg cursor-pointer group"
            onClick={() => navigate(`/modulo/${featuredModule.id}`)}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <ImageWithFallback
                src={featuredModule.imageUrl}
                alt={featuredModule.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Badge */}
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full px-3 py-1 border-none">
                {featuredProgress > 0 ? 'Continuar' : 'Nuevo'}
              </Badge>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{featuredModule.duration}</span>
                  <span className="mx-1">•</span>
                  <span>{featuredModule.level}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {featuredModule.title}
                </h2>
                <p className="text-white/80 text-sm line-clamp-2">
                  {featuredModule.description}
                </p>
                <Button 
                  size="lg"
                  className="rounded-full bg-primary hover:bg-accent text-primary-foreground gap-2 mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/modulo/${featuredModule.id}`);
                  }}
                >
                  {featuredProgress > 0 ? 'Continuar leyendo' : 'Leer ahora'}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Continue Reading Section */}
        {recentModules.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Continúa leyendo</h3>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                Ver todo
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {recentModules.map((module) => {
                const readingTitle = getReadingTitle(module.id);
                return (
                  <Card
                    key={module.id}
                    className="flex-shrink-0 w-[140px] overflow-hidden rounded-2xl border-none shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => navigate(`/modulo/${module.id}`)}
                  >
                    <div className="relative aspect-[3/4]">
                      <ImageWithFallback
                        src={module.imageUrl}
                        alt={module.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {readingTitle}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {module.title}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* All Modules Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Todos los módulos</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {modules.map((module) => {
              const completed = getCompletedByModule(module.id);
              const isDone = completed.length > 0;
              const readingTitle = getReadingTitle(module.id);

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="overflow-hidden rounded-2xl border-none shadow-md cursor-pointer group hover:shadow-xl transition-shadow"
                    onClick={() => navigate(`/modulo/${module.id}`)}
                  >
                    <div className="relative aspect-[3/4]">
                      <ImageWithFallback
                        src={module.imageUrl}
                        alt={module.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isDone && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-primary-foreground fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-semibold line-clamp-1">
                        {module.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {readingTitle}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{module.duration}</span>
                        <span>•</span>
                        <span>{module.level}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Card
            className="rounded-2xl p-6 cursor-pointer border-none shadow-md hover:shadow-xl transition-shadow"
            onClick={() => navigate('/juegos')}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                <Trophy className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Centro de Juegos</h3>
                <p className="text-sm text-muted-foreground">Practica con actividades interactivas</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card
            className="rounded-2xl p-6 cursor-pointer border-none shadow-md hover:shadow-xl transition-shadow"
            onClick={() => navigate('/progreso')}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center">
                <Zap className="w-7 h-7 text-background" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Mi Progreso</h3>
                <p className="text-sm text-muted-foreground">{totalXP} XP • {completedReadings.length} lecturas</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
