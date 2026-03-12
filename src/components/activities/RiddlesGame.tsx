import { useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ArrowRight, Brain, CheckCircle2, Circle, HelpCircle, Lightbulb, Sparkles, XCircle } from 'lucide-react';
import type { RiddleActivity } from '../../data/activitiesData';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface RiddlesGameProps {
  activity: RiddleActivity;
  onComplete: () => void;
}

type RiddleState = 'pending' | 'correct' | 'wrong';

function normalizeString(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function RiddlesGame({ activity, onComplete }: RiddlesGameProps) {
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [visibleHints, setVisibleHints] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [riddleStates, setRiddleStates] = useState<RiddleState[]>(
    new Array(activity.riddles.length).fill('pending')
  );

  const currentRiddle = activity.riddles[currentRiddleIndex];
  const correctCount = riddleStates.filter((state) => state === 'correct').length;
  const progressPercent = useMemo(
    () => Math.round((correctCount / activity.riddles.length) * 100),
    [correctCount, activity.riddles.length]
  );

  const moveToNextRiddle = () => {
    if (currentRiddleIndex < activity.riddles.length - 1) {
      setCurrentRiddleIndex((prev) => prev + 1);
      setUserAnswer('');
      setVisibleHints(0);
      setFeedback(null);
      return;
    }

    setIsComplete(true);
    setTimeout(() => onComplete(), 1400);
  };

  const checkAnswer = () => {
    if (riddleStates[currentRiddleIndex] === 'correct') return;

    if (!userAnswer.trim()) {
      setFeedback({ type: 'info', text: 'Escribe una respuesta antes de verificar.' });
      return;
    }

    const isCorrect = normalizeString(userAnswer) === normalizeString(currentRiddle.answer);

    setRiddleStates((prev) => {
      const next = [...prev];
      next[currentRiddleIndex] = isCorrect ? 'correct' : 'wrong';
      return next;
    });

    if (isCorrect) {
      setFeedback({ type: 'success', text: `Correcto. Respuesta: ${currentRiddle.answer}` });
      return;
    }

    setFeedback({ type: 'error', text: 'No coincide. Usa una pista e intenta otra vez.' });
  };

  const revealNextHint = () => {
    if (!currentRiddle.hints || visibleHints >= currentRiddle.hints.length) return;
    setVisibleHints((prev) => prev + 1);
  };

  const onAnswerChange = (value: string) => {
    setUserAnswer(value);
    if (riddleStates[currentRiddleIndex] === 'wrong') {
      setRiddleStates((prev) => {
        const next = [...prev];
        next[currentRiddleIndex] = 'pending';
        return next;
      });
    }
    if (feedback?.type !== 'success') {
      setFeedback(null);
    }
  };

  if (isComplete) {
    return (
      <Card className="p-8 rounded-3xl border-none shadow-lg bg-primary/10 space-y-3 text-center">
        <Sparkles className="w-10 h-10 mx-auto text-primary" />
        <h4 className="text-2xl font-semibold">Excelente trabajo</h4>
        <p className="text-muted-foreground">
          Resolviste {correctCount} de {activity.riddles.length} adivinanzas.
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
              Adivinanza {currentRiddleIndex + 1} de {activity.riddles.length}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-3 py-1.5">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{progressPercent}%</span>
          </div>
        </div>
        <div className="h-2 mt-4 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {activity.riddles.map((_, index) => {
          const state = riddleStates[index];
          return (
            <div
              key={index}
              className={`rounded-xl border px-3 py-2 flex items-center justify-center gap-2 transition-all ${
                state === 'correct'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : index === currentRiddleIndex
                  ? 'bg-secondary border-foreground text-foreground'
                  : 'bg-card border-border text-muted-foreground'
              }`}
            >
              {state === 'correct' ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-semibold">{index + 1}</span>}
              <span className="text-xs hidden sm:inline">Adivinanza</span>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <div key={currentRiddleIndex} className="space-y-4">
          <Card className="p-5 rounded-2xl border border-border/70 bg-secondary/40">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <p className="leading-relaxed pt-1">{currentRiddle.question}</p>
            </div>
          </Card>

          <div className="space-y-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(event) => onAnswerChange(event.target.value.toUpperCase())}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  checkAnswer();
                }
              }}
              placeholder="Escribe tu respuesta..."
              className={`w-full px-5 py-3 rounded-xl border-2 text-base uppercase transition-all bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                riddleStates[currentRiddleIndex] === 'correct'
                  ? 'border-primary'
                  : riddleStates[currentRiddleIndex] === 'wrong'
                  ? 'border-destructive'
                  : 'border-border focus:border-foreground'
              }`}
            />

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={checkAnswer}
                disabled={riddleStates[currentRiddleIndex] === 'correct'}
                className="rounded-full bg-primary hover:bg-accent text-primary-foreground"
              >
                Verificar respuesta
              </Button>
              {currentRiddle.hints && currentRiddle.hints.length > 0 && (
                <Button
                  onClick={revealNextHint}
                  disabled={visibleHints >= currentRiddle.hints.length}
                  variant="outline"
                  className="rounded-full gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>Ver pista</span>
                </Button>
              )}
            </div>
          </div>

          {visibleHints > 0 && currentRiddle.hints && (
            <div className="space-y-2">
              {currentRiddle.hints.slice(0, visibleHints).map((hint, index) => (
                <Card key={index} className="p-3 rounded-xl border border-border/70 bg-secondary/40">
                  <div className="flex items-start gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Pista {index + 1}: {hint}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}

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

          {riddleStates[currentRiddleIndex] === 'correct' && (
            <Card className="p-4 rounded-xl border border-primary/40 bg-primary/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-sm">
                  {currentRiddleIndex < activity.riddles.length - 1
                    ? 'Muy bien. Continúa con la siguiente adivinanza.'
                    : 'Ya resolviste todas las adivinanzas de este juego.'}
                </p>
                <Button
                  onClick={moveToNextRiddle}
                  className="rounded-full bg-primary hover:bg-accent text-primary-foreground gap-2"
                >
                  <span>{currentRiddleIndex < activity.riddles.length - 1 ? 'Siguiente adivinanza' : 'Finalizar juego'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      </AnimatePresence>
    </Card>
  );
}
