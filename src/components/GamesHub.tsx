import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Map, Lightbulb, Type, Search,
  Star, Play, X, Trophy, Sparkles,
  ChevronRight, Gamepad2,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { readingsData } from '../data/activitiesData';
import type { Activity } from '../data/activitiesData';
import { MazeGame } from './activities/MazeGame';
import { RiddlesGame } from './activities/RiddlesGame';
import { WordGamesActivity } from './activities/WordGamesActivity';
import { WordSearchGame } from './activities/WordSearchGame';
import { useProgress } from '../context/ProgressContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

// ─────────────────────────── Types ───────────────────────────
export type GameType = 'maze' | 'riddles' | 'word-games' | 'word-search';

export interface GameLevel {
  readingId: string;
  readingTitle: string;
  moduleId: string;
  moduleLabel: string;
  activity: Activity;
  imageUrl: string;
}

// ─────────────────────────── Config ───────────────────────────
export const gameCategories = [
  {
    type: 'maze' as GameType,
    label: 'Laberinto',
    icon: Map,
    description: 'Guía a los personajes por caminos llenos de giros y curvas',
    color: '#10B981',
  },
  {
    type: 'riddles' as GameType,
    label: 'Adivinanzas',
    icon: Lightbulb,
    description: 'Resuelve acertijos y adivina las respuestas misteriosas',
    color: '#8B5CF6',
  },
  {
    type: 'word-games' as GameType,
    label: 'Juegos de Palabras',
    icon: Type,
    description: 'Ordena letras, completa frases y descifra palabras',
    color: '#3B82F6',
  },
  {
    type: 'word-search' as GameType,
    label: 'Sopa de Letras',
    icon: Search,
    description: 'Encuentra palabras ocultas entre filas y columnas',
    color: '#F59E0B',
  },
];

const moduleLabels: Record<string, string> = {
  'cuentos-magicos': 'Cuentos Mágicos',
  'animales-amigos': 'Animales Amigos',
  'aventuras-espaciales': 'Aventuras Espaciales',
  'historias-heroes': 'Historias de Héroes',
};

// ─────────────────────────── Helpers ───────────────────────────
export function getAllLevelsByType(): Record<GameType, GameLevel[]> {
  const result: Record<GameType, GameLevel[]> = {
    maze: [], riddles: [], 'word-games': [], 'word-search': [],
  };
  for (const moduleData of readingsData) {
    for (const reading of moduleData.readings) {
      const type = reading.activity.type as GameType;
      result[type].push({
        readingId: reading.id,
        readingTitle: reading.title,
        moduleId: moduleData.moduleId,
        moduleLabel: moduleLabels[moduleData.moduleId] ?? moduleData.moduleId,
        activity: reading.activity,
        imageUrl: reading.imageUrl,
      });
    }
  }
  return result;
}

// ─────────────────────────── GameModal ───────────────────────────
interface GameModalProps {
  level: GameLevel;
  onClose: () => void;
}

export function GameModal({ level, onClose }: GameModalProps) {
  const [finished, setFinished] = useState(false);
  const category = gameCategories.find(c => c.type === level.activity.type)!;
  const { recordGame } = useProgress();
  const Icon = category.icon;

  const handleComplete = () => {
    setFinished(true);
    recordGame({
      gameType: level.activity.type,
      readingTitle: level.readingTitle,
      source: 'hub',
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-card rounded-[2rem] shadow-2xl border border-border"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="relative bg-secondary p-6 rounded-t-[2rem] border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-md">
                <Icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">{category.label}</p>
                <h2 className="text-foreground text-xl font-bold">{level.readingTitle}</h2>
                <Badge variant="secondary" className="mt-2">
                  {level.moduleLabel}
                </Badge>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Game content */}
        <div className="p-6">
          {finished ? (
            <motion.div
              className="flex flex-col items-center justify-center py-12 gap-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
            >
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-xl">
                <Trophy className="w-12 h-12 text-primary-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">¡Genial, lo lograste!</h3>
                <p className="text-muted-foreground">Completaste el juego de {level.readingTitle}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setFinished(false)}
                  className="rounded-full bg-primary hover:bg-accent text-primary-foreground"
                >
                  Jugar de nuevo
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="rounded-full"
                >
                  Volver a juegos
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              {level.activity.type === 'maze'        && <MazeGame        activity={level.activity as any} onComplete={handleComplete} />}
              {level.activity.type === 'riddles'     && <RiddlesGame     activity={level.activity as any} onComplete={handleComplete} />}
              {level.activity.type === 'word-games'  && <WordGamesActivity activity={level.activity as any} onComplete={handleComplete} />}
              {level.activity.type === 'word-search' && <WordSearchGame  activity={level.activity as any} onComplete={handleComplete} />}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────── LevelCard ───────────────────────────
interface LevelCardProps {
  level: GameLevel;
  index: number;
  category: typeof gameCategories[number];
  onPlay: (level: GameLevel) => void;
}

export function LevelCard({ level, index, category, onPlay }: LevelCardProps) {
  return (
    <Card
      className="rounded-[1.5rem] overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 border-none shadow-md"
      onClick={() => onPlay(level)}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={level.imageUrl}
          alt={level.readingTitle}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
            {level.moduleLabel}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <Play className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h4 className="font-bold text-foreground line-clamp-1">{level.readingTitle}</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Nivel {index + 1}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}

// ─────────────────────── GamesHub (categories view) ───────────────────────
export function GamesHub() {
  const navigate  = useNavigate();
  const allLevels = getAllLevelsByType();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
            <Gamepad2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Centro de Juegos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            ¡Elige tu juego favorito!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecciona una categoría y practica con actividades interactivas
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {gameCategories.map((cat, i) => {
            const Icon  = cat.icon;
            const count = allLevels[cat.type].length;
            return (
              <motion.div
                key={cat.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card
                  onClick={() => navigate(`/juegos/${cat.type}`)}
                  className="rounded-[1.5rem] p-6 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 border-none shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        {count}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-foreground">{cat.label}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        {count} {count === 1 ? 'nivel' : 'niveles'}
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="rounded-[1.5rem] p-6 border-none shadow-md bg-secondary">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gameCategories.map(cat => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.type}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {allLevels[cat.type].length}
                      </div>
                      <p className="text-xs text-muted-foreground">{cat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}