import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  TrendingUp, Star, Trophy, Zap,
  BookOpen, Gamepad2, Award, Target,
  CheckCircle, Sparkles, ArrowRight, Clock,
  Map, Lightbulb, Type, Search,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useProgress } from '../context/ProgressContext';
import { readingsData } from '../data/activitiesData';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const modulesMeta = [
  { id: 'cuentos-magicos', title: 'Cuentos Mágicos', icon: Sparkles },
  { id: 'animales-amigos', title: 'Animales Amigos', icon: Star },
  { id: 'aventuras-espaciales', title: 'Aventuras Espaciales', icon: Zap },
  { id: 'historias-heroes', title: 'Historias de Héroes', icon: Trophy },
];

function getReadingTitle(moduleId: string): string {
  return readingsData.find(m => m.moduleId === moduleId)?.readings[0]?.title ?? '—';
}

const gameTypeLabels: Record<string, { label: string; icon: any }> = {
  maze: { label: 'Laberinto', icon: Map },
  riddles: { label: 'Adivinanzas', icon: Lightbulb },
  'word-games': { label: 'Juegos de Palabras', icon: Type },
  'word-search': { label: 'Sopa de Letras', icon: Search },
};

function useAchievements(
  completedReadings: ReturnType<typeof useProgress>['completedReadings'],
  playedGames: ReturnType<typeof useProgress>['playedGames'],
) {
  const totalReadings = completedReadings.length;
  const uniqueModules = new Set(completedReadings.map(r => r.moduleId)).size;
  const uniqueGameTypes = new Set([
    ...completedReadings.map(r => r.activityType),
    ...playedGames.map(g => g.gameType),
  ]).size;
  const perfectScores = completedReadings.filter(r => r.score === r.total).length;

  return [
    { id: 1, title: 'Primera Lectura', icon: BookOpen, desc: 'Completa tu primera historia', earned: totalReadings >= 1 },
    { id: 2, title: 'Explorador', icon: Map, desc: 'Lee en 2 módulos diferentes', earned: uniqueModules >= 2 },
    { id: 3, title: 'Jugador Estrella', icon: Star, desc: 'Juega todos los tipos de juegos', earned: uniqueGameTypes >= 4 },
    { id: 4, title: 'Perfeccionista', icon: Target, desc: 'Obtén nota perfecta', earned: perfectScores >= 1 },
    { id: 5, title: 'Maratonista', icon: Zap, desc: 'Completa 5 lecturas', earned: totalReadings >= 5 },
    { id: 6, title: 'Gran Campeón', icon: Trophy, desc: 'Explora los 4 módulos', earned: uniqueModules >= 4 },
  ];
}

function timeAgo(date: Date): string {
  const secs = Math.floor((Date.now() - date.getTime()) / 1000);
  if (secs < 60) return 'Ahora';
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  return `${Math.floor(secs / 3600)}h`;
}

export default function ProgresoPage() {
  const navigate = useNavigate();
  const { completedReadings, playedGames, totalXP } = useProgress();
  const [name, setName] = useState('Estudiante');

  useEffect(() => {
    const saved = localStorage.getItem('studentName');
    if (saved) setName(saved);
  }, []);

  const achievements = useAchievements(completedReadings, playedGames);
  const earnedCount = achievements.filter(a => a.earned).length;
  const totalActivity = completedReadings.length + playedGames.length;
  const hasActivity = totalActivity > 0;

  const avgScore = completedReadings.length > 0
    ? (completedReadings.reduce((a, r) => a + (r.score / r.total) * 100, 0) / completedReadings.length).toFixed(0)
    : '0';

  const recentFeed = [
    ...completedReadings.map(r => ({
      type: 'reading' as const,
      title: r.title,
      sub: `${r.score}/${r.total} correctas`,
      timestamp: r.timestamp,
      gameType: r.activityType,
    })),
    ...playedGames
      .filter(g => g.source === 'hub')
      .map(g => ({
        type: 'game' as const,
        title: gameTypeLabels[g.gameType]?.label ?? g.gameType,
        sub: g.readingTitle,
        timestamp: g.timestamp,
        gameType: g.gameType,
      })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 6);

  // Empty State
  if (!hasActivity) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Mi Progreso</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Hola, {name} 
            </h1>
            <p className="text-lg text-muted-foreground">
              Aún no has comenzado ninguna aventura
            </p>
          </motion.div>

          <Card className="rounded-[2rem] p-12 text-center space-y-6 border-none shadow-lg">
            <div className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-inner">
              <BookOpen className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">¡Comienza tu primera lectura!</h2>
              <p className="text-muted-foreground">
                Completa historias, juega y obtén logros increíbles
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => navigate('/menu')}
                size="lg"
                className="rounded-full bg-primary hover:bg-accent text-primary-foreground"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Empezar a leer
              </Button>
              <Button
                onClick={() => navigate('/juegos')}
                size="lg"
                variant="outline"
                className="rounded-full"
              >
                <Gamepad2 className="w-5 h-5 mr-2" />
                Ir a Juegos
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2rem] p-8 border-none shadow-md">
            <h2 className="text-2xl font-bold text-foreground mb-6">Logros por desbloquear</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {achievements.map((ach) => {
                const Icon = ach.icon;
                return (
                  <div
                    key={ach.id}
                    className="flex flex-col items-center text-center p-4 rounded-2xl bg-secondary opacity-50"
                    title={ach.desc}
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-2 grayscale">
                      <Icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-xs font-bold text-muted-foreground">{ach.title}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Dashboard con datos
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Mi Progreso</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            ¡Sigue así, {name}! 🎉
          </h1>
          <p className="text-lg text-muted-foreground">
            Todo lo que has logrado en esta sesión
          </p>
        </motion.div>

        {/* KPI cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Lecturas', value: completedReadings.length, icon: BookOpen },
            { label: 'Juegos', value: playedGames.length, icon: Gamepad2 },
            { label: 'Promedio', value: `${avgScore}%`, icon: Target },
            { label: 'Puntos XP', value: totalXP, icon: Zap },
          ].map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-[1.5rem] p-6 border-none shadow-md">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
                      <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress per module */}
          <Card className="lg:col-span-2 rounded-[2rem] p-8 border-none shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Progreso por Módulo</h2>
              <Button
                onClick={() => navigate('/menu')}
                variant="ghost"
                size="sm"
                className="rounded-full gap-2"
              >
                Ir al inicio
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {modulesMeta.map((mod) => {
                const done = completedReadings.filter(r => r.moduleId === mod.id).length;
                const totalByModule = readingsData.find((moduleData) => moduleData.moduleId === mod.id)?.readings.length ?? 1;
                const pct = Math.round((done / totalByModule) * 100);
                const Icon = mod.icon;
                return (
                  <div key={mod.id} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-foreground">{mod.title}</p>
                          <span className="text-sm font-bold text-muted-foreground">{done}/{totalByModule}</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden ml-13">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <Card className="rounded-2xl p-6 bg-secondary border-none">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total esta sesión</span>
                <span className="text-xl font-bold text-foreground">
                  {completedReadings.length} {completedReadings.length !== 1 ? 'lecturas' : 'lectura'}
                </span>
              </div>
            </Card>
          </Card>

          {/* XP Card */}
          <Card className="rounded-[2rem] p-8 bg-foreground text-background border-none shadow-md flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="font-semibold">Esta sesión</span>
              </div>
              <div>
                <div className="text-6xl font-bold mb-2">{totalXP}</div>
                <p className="text-background/70">puntos XP ganados</p>
              </div>
            </div>

            <div className="space-y-3 mt-8">
              <div className="flex items-center justify-between bg-background/10 rounded-2xl px-4 py-3">
                <span className="text-sm">Lecturas</span>
                <span className="font-bold">{completedReadings.length}</span>
              </div>
              <div className="flex items-center justify-between bg-background/10 rounded-2xl px-4 py-3">
                <span className="text-sm">Juegos</span>
                <span className="font-bold">{playedGames.length}</span>
              </div>
              <div className="flex items-center justify-between bg-background/10 rounded-2xl px-4 py-3">
                <span className="text-sm">Logros</span>
                <span className="font-bold">{earnedCount}/{achievements.length}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="rounded-[2rem] p-8 border-none shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Mis Logros</h2>
            <Badge variant="secondary" className="rounded-full">
              {earnedCount} / {achievements.length}
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {achievements.map((ach) => {
              const Icon = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl transition-all ${
                    ach.earned
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-secondary opacity-50'
                  }`}
                  title={ach.desc}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                    ach.earned ? 'bg-primary' : 'bg-muted grayscale'
                  }`}>
                    <Icon className={`w-6 h-6 ${ach.earned ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </div>
                  <p className="text-xs font-bold text-foreground">{ach.title}</p>
                  {ach.earned && (
                    <Badge variant="secondary" className="mt-2 text-[10px]">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Ganado
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Activity */}
        {recentFeed.length > 0 && (
          <Card className="rounded-[2rem] p-8 border-none shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Actividad Reciente</h2>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              {recentFeed.map((act, i) => {
                const gameInfo = gameTypeLabels[act.gameType] ?? { label: act.gameType, icon: Gamepad2 };
                const Icon = act.type === 'reading' ? BookOpen : gameInfo.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-secondary"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{act.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {act.sub} · {timeAgo(act.timestamp)}
                      </p>
                    </div>

                    {act.type === 'reading' && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* CTA */}
        <Card className="rounded-[2rem] p-8 bg-primary text-primary-foreground border-none shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">¡Sigue leyendo!</h3>
                <p className="text-primary-foreground/80">
                  Cada lectura te da más XP y desbloquea nuevos logros
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/menu')}
                className="rounded-full bg-background text-foreground hover:bg-background/90"
              >
                Leer ahora
              </Button>
              <Button
                onClick={() => navigate('/juegos')}
                variant="outline"
                className="rounded-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Jugar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
