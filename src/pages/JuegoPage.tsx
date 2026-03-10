import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import {
  gameCategories,
  getAllLevelsByType,
  GameModal,
  LevelCard,
  type GameType,
  type GameLevel,
} from '../components/GamesHub';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function JuegoPage() {
  const { gameType } = useParams<{ gameType: string }>();
  const navigate     = useNavigate();
  const [activeLevel, setActiveLevel] = useState<GameLevel | null>(null);

  const type     = gameType as GameType;
  const category = gameCategories.find(c => c.type === type);
  const allLevels = getAllLevelsByType();
  const levels   = allLevels[type] ?? [];

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-2xl font-bold text-foreground">Categoría no encontrada</p>
        <Button
          onClick={() => navigate('/juegos')}
          className="rounded-full bg-primary hover:bg-accent text-primary-foreground"
        >
          Volver a Juegos
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Breadcrumb */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            onClick={() => navigate('/juegos')}
            variant="ghost"
            size="sm"
            className="rounded-full gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Todos los juegos
          </Button>

          <div className="w-px h-5 bg-border" />

          <div className="flex items-center gap-3">
            <div className="text-2xl">{category.emoji}</div>
            <div>
              <span className="text-xl font-bold text-foreground">{category.label}</span>
              <span className="ml-3 text-sm text-muted-foreground">
                {levels.length} niveles
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-[2rem] p-8 md:p-12 border-none shadow-lg bg-gradient-to-br from-card to-secondary">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-4xl flex-shrink-0">
                {category.emoji}
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-3 py-1 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Centro de Juegos</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {category.label}
                </h1>
                <p className="text-muted-foreground text-lg">{category.description}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Levels grid */}
        {levels.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl">No hay niveles disponibles</p>
          </div>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {levels.map((level, i) => (
              <LevelCard
                key={level.readingId}
                level={level}
                index={i}
                category={category}
                onPlay={setActiveLevel}
              />
            ))}
          </motion.div>
        )}

        {/* Game Modal */}
        <AnimatePresence>
          {activeLevel && (
            <GameModal
              level={activeLevel}
              onClose={() => setActiveLevel(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}