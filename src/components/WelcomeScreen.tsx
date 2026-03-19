import { BookOpen, Sparkles, Trophy, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import margaritaLogo from '../img/Margarita_logo.png';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleStart = () => {
    if (!showNameInput) {
      setShowNameInput(true);
      return;
    }

    if (name.trim() === '') {
      setShowError(true);
      return;
    }
    localStorage.setItem('studentName', name.trim());
    onStart();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left side - Visual */}
        <div className="hidden lg:flex relative bg-primary/5 items-center justify-center p-12">
          <div className="max-w-xl space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-primary-foreground" />
                </div>
                <h1 className="text-4xl font-bold">Margarita</h1>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden rounded-3xl border-none shadow-2xl">
                <ImageWithFallback
                  src={margaritaLogo}
                  alt="Logo de Margarita"
                  className="w-full aspect-[4/3] object-cover"
                />
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4"
            >
              <Card className="p-4 rounded-2xl border-border text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">10</div>
                <div className="text-xs text-muted-foreground">Historias</div>
              </Card>

              <Card className="p-4 rounded-2xl border-border text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">4</div>
                <div className="text-xs text-muted-foreground">Módulos</div>
              </Card>

              <Card className="p-4 rounded-2xl border-border text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">∞</div>
                <div className="text-xs text-muted-foreground">Diversión</div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:hidden text-center mb-8"
            >
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-bold">Margarita</h1>
              </div>
            </motion.div>

            {/* Welcome message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Bienvenido a Margarita</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Descubre el placer de leer
              </h2>
              <p className="text-lg text-muted-foreground">
                Mejora tu comprensión lectora con historias fascinantes, preguntas interactivas y juegos educativos.
              </p>
            </motion.div>

            {/* Name input - conditional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              {showNameInput ? (
                <div className="space-y-3">
                  <label htmlFor="studentName" className="block text-base font-medium">
                    ¿Cómo te llamas?
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setShowError(false);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                    placeholder="Escribe tu nombre aquí..."
                    className={`w-full px-5 py-3.5 text-base rounded-2xl border-2 transition-all focus:outline-none focus:ring-4 focus:ring-primary/20 ${
                      showError 
                        ? 'border-destructive focus:border-destructive bg-destructive/5' 
                        : 'border-border focus:border-primary bg-card'
                    }`}
                    autoComplete="off"
                    autoFocus
                  />
                  {showError && (
                    <motion.p 
                      className="text-destructive text-sm flex items-center gap-1.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Por favor, escribe tu nombre para continuar
                    </motion.p>
                  )}
                </div>
              ) : null}

              {/* CTA */}
              <Button
                onClick={handleStart}
                size="lg"
                className="w-full rounded-2xl bg-primary hover:bg-accent text-primary-foreground py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {showNameInput ? '¡Comenzar ahora!' : '¡Empezar!'}
              </Button>

              {!showNameInput && (
                <p className="text-sm text-center text-muted-foreground">
                  
                </p>
              )}
            </motion.div>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-3 pt-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-0.5">10 historias interactivas</h4>
                  <p className="text-sm text-muted-foreground">Cuentos diseñados para niños de 6 a 12 años</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-0.5">Juegos educativos</h4>
                  <p className="text-sm text-muted-foreground">Laberintos, sopas de letras, adivinanzas y más</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-0.5">Sigue tu progreso</h4>
                  <p className="text-sm text-muted-foreground">Gana XP y desbloquea logros mientras aprendes</p>
                </div>
              </div>
            </motion.div>

            {/* Mobile stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:hidden grid grid-cols-3 gap-3 pt-6 border-t border-border"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">10</div>
                <div className="text-xs text-muted-foreground">Historias</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4</div>
                <div className="text-xs text-muted-foreground">Módulos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">∞</div>
                <div className="text-xs text-muted-foreground">Diversión</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
