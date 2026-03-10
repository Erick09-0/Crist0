import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface CompletedReading {
  moduleId: string;
  readingId: string;
  title: string;
  score: number;          // preguntas correctas
  total: number;          // total de preguntas
  activityType: string;   // maze | riddles | word-games | word-search
  timestamp: Date;
}

export interface PlayedGame {
  gameType: string;       // maze | riddles | word-games | word-search
  readingTitle: string;
  source: 'module' | 'hub'; // desde flujo de lectura o desde Centro de Juegos
  timestamp: Date;
}

interface ProgressContextType {
  completedReadings: CompletedReading[];
  playedGames: PlayedGame[];
  recordReading: (reading: Omit<CompletedReading, 'timestamp'>) => void;
  recordGame: (game: Omit<PlayedGame, 'timestamp'>) => void;
  getCompletedByModule: (moduleId: string) => CompletedReading[];
  totalXP: number;
  streakDays: number; // simulado — se podría conectar a localStorage en el futuro
}

// ─── Context ────────────────────────────────────────────────────────────────

const ProgressContext = createContext<ProgressContextType | null>(null);

const XP_PER_READING = 50;
const XP_PER_CORRECT = 10;
const XP_PER_GAME    = 30;

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedReadings, setCompletedReadings] = useState<CompletedReading[]>([]);
  const [playedGames, setPlayedGames]             = useState<PlayedGame[]>([]);

  const recordReading = useCallback((reading: Omit<CompletedReading, 'timestamp'>) => {
    setCompletedReadings(prev => [
      { ...reading, timestamp: new Date() },
      ...prev,
    ]);
  }, []);

  const recordGame = useCallback((game: Omit<PlayedGame, 'timestamp'>) => {
    setPlayedGames(prev => [
      { ...game, timestamp: new Date() },
      ...prev,
    ]);
  }, []);

  const getCompletedByModule = useCallback(
    (moduleId: string) => completedReadings.filter(r => r.moduleId === moduleId),
    [completedReadings]
  );

  const totalXP =
    completedReadings.length * XP_PER_READING +
    completedReadings.reduce((acc, r) => acc + r.score * XP_PER_CORRECT, 0) +
    playedGames.length * XP_PER_GAME;

  // Racha simulada — siempre 1 mientras haya actividad en la sesión
  const streakDays = completedReadings.length > 0 || playedGames.length > 0 ? 1 : 0;

  return (
    <ProgressContext.Provider
      value={{
        completedReadings,
        playedGames,
        recordReading,
        recordGame,
        getCompletedByModule,
        totalXP,
        streakDays,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>');
  return ctx;
}
