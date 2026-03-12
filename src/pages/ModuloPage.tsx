import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ReadingModule } from '../components/ReadingModule';
import { getReadingsByModule } from '../data/activitiesData';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft, Clock, Star, BookOpen, ChevronRight, Info } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import bosqueImage from '../img/Bosque.jpg';
import delfinesImage from '../img/Delfines.jpg';
import milesImage from '../img/Miles.jpg'; 

const moduleInfo: Record<string, { 
  title: string; 
  description: string; 
  imageUrl: string;
  level: string;
  duration: string;
  fullDescription: string;
}> = {
  'cuentos-magicos': {
    title: 'Cuentos Mágicos',
    description: 'Lee historias fantásticas llenas de magia',
    imageUrl: bosqueImage,
    level: 'Principiante',
    duration: '10 min',
    fullDescription: 'Sumérgete en un mundo de fantasía y magia con historias encantadoras que capturarán tu imaginación. Cada cuento está diseñado para mejorar tu comprensión lectora mientras disfrutas de aventuras mágicas llenas de personajes fascinantes y lecciones valiosas.',
  },
  'animales-amigos': {
    title: 'Animales Amigos',
    description: 'Aprende sobre tus animales favoritos',
    imageUrl: delfinesImage,
    level: 'Principiante',
    duration: '8 min',
    fullDescription: 'Descubre el maravilloso mundo animal a través de historias educativas y entretenidas. Conocerás las aventuras de diferentes animales, sus hábitats y características únicas, todo mientras desarrollas tus habilidades de lectura de manera divertida.',
  },
  'aventuras-espaciales': {
    title: 'Aventuras Espaciales',
    description: 'Explora galaxias y planetas lejanos',
    imageUrl: 'https://images.unsplash.com/photo-1607667708873-ad00f2c4c1a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHJvY2tldCUyMGdhbGF4eSUyMHN0YXJzfGVufDF8fHx8MTc3MjY2MzE0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    level: 'Intermedio',
    duration: '12 min',
    fullDescription: 'Embárcate en emocionantes viajes espaciales y explora el universo infinito. Estas historias te llevarán a planetas desconocidos, te presentarán a civilizaciones alienígenas y te enseñarán sobre el cosmos mientras fortaleces tu comprensión lectora.',
  },
  'historias-heroes': {
    title: 'Historias de Héroes',
    description: 'Conoce héroes valientes y sus hazañas',
    imageUrl: milesImage,
    level: 'Intermedio',
    duration: '10 min',
    fullDescription: 'Conoce a héroes valientes que superan desafíos increíbles con coraje y determinación. Estas historias inspiradoras no solo mejorarán tu comprensión lectora, sino que también te enseñarán valores importantes como la valentía, la amistad y la perseverancia.',
  },
};

export default function ModuloPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [showReading, setShowReading] = useState(false);
  const [selectedReadingId, setSelectedReadingId] = useState<string | null>(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const { getCompletedByModule } = useProgress();

  if (!moduleId) {
    return null;
  }

  const module = moduleInfo[moduleId];
  const readings = getReadingsByModule(moduleId);
  const completed = getCompletedByModule(moduleId);
  const allModules = Object.keys(moduleInfo).filter(id => id !== moduleId);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">Módulo no encontrado</h2>
          <Button onClick={() => navigate('/menu')} className="rounded-full">
            Volver al inicio
          </Button>
        </Card>
      </div>
    );
  }

  if (!readings || readings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">No hay lecturas disponibles</h2>
          <p className="text-muted-foreground mb-4">Este módulo aún no tiene lecturas configuradas.</p>
          <Button onClick={() => navigate('/menu')} className="rounded-full">
            Volver al inicio
          </Button>
        </Card>
      </div>
    );
  }

  if (showReading) {
    const initialReadingId =
      selectedReadingId ??
      readings.find((reading) => !completed.some((item) => item.readingId === reading.id))?.id ??
      readings[0].id;

    return (
      <ReadingModule
        moduleId={moduleId}
        initialReadingId={initialReadingId}
        onBack={() => setShowReading(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/menu')}
              className="rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold truncate">{module.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Image */}
        <Card className="overflow-hidden rounded-3xl border-none shadow-lg">
          <div className="relative aspect-[16/9]">
            <ImageWithFallback
              src={module.imageUrl}
              alt={module.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Badges overlay */}
            <div className="absolute top-4 right-4 flex gap-2">
              {completed.length > 0 && (
                <Badge className="bg-primary text-primary-foreground rounded-full px-3 py-1 border-none">
                  Completado
                </Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
            <p className="text-muted-foreground">{module.description}</p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{module.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4" />
              <span>{module.level}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{readings.length} {readings.length === 1 ? 'lectura' : 'lecturas'}</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={() => {
              const firstPendingReading =
                readings.find((reading) => !completed.some((item) => item.readingId === reading.id)) ??
                readings[0];
              setSelectedReadingId(firstPendingReading.id);
              setShowReading(true);
            }}
            className="w-full sm:w-auto rounded-full bg-primary hover:bg-accent text-primary-foreground gap-2 shadow-md"
          >
            {completed.length > 0 ? 'Continuar leyendo' : 'Comenzar ahora'}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Description */}
        <Card className="p-6 rounded-2xl border-border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Descripción
          </h3>
          <Collapsible open={isDescriptionOpen} onOpenChange={setIsDescriptionOpen}>
            <CollapsibleContent className="space-y-2">
              <p className="text-muted-foreground leading-relaxed">
                {module.fullDescription}
              </p>
            </CollapsibleContent>
            {!isDescriptionOpen && (
              <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                {module.fullDescription}
              </p>
            )}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary p-0 h-auto hover:bg-transparent">
                {isDescriptionOpen ? 'Ver menos' : 'Leer más'}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </Card>

        {/* Readings List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Lecturas disponibles</h3>
          <div className="space-y-3">
            {readings.map((reading, index) => {
              const isCompleted = completed.some(c => c.readingId === reading.id);
              return (
                <Card
                  key={reading.id}
                  className="p-4 rounded-2xl border-border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedReadingId(reading.id);
                    setShowReading(true);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-secondary">
                      <ImageWithFallback
                        src={reading.imageUrl}
                        alt={reading.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold line-clamp-1">{reading.title}</h4>
                        {isCompleted && (
                          <Badge variant="outline" className="rounded-full flex-shrink-0">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Completado
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {reading.text.substring(0, 100)}...
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>~10 min</span>
                        <span>•</span>
                        <span>{reading.questions.length} preguntas</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Related/Suggested Modules */}
        {allModules.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">También te puede interesar</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {allModules.slice(0, 4).map((moduleId) => {
                const relatedModule = moduleInfo[moduleId];
                const relatedReadings = getReadingsByModule(moduleId);
                const firstReading = relatedReadings?.[0];
                
                return (
                  <Card
                    key={moduleId}
                    className="flex-shrink-0 w-[160px] overflow-hidden rounded-2xl border-none shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => {
                      navigate(`/modulo/${moduleId}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="relative aspect-[3/4]">
                      <ImageWithFallback
                        src={relatedModule.imageUrl}
                        alt={relatedModule.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm line-clamp-1 mb-1">
                        {relatedModule.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {firstReading?.title || relatedModule.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
