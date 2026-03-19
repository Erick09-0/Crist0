import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Brain, Gamepad2, CheckCircle, CheckCircle2, RotateCcw, Sparkles, Target, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getReadingCategoryLabel, getReadingsByModule } from '../data/activitiesData';
import { MazeGame } from './activities/MazeGame';
import { RiddlesGame } from './activities/RiddlesGame';
import { WordGamesActivity } from './activities/WordGamesActivity';
import { WordSearchGame } from './activities/WordSearchGame';
import { useProgress } from '../context/ProgressContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ReadingModuleProps {
  moduleId: string;
  initialReadingId?: string;
  onBack: () => void;
}

export function ReadingModule({ moduleId, initialReadingId, onBack }: ReadingModuleProps) {
  const readings = getReadingsByModule(moduleId);

  const initialReadingIndex = useMemo(() => {
    if (!initialReadingId) return 0;
    const foundIndex = readings.findIndex((reading) => reading.id === initialReadingId);
    return foundIndex >= 0 ? foundIndex : 0;
  }, [readings, initialReadingId]);

  const [currentReadingIndex, setCurrentReadingIndex] = useState(initialReadingIndex);
  const [currentStep, setCurrentStep] = useState<'reading' | 'questions' | 'activity'>('reading');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);

  const { recordReading, recordGame } = useProgress();

  if (!readings || readings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4">No hay lecturas disponibles</h2>
          <Button onClick={onBack} variant="outline" className="rounded-full">
            Volver al menú
          </Button>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    setCurrentReadingIndex(initialReadingIndex);
    setCurrentStep('reading');
    setSelectedAnswers({});
    setShowResults(false);
    setActivityCompleted(false);
  }, [initialReadingIndex]);

  const currentReading = readings[currentReadingIndex];

  const openReadingByIndex = (readingIndex: number) => {
    if (readingIndex < 0 || readingIndex >= readings.length) return;
    setCurrentReadingIndex(readingIndex);
    setCurrentStep('reading');
    setSelectedAnswers({});
    setShowResults(false);
    setActivityCompleted(false);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const handleActivityComplete = () => {
    setActivityCompleted(true);
    recordReading({
      moduleId,
      readingId: currentReading.id,
      title: currentReading.title,
      score: correctCount,
      total: currentReading.questions.length,
      activityType: currentReading.activity.type,
    });
    recordGame({
      gameType: currentReading.activity.type,
      readingTitle: currentReading.title,
      source: 'module',
    });
  };

  const correctCount = currentReading.questions.filter(
    (q) => selectedAnswers[q.id] === q.correct
  ).length;

  const renderActivity = () => {
    switch (currentReading.activity.type) {
      case 'maze':
        return <MazeGame activity={currentReading.activity} onComplete={handleActivityComplete} />;
      case 'riddles':
        return <RiddlesGame activity={currentReading.activity} onComplete={handleActivityComplete} />;
      case 'word-games':
        return <WordGamesActivity activity={currentReading.activity} onComplete={handleActivityComplete} />;
      case 'word-search':
        return <WordSearchGame activity={currentReading.activity} onComplete={handleActivityComplete} />;
      default:
        return null;
    }
  };

  const getActivityName = () => {
    switch (currentReading.activity.type) {
      case 'maze':
        return 'Laberinto';
      case 'riddles':
        return 'Adivinanzas';
      case 'word-games':
        return 'Juegos de Palabras';
      case 'word-search':
        return 'Sopa de Letras';
      default:
        return 'Actividad';
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = currentReading.questions.length;
  const questionProgress = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="rounded-xl"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="font-semibold truncate">{currentReading.title}</h1>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${currentStep === 'reading' ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-2 h-2 rounded-full ${currentStep === 'questions' ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-2 h-2 rounded-full ${currentStep === 'activity' ? 'bg-primary' : 'bg-muted'}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          <Badge 
            variant={currentStep === 'reading' ? 'default' : 'outline'}
            className={`gap-1.5 px-3 py-1.5 rounded-full ${
              currentStep === 'reading' ? 'bg-primary text-primary-foreground' : ''
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-xs">Lectura</span>
          </Badge>

          <div className="w-6 h-px bg-border" />

          <Badge 
            variant={currentStep === 'questions' ? 'default' : 'outline'}
            className={`gap-1.5 px-3 py-1.5 rounded-full ${
              currentStep === 'questions' ? 'bg-primary text-primary-foreground' : ''
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="text-xs">Preguntas</span>
          </Badge>

          <div className="w-6 h-px bg-border" />

          <Badge 
            variant={currentStep === 'activity' ? 'default' : 'outline'}
            className={`gap-1.5 px-3 py-1.5 rounded-full ${
              currentStep === 'activity' ? 'bg-primary text-primary-foreground' : ''
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span className="text-xs">{getActivityName()}</span>
          </Badge>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Reading section */}
          {currentStep === 'reading' && (
            <motion.div 
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Image */}
              <Card className="overflow-hidden rounded-3xl border-none shadow-lg">
                <ImageWithFallback
                  src={currentReading.imageUrl}
                  alt={currentReading.title}
                  className="w-full aspect-[16/9] object-cover"
                />
              </Card>

              {/* Title */}
              <div className="text-center">
                <h1 className="text-3xl font-bold">{currentReading.title}</h1>
                {currentReading.readingCategory && (
                  <div className="mt-2 inline-flex text-xs px-3 py-1.5 rounded-full bg-primary/10 text-foreground">
                    {getReadingCategoryLabel(currentReading.readingCategory)}
                  </div>
                )}
              </div>

              {/* Text */}
              <Card className="p-8 rounded-2xl border-border">
                <div className="prose prose-lg max-w-none">
                  <p className="text-base leading-relaxed whitespace-pre-line text-foreground">
                    {currentReading.text}
                  </p>
                </div>
              </Card>

              {/* CTA */}
              <div className="flex justify-center pt-2">
                <Button
                  onClick={() => setCurrentStep('questions')}
                  size="lg"
                  className="rounded-full bg-primary hover:bg-accent text-primary-foreground gap-2 px-8"
                >
                  <span>Ir a preguntas</span>
                  <Brain className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}
          {/* Questions section */}
          {currentStep === 'questions' && (
            <motion.div 
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <Card className="rounded-3xl border-none shadow-lg p-6 bg-gradient-to-r from-primary/10 via-card to-accent/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-secondary mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span>Comprension lectora</span>
                    </div>
                    <h2 className="text-2xl font-bold">Responde las 10 preguntas</h2>
                    <p className="text-sm text-muted-foreground">Marca una opcion por pregunta y revisa tu resultado.</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 border border-border">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{answeredCount}/{totalQuestions} respondidas</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      animate={{ width: `${questionProgress}%` }}
                      transition={{ duration: 0.25 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{questionProgress}% completado</p>
                </div>
              </Card>

              <div className="space-y-4">
                {currentReading.questions.map((question, qIndex) => (
                  <Card key={question.id} className="p-5 rounded-2xl border border-border/70 shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                          {qIndex + 1}
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="text-base font-medium leading-relaxed">
                            {question.question}
                          </h3>
                        </div>
                      </div>

                      <div className="grid gap-2.5 pl-11">
                        {question.options.map((option, optIndex) => {
                          const isSelected = selectedAnswers[question.id] === optIndex;
                          const isCorrect = question.correct === optIndex;
                          const showCorrect = showResults && isCorrect;
                          const showWrong = showResults && isSelected && !isCorrect;
                          const optionLabel = String.fromCharCode(65 + optIndex);

                          return (
                            <button
                              key={optIndex}
                              onClick={() => !showResults && handleAnswerSelect(question.id, optIndex)}
                              disabled={showResults}
                              className={`w-full p-3.5 rounded-xl text-left text-sm transition-all border ${
                                showCorrect
                                  ? 'bg-primary/10 border-primary/60 shadow-sm'
                                  : showWrong
                                  ? 'bg-destructive/10 border-destructive/60'
                                  : isSelected
                                  ? 'bg-secondary border-foreground/40'
                                  : 'bg-card border-border hover:border-primary/30 hover:bg-secondary/40'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold border ${
                                  showCorrect
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : showWrong
                                    ? 'bg-destructive text-destructive-foreground border-destructive'
                                    : isSelected
                                    ? 'bg-foreground text-background border-foreground'
                                    : 'bg-secondary text-foreground border-border'
                                }`}>
                                  {optionLabel}
                                </div>
                                <span className="flex-1">{option}</span>
                                {showCorrect && <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />}
                                {showWrong && <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {showResults && question.explanation && (
                        <p className="text-xs text-muted-foreground pl-11">{question.explanation}</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {showResults && (
                <Card className={`p-6 text-center rounded-2xl border-none shadow-md space-y-2 ${
                  correctCount >= 8 ? 'bg-primary/10' : correctCount >= 6 ? 'bg-accent/10' : 'bg-secondary'
                }`}>
                  <h3 className="text-xl font-semibold">
                    {correctCount === totalQuestions
                      ? 'Perfecto'
                      : correctCount >= 8
                      ? 'Excelente trabajo'
                      : correctCount >= 6
                      ? 'Muy bien'
                      : 'Sigue practicando'}
                  </h3>
                  <p className="text-lg font-medium">
                    {correctCount} de {totalQuestions} correctas
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Puntaje: {Math.round((correctCount / totalQuestions) * 100)}%
                  </p>
                </Card>
              )}

              <Card className="sticky bottom-3 p-4 rounded-2xl border-none shadow-lg bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90">
                <div className="flex flex-wrap gap-3 justify-center sm:justify-between items-center">
                  <Button
                    onClick={() => setCurrentStep('reading')}
                    variant="outline"
                    className="rounded-full gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver a leer</span>
                  </Button>

                  {!showResults ? (
                    <Button
                      onClick={handleFinish}
                      disabled={answeredCount !== totalQuestions}
                      className="rounded-full bg-primary hover:bg-accent text-primary-foreground gap-2 disabled:opacity-50"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Revisar respuestas</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentStep('activity')}
                      className="rounded-full bg-primary hover:bg-accent text-primary-foreground gap-2"
                    >
                      <Gamepad2 className="w-5 h-5" />
                      <span>Ir al juego</span>
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          )}


          {/* Activity section */}
          {currentStep === 'activity' && (
            <motion.div 
              key="activity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {renderActivity()}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={() => {
                    setSelectedAnswers({});
                    setShowResults(false);
                    setCurrentStep('reading');
                    setActivityCompleted(false);
                  }}
                  variant="outline"
                  className="rounded-full gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reiniciar lectura</span>
                </Button>

                {activityCompleted && currentReadingIndex < readings.length - 1 && (
                  <Button
                    onClick={() => openReadingByIndex(currentReadingIndex + 1)}
                    className="rounded-full bg-primary hover:bg-accent text-primary-foreground gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Siguiente lectura</span>
                  </Button>
                )}

                {activityCompleted && (
                  <Button
                    onClick={onBack}
                    variant={currentReadingIndex < readings.length - 1 ? 'outline' : 'default'}
                    className={`rounded-full gap-2 ${
                      currentReadingIndex < readings.length - 1
                        ? ''
                        : 'bg-primary hover:bg-accent text-primary-foreground'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>{currentReadingIndex < readings.length - 1 ? 'Volver al módulo' : 'Finalizar módulo'}</span>
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

