import { useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Sparkles, Shuffle, Type, XCircle } from 'lucide-react';
import type { WordGameActivity } from '../../data/activitiesData';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface WordGamesActivityProps {
  activity: WordGameActivity;
  onComplete: () => void;
}

type GameState = 'pending' | 'correct' | 'wrong';

function normalizeString(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getModeLabel(type: 'complete' | 'scramble' | 'match'): string {
  if (type === 'scramble') return 'Ordena la palabra';
  if (type === 'complete') return 'Completa la frase';
  return 'Selecciona la opcion correcta';
}

export function WordGamesActivity({ activity, onComplete }: WordGamesActivityProps) {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [gameStates, setGameStates] = useState<GameState[]>(
    new Array(activity.games.length).fill('pending')
  );

  const currentGame = activity.games[currentGameIndex];
  const correctCount = gameStates.filter((state) => state === 'correct').length;
  const progressPercent = useMemo(
    () => Math.round((correctCount / activity.games.length) * 100),
    [correctCount, activity.games.length]
  );

  const goToNext = () => {
    if (currentGameIndex < activity.games.length - 1) {
      setCurrentGameIndex((prev) => prev + 1);
      setUserAnswer('');
      setFeedback(null);
      return;
    }

    setIsComplete(true);
    setTimeout(() => onComplete(), 1400);
  };

  const setStateForCurrent = (state: GameState) => {
    setGameStates((prev) => {
      const next = [...prev];
      next[currentGameIndex] = state;
      return next;
    });
  };

  const checkAnswer = (forcedAnswer?: string) => {
    const value = (forcedAnswer ?? userAnswer).trim();

    if (!value) {
      setFeedback({ type: 'info', text: 'Selecciona o escribe una respuesta.' });
      return;
    }

    const isCorrect = normalizeString(value) === normalizeString(currentGame.answer);
    setStateForCurrent(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setFeedback({ type: 'success', text: 'Respuesta correcta.' });
      setTimeout(() => goToNext(), 900);
      return;
    }

    setFeedback({ type: 'error', text: 'Respuesta incorrecta. Intenta nuevamente.' });
  };

  const handleInputChange = (value: string) => {
    setUserAnswer(value);
    if (gameStates[currentGameIndex] === 'wrong') {
      setStateForCurrent('pending');
    }
  };

  const OptionGrid = ({ options }: { options: string[] }) => (
    <div className="grid gap-2.5">
      {options.map((option, index) => {
        const isSelected = userAnswer === option;
        const isCorrect = normalizeString(option) === normalizeString(currentGame.answer);
        const state = gameStates[currentGameIndex];
        const showCorrect = state !== 'pending' && isCorrect;
        const showWrong = state !== 'pending' && isSelected && !isCorrect;
        const label = String.fromCharCode(65 + index);

        return (
          <button
            key={index}
            onClick={() => {
              if (state === 'correct') return;
              setUserAnswer(option);
              checkAnswer(option);
            }}
            className={`w-full rounded-xl border p-3 text-left transition-all ${
              showCorrect
                ? 'bg-primary/10 border-primary/50'
                : showWrong
                ? 'bg-destructive/10 border-destructive/50'
                : isSelected
                ? 'bg-secondary border-foreground/40'
                : 'bg-card border-border hover:bg-secondary/40 hover:border-primary/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-lg border text-xs font-semibold flex items-center justify-center ${
                  showCorrect
                    ? 'bg-primary text-primary-foreground border-primary'
                    : showWrong
                    ? 'bg-destructive text-destructive-foreground border-destructive'
                    : 'bg-secondary border-border'
                }`}
              >
                {label}
              </div>
              <span>{option}</span>
            </div>
          </button>
        );
      })}
    </div>
  );

  const renderCurrentGame = () => {
    if (currentGame.type === 'scramble') {
      return (
        <div className="space-y-4">
          <Card className="p-5 rounded-2xl border border-border/70 bg-secondary/40 space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shuffle className="w-4 h-4 text-primary" />
              <span>Ordena las letras para formar la palabra</span>
            </div>
            <p>{currentGame.question}</p>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold tracking-[0.2em]">{currentGame.scrambled}</p>
            </div>
          </Card>

          <input
            type="text"
            value={userAnswer}
            onChange={(event) => handleInputChange(event.target.value.toUpperCase())}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                checkAnswer();
              }
            }}
            placeholder="Escribe la palabra ordenada..."
            className="w-full px-5 py-3 rounded-xl border-2 border-border bg-card uppercase focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-foreground transition-all"
          />

          <Button onClick={() => checkAnswer()} className="rounded-full bg-primary hover:bg-accent text-primary-foreground">
            Verificar
          </Button>
        </div>
      );
    }

    if (currentGame.type === 'complete') {
      return (
        <div className="space-y-4">
          <Card className="p-5 rounded-2xl border border-border/70 bg-secondary/40">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Type className="w-4 h-4 text-primary" />
              <span>Completa la frase correctamente</span>
            </div>
            <p className="leading-relaxed">{currentGame.question}</p>
          </Card>

          {currentGame.options ? (
            <OptionGrid options={currentGame.options} />
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(event) => handleInputChange(event.target.value.toUpperCase())}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    checkAnswer();
                  }
                }}
                placeholder="Escribe tu respuesta..."
                className="w-full px-5 py-3 rounded-xl border-2 border-border bg-card uppercase focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-foreground transition-all"
              />
              <Button
                onClick={() => checkAnswer()}
                className="rounded-full bg-primary hover:bg-accent text-primary-foreground"
              >
                Verificar
              </Button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <Card className="p-5 rounded-2xl border border-border/70 bg-secondary/40">
          <p className="leading-relaxed">{currentGame.question}</p>
        </Card>
        {currentGame.options && <OptionGrid options={currentGame.options} />}
      </div>
    );
  };

  if (isComplete) {
    return (
      <Card className="p-8 rounded-3xl border-none shadow-lg bg-primary/10 space-y-3 text-center">
        <Sparkles className="w-10 h-10 mx-auto text-primary" />
        <h4 className="text-2xl font-semibold">Juego completado</h4>
        <p className="text-muted-foreground">
          Acertaste {correctCount} de {activity.games.length} retos.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 rounded-3xl border-none shadow-lg space-y-6">
      <Card className="p-5 rounded-2xl border-none bg-gradient-to-r from-primary/10 via-card to-accent/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-2xl font-semibold">{activity.title}</h3>
            <p className="text-sm text-muted-foreground">
              {getModeLabel(currentGame.type)} · Reto {currentGameIndex + 1} de {activity.games.length}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-3 py-1.5">
            <Circle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{progressPercent}%</span>
          </div>
        </div>
        <div className="h-2 mt-4 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
      </Card>

      <div className="flex justify-center gap-2">
        {activity.games.map((_, index) => {
          const state = gameStates[index];
          return (
            <div
              key={index}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                state === 'correct'
                  ? 'bg-primary border-primary text-primary-foreground'
                  : index === currentGameIndex
                  ? 'bg-secondary border-foreground'
                  : 'bg-card border-border text-muted-foreground'
              }`}
            >
              {state === 'correct' ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs">{index + 1}</span>}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <div key={currentGameIndex} className="space-y-4">
          {renderCurrentGame()}

          {feedback && (
            <Card
              className={`p-4 rounded-xl border ${
                feedback.type === 'success'
                  ? 'bg-primary/10 border-primary/40'
                  : feedback.type === 'error'
                  ? 'bg-destructive/10 border-destructive/40'
                  : 'bg-secondary border-border'
              }`}
            >
              <div className="flex items-center gap-2 text-sm">
                {feedback.type === 'success' && <CheckCircle2 className="w-4 h-4 text-primary" />}
                {feedback.type === 'error' && <XCircle className="w-4 h-4 text-destructive" />}
                {feedback.type === 'info' && <Circle className="w-4 h-4 text-muted-foreground" />}
                <span>{feedback.text}</span>
              </div>
            </Card>
          )}
        </div>
      </AnimatePresence>
    </Card>
  );
}
