import bosqueImage from '../img/Bosque.jpg';
import delfinesImage from '../img/Delfines.jpg';
import milesImage from '../img/Miles.jpg';

// Tipos de actividades
export type ActivityType = 'maze' | 'riddles' | 'word-games' | 'word-search';
export type QuestionType = 'literal' | 'inferencial' | 'critica';

// Interfaces para preguntas de comprensión lectora
export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

// Interfaces para diferentes tipos de actividades

export interface MazeActivity {
  type: 'maze';
  title: string;
  description: string;
  grid: number[][];  // 0 = path, 1 = wall, 2 = start, 3 = end
  solution: { row: number; col: number }[];
}

export interface RiddleActivity {
  type: 'riddles';
  title: string;
  riddles: {
    id: number;
    question: string;
    answer: string;
    hints?: string[];
  }[];
}

export interface WordGameActivity {
  type: 'word-games';
  title: string;
  games: {
    id: number;
    type: 'complete' | 'scramble' | 'match';
    question: string;
    answer: string;
    options?: string[];
    scrambled?: string;
  }[];
}

export interface WordSearchActivity {
  type: 'word-search';
  title: string;
  description: string;
  words: string[];
  grid: string[][];
  wordPositions: {
    word: string;
    start: { row: number; col: number };
    end: { row: number; col: number };
  }[];
}

export type Activity = MazeActivity | RiddleActivity | WordGameActivity | WordSearchActivity;

export interface Reading {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  activity: Activity;
  questions: Question[];
}

export interface ModuleReadings {
  moduleId: string;
  readings: Reading[];
}

interface ReadingFocus {
  character: string;
  place: string;
  challenge: string;
  decision: string;
  lesson: string;
  support: string;
}

const readingFocusById: Record<string, ReadingFocus> = {
  'bosque-encantado': {
    character: 'Luna',
    place: 'Un bosque magico',
    challenge: 'Atreverse a explorar una zona desconocida',
    decision: 'Abrir la puerta dorada y descubrir el jardin secreto',
    lesson: 'La curiosidad y la valentia abren nuevas oportunidades',
    support: 'Explorar con cuidado y aprender de cada hallazgo',
  },
  'hada-colores': {
    character: 'Iris',
    place: 'Un reino que habia perdido sus colores',
    challenge: 'Devolver la alegria y el color al reino',
    decision: 'Reunir a los ninos para despertar recuerdos felices',
    lesson: 'La esperanza compartida puede transformar a una comunidad',
    support: 'Unir a las personas para resolver el problema juntos',
  },
  'estrella-perdida': {
    character: 'Lucia',
    place: 'Del cielo a un bosque oscuro en la Tierra',
    challenge: 'Regresar al cielo despues de perderse',
    decision: 'Colaborar con Tomas para encontrar el camino',
    lesson: 'Brillar con otros es mejor que competir en soledad',
    support: 'Trabajar en equipo para superar el miedo',
  },
  'delfin-valiente': {
    character: 'Nico',
    place: 'El oceano Pacifico',
    challenge: 'Liberar a una ballena bebe atrapada en una red',
    decision: 'Pedir ayuda a su familia para rescatarla',
    lesson: 'Ser valiente tambien implica saber pedir ayuda',
    support: 'Coordinar esfuerzos con su familia',
  },
  'mariposa-diferente': {
    character: 'Mia',
    place: 'Un jardin lleno de flores',
    challenge: 'Aceptar su diferencia frente a las burlas',
    decision: 'Hablar con respeto y explicar su valor unico',
    lesson: 'Ser diferente tambien es una fortaleza',
    support: 'Responder con seguridad y amabilidad',
  },
  'oso-hormiga': {
    character: 'Bruno',
    place: 'El bosque',
    challenge: 'Comprender que su fuerza no era suficiente para todo',
    decision: 'Aceptar la ayuda de Ana y su colonia',
    lesson: 'El valor de alguien no depende de su tamano',
    support: 'Reconocer y agradecer el trabajo de los demas',
  },
  'viaje-luna': {
    character: 'Sofia',
    place: 'Entre su habitacion y la Luna',
    challenge: 'Sostener su sueno pese a las burlas',
    decision: 'Comprometerse a estudiar ciencias con dedicacion',
    lesson: 'La constancia acerca los suenos a la realidad',
    support: 'Mantener la motivacion y prepararse cada dia',
  },
  'planeta-colores': {
    character: 'Marta y Carlos',
    place: 'Un planeta que cambia de color',
    challenge: 'Entender el mensaje del planeta',
    decision: 'Observar sus emociones y aprender del entorno',
    lesson: 'Conocer las emociones ayuda a comprendernos mejor',
    support: 'Explorar con curiosidad y reflexion',
  },
  'bombera-valentina': {
    character: 'Valentina',
    place: 'Su pueblo y el edificio en llamas',
    challenge: 'Rescatar a una familia atrapada en un incendio',
    decision: 'Actuar con firmeza cuando otros dudaban',
    lesson: 'El heroismo nace del compromiso con los demas',
    support: 'Prepararse y actuar con valentia responsable',
  },
  'medico-aldea': {
    character: 'Miguel',
    place: 'Una aldea remota en las montanas',
    challenge: 'Atender una emergencia durante una tormenta',
    decision: 'Viajar de noche pese al riesgo para salvar vidas',
    lesson: 'La vocacion de servicio pone a las personas primero',
    support: 'Persistir con calma incluso en condiciones dificiles',
  },
};

function buildExtraQuestions(readingId: string): Omit<Question, 'id'>[] {
  const focus = readingFocusById[readingId];
  if (!focus) return [];

  return [
    {
      type: 'literal',
      question: '¿Quien es el personaje principal de la lectura?',
      options: [focus.character, 'Un personaje que solo aparece al final', 'No se menciona ningun personaje'],
      correct: 0,
    },
    {
      type: 'literal',
      question: '¿En que lugar ocurre principalmente la historia?',
      options: [focus.place, 'En una escuela de otra ciudad', 'En un estadio deportivo'],
      correct: 0,
    },
    {
      type: 'inferencial',
      question: '¿Cual fue el reto mas importante del personaje?',
      options: [focus.challenge, 'Ganar un concurso de cocina', 'Aprender un idioma extranjero'],
      correct: 0,
    },
    {
      type: 'inferencial',
      question: '¿Que decision ayudo a resolver el problema?',
      options: [focus.decision, 'Ignorar la situacion y esperar', 'Abandonar el objetivo al primer intento'],
      correct: 0,
    },
    {
      type: 'critica',
      question: '¿Que valor destaca mas en esta historia?',
      options: [focus.lesson, 'Buscar fama sin esfuerzo', 'Competir sin pensar en otros'],
      correct: 0,
    },
    {
      type: 'critica',
      question: 'Si vivieras una situacion similar, ¿que seria lo mas acertado?',
      options: [focus.support, 'No involucrarte en nada', 'Dejar que otros resuelvan todo'],
      correct: 0,
    },
    {
      type: 'inferencial',
      question: '¿Como cambia el personaje principal al final?',
      options: ['Aprende una leccion importante y mejora su forma de actuar', 'No cambia en absoluto', 'Decide alejarse para siempre de los demas'],
      correct: 0,
    },
  ];
}

function ensureTenQuestionsForReading(reading: Reading): Reading {
  const normalizedQuestions = reading.questions.map((question, index) => ({
    ...question,
    id: index + 1,
  }));

  if (normalizedQuestions.length >= 10) {
    return {
      ...reading,
      questions: normalizedQuestions.slice(0, 10),
    };
  }

  const needed = 10 - normalizedQuestions.length;
  const extraQuestions = buildExtraQuestions(reading.id)
    .slice(0, needed)
    .map((question, index) => ({
      id: normalizedQuestions.length + index + 1,
      ...question,
    }));

  return {
    ...reading,
    questions: [...normalizedQuestions, ...extraQuestions],
  };
}

// Base de datos de lecturas con actividades
const baseReadingsData: ModuleReadings[] = [
  {
    moduleId: 'cuentos-magicos',
    readings: [
      {
        id: 'bosque-encantado',
        title: 'El Bosque Encantado',
        imageUrl: bosqueImage,
        text: `Había una vez un bosque mágico donde los árboles brillaban con luz propia. Las hojas eran de color plateado y dorado, y cuando el viento soplaba, sonaban como campanas suaves.

En ese lugar vivía Luna, una pequeña ardilla muy curiosa y valiente. Cada mañana, Luna saltaba de rama en rama buscando nuevas aventuras. A diferencia de otras ardillas que solo buscaban nueces, Luna prefería explorar lugares desconocidos.

Un día, mientras exploraba una zona profunda del bosque que nadie visitaba, Luna encontró una puerta dorada entre las raíces de un árbol antiguo. La puerta tenía talladas estrellas y lunas que parecían moverse. Con mucho cuidado y un poco de miedo, Luna empujó la puerta y...

¡Descubrió un jardín secreto lleno de flores que cantaban! Las flores entonaban melodías hermosas que contaban historias de tiempos antiguos. Luna se quedó escuchando durante horas, maravillada de haber encontrado ese lugar tan especial.

Desde ese día, Luna visitaba el jardín secreto cada tarde. Allí aprendió que ser curioso y valiente puede llevarte a descubrir las cosas más maravillosas del mundo.`,
        activity: {
          type: 'maze',
          title: '¡Ayuda a Luna a encontrar el jardín secreto!',
          description: 'Guía a Luna a través del bosque hasta la puerta dorada',
          grid: [
            [2, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 3],
            [1, 1, 1, 1, 1, 1, 0, 1]
          ],
          solution: [
            { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 },
            { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 },
            { row: 2, col: 6 }, { row: 2, col: 7 }, { row: 3, col: 7 }, { row: 4, col: 7 },
            { row: 4, col: 6 }, { row: 4, col: 5 }, { row: 4, col: 4 }, { row: 4, col: 3 },
            { row: 4, col: 2 }, { row: 4, col: 1 }, { row: 4, col: 0 }, { row: 5, col: 0 },
            { row: 6, col: 0 }, { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 },
            { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 6, col: 6 }, { row: 6, col: 7 }
          ]
        },
        questions: [
          {
            id: 1,
            type: 'literal',
            question: '¿Qué tipo de árboles había en el bosque mágico?',
            options: ['Árboles de hojas plateadas y doradas', 'Árboles de hojas verdes', 'Árboles de hojas rojas'],
            correct: 0
          },
          {
            id: 2,
            type: 'inferencial',
            question: '¿Por qué Luna visitaba el jardín secreto cada tarde?',
            options: ['Porque era un lugar hermoso y misterioso', 'Porque quería encontrar más flores', 'Porque era un lugar para jugar'],
            correct: 0
          },
          {
            id: 3,
            type: 'critica',
            question: '¿Qué le enseñó el jardín secreto a Luna?',
            options: ['Que ser curioso y valiente puede llevar a descubrir cosas maravillosas', 'Que las flores cantan historias', 'Que el bosque es mágico'],
            correct: 0
          }
        ]
      },
      {
        id: 'hada-colores',
        title: 'El Hada de los Colores',
        imageUrl: bosqueImage,
        text: `En un reino lejano vivía un hada especial llamada Iris. Su poder era único: podía crear arcoíris con sus manos. Pero Iris estaba triste porque el reino había perdido todos sus colores. Todo era gris y opaco.

El rey, preocupado por su pueblo, le pidió a Iris que devolviera los colores al reino. "No puedo hacerlo sola", dijo Iris con voz temblorosa. "Necesito que la gente recuerde la alegría y la esperanza".

Iris tuvo una idea brillante. Reunió a todos los niños del reino en la plaza central. Les pidió que cerraran los ojos y pensaran en sus recuerdos más felices: jugar en el jardín, abrazar a sus padres, reír con sus amigos.

Mientras los niños recordaban con sonrisas en sus rostros, algo mágico sucedió. Los pensamientos felices se convirtieron en pequeñas chispas de luz de colores que salían de sus corazones. Iris tomó esas chispas y las lanzó al cielo, creando el arcoíris más hermoso jamás visto.

El arcoíris tocó cada rincón del reino. Las flores recuperaron sus colores brillantes, el cielo volvió a ser azul, y las mejillas de la gente se pusieron rosadas de felicidad. Todos aprendieron que la verdadera magia viene de dentro de nuestros corazones.`,
        activity: {
          type: 'riddles',
          title: 'Adivinanzas Mágicas de Iris',
          riddles: [
            {
              id: 1,
              question: 'Tengo colores después de la lluvia, en el cielo me ves aparecer, los niños me señalan con alegría. ¿Qué soy?',
              answer: 'ARCOÍRIS',
              hints: ['Tiene siete colores', 'Aparece cuando hay sol y lluvia']
            },
            {
              id: 2,
              question: 'Vuelo sin alas, tengo poderes mágicos, y con mi varita puedo hacer hechizos. ¿Quién soy?',
              answer: 'HADA',
              hints: ['Es un ser mágico', 'Generalmente es pequeña']
            },
            {
              id: 3,
              question: 'Brillan en la oscuridad, están en el cielo de noche, y puedes pedirme deseos. ¿Qué soy?',
              answer: 'ESTRELLA',
              hints: ['Está en el cielo', 'Brilla de noche']
            },
            {
              id: 4,
              question: 'Soy rojo como la sangre, amarillo como el sol, azul como el mar. Juntos hacemos el mundo hermoso. ¿Qué somos?',
              answer: 'COLORES',
              hints: ['Hacen que todo se vea bonito', 'Hay muchos diferentes']
            }
          ]
        },
        questions: [
          {
            id: 1,
            type: 'literal',
            question: '¿Qué poder tenía Iris?',
            options: ['Crear arcoíris con sus manos', 'Volar sin alas', 'Hacer que las flores brillaran'],
            correct: 0
          },
          {
            id: 2,
            type: 'inferencial',
            question: '¿Por qué Iris necesitaba que la gente recordara la alegría y la esperanza?',
            options: ['Para devolver los colores al reino', 'Para hacer que las flores brillaran', 'Para que el rey la ayudara'],
            correct: 0
          },
          {
            id: 3,
            type: 'critica',
            question: '¿Qué le enseñó Iris a la gente del reino?',
            options: ['Que la verdadera magia viene de dentro de nuestros corazones', 'Que los colores son importantes', 'Que los arcoíris son hermosos'],
            correct: 0
          }
        ]
      },
      {
        id: 'estrella-perdida',
        title: 'La Estrella Perdida',
        imageUrl: bosqueImage,
        text: `Lucía era una pequeña estrella que vivía en el cielo junto a miles de otras estrellas. Cada noche, todas brillaban juntas iluminando la oscuridad. Pero Lucía siempre quería brillar más fuerte que las demás.

Una noche, Lucía brilló con tanta fuerza que se salió de su lugar en el cielo y cayó a la tierra. Aterrizó en un bosque oscuro y solitario. Por primera vez, Lucía sintió miedo. Sin las otras estrellas a su lado, su luz era muy débil.

Un pequeño conejo llamado Tomás la encontró. "¿Por qué lloras, estrellita?", preguntó. "Quise brillar sola y ahora estoy perdida", respondió Lucía entre sollozos. Tomás le contó que él también se había alejado de su familia y se había perdido.

Juntos, decidieron ayudarse mutuamente. Lucía iluminaba el camino con su poca luz, y Tomás usaba su buen olfato para encontrar la dirección correcta. Trabajando juntos, Tomás encontró a su familia, y ellos ayudaron a Lucía a regresar al cielo.

Cuando Lucía volvió con las otras estrellas, comprendió algo importante: brilla más fuerte quien brilla junto a otros. Desde entonces, todas las estrellas brillan juntas, creando la luz más hermosa del universo.`,
        activity: {
          type: 'word-games',
          title: 'Juegos de Palabras Estelares',
          games: [
            {
              id: 1,
              type: 'scramble',
              question: 'Desordena esta palabra del cuento: ALLERTSE',
              answer: 'ESTRELLA',
              scrambled: 'ALLERTSE'
            },
            {
              id: 2,
              type: 'complete',
              question: 'Completa la frase: "Brilla más fuerte quien brilla junto a ______"',
              answer: 'OTROS',
              options: ['OTROS', 'SOLO', 'NADIE', 'SIEMPRE']
            },
            {
              id: 3,
              type: 'scramble',
              question: 'Desordena esta palabra: JOCENO',
              answer: 'CONEJO',
              scrambled: 'JOCENO'
            },
            {
              id: 4,
              type: 'complete',
              question: 'El conejo se llamaba ______',
              answer: 'TOMÁS',
              options: ['PEDRO', 'JUAN', 'TOMÁS', 'CARLOS']
            },
            {
              id: 5,
              type: 'match',
              question: '¿Qué iluminaba Lucía?',
              answer: 'EL CAMINO',
              options: ['EL CAMINO', 'LA CASA', 'EL RÍO', 'LA MONTAÑA']
            }
          ]
        },
        questions: [
          {
            id: 1,
            type: 'literal',
            question: '¿Por qué Lucía cayó a la tierra?',
            options: ['Porque brilló demasiado fuerte', 'Porque se cansó de brillar', 'Porque el cielo estaba oscuro'],
            correct: 0
          },
          {
            id: 2,
            type: 'inferencial',
            question: '¿Por qué Tomás ayudó a Lucía?',
            options: ['Porque era su amigo', 'Porque le gustaba ayudar a los demás', 'Porque estaba perdido también'],
            correct: 2
          },
          {
            id: 3,
            type: 'critica',
            question: '¿Qué le enseñó Lucía a las estrellas?',
            options: ['Que brilla más fuerte quien brilla junto a otros', 'Que el cielo es hermoso', 'Que las estrellas son importantes'],
            correct: 0
          }
        ]
      }
    ]
  },
  {
    moduleId: 'animales-amigos',
    readings: [
      {
        id: 'delfin-valiente',
        title: 'El Delfín Valiente',
        imageUrl: delfinesImage,
        text: `En el océano Pacífico vivía un delfín joven llamado Nico. A diferencia de otros delfines que nadaban en grupos grandes, Nico prefería explorar solo. Sus padres siempre le advertían: "El océano es muy grande, quédate cerca de la familia".

Un día, Nico escuchó un sonido extraño que venía de las profundidades. Era un canto triste y solitario. Curioso como siempre, decidió investigar, aunque eso significaba alejarse de su familia. Nadó y nadó hasta que encontró a una ballena bebé atrapada en una red de pesca.

La ballena estaba asustada y cansada de intentar liberarse. "No te preocupes", dijo Nico con voz firme, "te ayudaré". Intentó morder la red, pero era muy resistente. Entonces recordó algo importante: su familia siempre decía que juntos eran más fuertes.

Nico nadó rápidamente de regreso y contó a su familia lo que había visto. Sin dudarlo, veinte delfines lo siguieron hasta donde estaba la ballena. Trabajando en equipo, cortaron la red con sus dientes afilados y liberaron a la ballena bebé.

La madre ballena apareció y agradeció a Nico y su familia. "Eres muy valiente", le dijo, "pero también fuiste sabio al pedir ayuda". Nico comprendió que ser valiente no significa enfrentar todo solo, sino saber cuándo pedir ayuda.`,
        activity: {
          type: 'word-search',
          title: 'Sopa de Letras del Océano',
          description: 'Encuentra las palabras relacionadas con la historia de Nico',
          words: ['DELFIN', 'BALLENA', 'OCEANO', 'FAMILIA', 'VALIENTE', 'EQUIPO'],
          grid: [
            ['D', 'E', 'L', 'F', 'I', 'N', 'X', 'V'],
            ['B', 'Q', 'U', 'A', 'M', 'I', 'L', 'A'],
            ['A', 'E', 'Q', 'U', 'I', 'P', 'O', 'L'],
            ['L', 'Q', 'W', 'E', 'R', 'T', 'Y', 'I'],
            ['L', 'O', 'C', 'E', 'A', 'N', 'O', 'E'],
            ['E', 'F', 'A', 'M', 'I', 'L', 'I', 'A'],
            ['N', 'V', 'A', 'L', 'I', 'E', 'N', 'T'],
            ['A', 'X', 'Z', 'S', 'D', 'F', 'G', 'E']
          ],
          wordPositions: [
            { word: 'DELFIN', start: { row: 0, col: 0 }, end: { row: 0, col: 5 } },
            { word: 'BALLENA', start: { row: 0, col: 0 }, end: { row: 6, col: 0 } },
            { word: 'OCEANO', start: { row: 4, col: 1 }, end: { row: 4, col: 6 } },
            { word: 'FAMILIA', start: { row: 5, col: 1 }, end: { row: 5, col: 7 } },
            { word: 'VALIENTE', start: { row: 6, col: 1 }, end: { row: 7, col: 7 } },
            { word: 'EQUIPO', start: { row: 2, col: 1 }, end: { row: 2, col: 6 } }
          ]
        },
        questions: [
          {
            id: 1,
            type: 'literal',
            question: '¿Por qué Nico exploraba solo?',
            options: ['Porque era curioso', 'Porque sus padres lo permitían', 'Porque quería ser valiente'],
            correct: 0
          },
          {
            id: 2,
            type: 'inferencial',
            question: '¿Por qué Nico decidió pedir ayuda a su familia?',
            options: ['Porque la red era muy resistente', 'Porque la ballena estaba muy herida', 'Porque quería ser valiente'],
            correct: 0
          },
          {
            id: 3,
            type: 'critica',
            question: '¿Qué le enseñó Nico a los delfines?',
            options: ['Que ser valiente no significa enfrentar todo solo, sino saber cuándo pedir ayuda', 'Que juntos eran más fuertes', 'Que la ballena era importante'],
            correct: 0
          }
        ]
      },
      {
        id: 'mariposa-diferente',
        title: 'La Mariposa Diferente',
        imageUrl: delfinesImage,
        text: `En un hermoso jardín lleno de flores, todas las mariposas eran de colores brillantes: rojas, azules, amarillas. Todas, excepto Mía. Mía era una mariposa de color blanco puro, sin ningún otro color en sus alas.

Las otras mariposas se burlaban de ella. "Eres muy aburrida", decían. "Pareces una simple polilla blanca". Mía se sentía muy triste y se escondía entre las flores blancas para que nadie la viera.

Un día llegó al jardín un pintor famoso buscando inspiración. Observó todas las mariposas coloridas, pero ninguna le llamaba la atención. Entonces vio a Mía descansando sobre una rosa blanca. "¡Qué belleza tan pura y elegante!", exclamó emocionado.

El pintor pasó horas pintando a Mía. Su cuadro se hizo tan famoso que personas de todo el mundo venían al jardín a ver a la "mariposa especial". Las otras mariposas no entendían por qué Mía era tan admirada.

Mía les explicó con amabilidad: "Ser diferente no es malo. Cada uno de nosotros tiene algo especial que ofrecer. Ustedes tienen colores vibrantes que alegran el jardín, yo tengo una elegancia simple. Todos somos importantes y hermosos a nuestra manera".`,
        activity: {
          type: 'maze',
          title: '¡Ayuda a Mía a encontrar las flores blancas!',
          description: 'Guía a Mía a través del jardín',
          grid: [
            [2, 0, 0, 1, 0, 0, 1, 0],
            [1, 1, 0, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [1, 1, 0, 1, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 3],
            [0, 1, 1, 1, 1, 1, 0, 1]
          ],
          solution: [
            { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 2 },
            { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 },
            { row: 2, col: 6 }, { row: 2, col: 7 }, { row: 3, col: 7 }, { row: 4, col: 7 },
            { row: 4, col: 6 }, { row: 4, col: 5 }, { row: 4, col: 4 }, { row: 5, col: 4 },
            { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 6, col: 6 }, { row: 6, col: 7 }
          ]
        },
        questions: [
          {
            id: 1,
            type: 'literal',
            question: '¿Por qué las otras mariposas se burlaban de Mía?',
            options: ['Porque era de color blanco', 'Porque era pequeña', 'Porque no tenía alas'],
            correct: 0
          },
          {
            id: 2,
            type: 'inferencial',
            question: '¿Por qué el pintor pintó a Mía?',
            options: ['Porque era la única mariposa blanca', 'Porque era la más bonita', 'Porque era la más grande'],
            correct: 0
          },
          {
            id: 3,
            type: 'critica',
            question: '¿Qué le enseñó Mía a las otras mariposas?',
            options: ['Que ser diferente no es malo', 'Que los colores son importantes', 'Que las flores blancas son hermosas'],
            correct: 0
          }
        ]
      },
      {
        id: 'oso-hormiga',
        title: 'El Oso y la Hormiga',
        imageUrl: delfinesImage,
        text: `Bruno era un oso enorme y fuerte que vivía en el bosque. Todos los animales lo respetaban por su tamaño y fuerza. Bruno estaba orgulloso de ser tan grande y poderoso.

Un día de verano, Bruno se quedó dormido junto a un árbol. Una pequeña hormiga llamada Ana subió por su pata mientras dormía. Cuando Bruno despertó, sintió una cosquilla. "¿Quién osa molestarme?", rugió con voz fuerte. "Soy Ana", respondió la hormiguita sin miedo.

Bruno se rió a carcajadas. "¿Una hormiga tan pequeña tiene nombre? ¡Eres tan diminuta que apenas puedo verte!". Ana respondió tranquila: "Es cierto que soy pequeña, pero también puedo ser útil. Algún día podría ayudarte".

Bruno se rió aún más fuerte. "¿Tú ayudarme a mí? ¡Imposible!". Y se fue caminando, pisando fuerte para demostrar su poder. Pasaron las semanas y Bruno quedó atrapado en una red de cazadores. Luchó con todas sus fuerzas pero no pudo liberarse.

Ana, que pasaba por allí con su colonia, vio a Bruno atrapado. "¡Rápido, ayudemos al oso!", ordenó. Miles de hormiguitas trabajaron juntas mordiendo los hilos de la red. Después de horas de trabajo en equipo, Bruno quedó libre. "Gracias, pequeña Ana", dijo Bruno con humildad. "Aprendí que el tamaño no determina el valor de alguien".`,
        activity: {
          type: 'riddles',
          title: 'Adivinanzas del Bosque',
          riddles: [
            {
              id: 1,
              question: 'Soy grande y peludo, en el bosque vivo, y me encanta la miel. ¿Quién soy?',
              answer: 'OSO',
              hints: ['Es grande y fuerte', 'Le gusta la miel']
            },
            {
              id: 2,
              question: 'Soy muy pequeñita, trabajo en equipo, y cargo cosas más grandes que yo. ¿Quién soy?',
              answer: 'HORMIGA',
              hints: ['Es muy trabajadora', 'Vive en colonias']
            },
            {
              id: 3,
              question: 'Muchos árboles juntos formamos un lugar, animales nos habitan, fresco aire te darán. ¿Qué somos?',
              answer: 'BOSQUE',
              hints: ['Hay muchos árboles', 'Viven animales allí']
            },
            {
              id: 4,
              question: 'Cuando todos trabajamos unidos, lo imposible hacemos posible. ¿Qué es?',
              answer: 'EQUIPO',
              hints: ['Se hace con varias personas', 'Es colaboración']
            }
          ]
        },
        questions: [
          {
            id: 1,
            type: 'literal',
            question: '¿Por qué Bruno se rió de Ana?',
            options: ['Porque Ana era pequeña', 'Porque Ana tenía nombre', 'Porque Ana era útil'],
            correct: 0
          },
          {
            id: 2,
            type: 'inferencial',
            question: '¿Por qué Ana ayudó a Bruno?',
            options: ['Porque era su amiga', 'Porque Bruno la pidió ayuda', 'Porque Ana quería demostrar que era útil'],
            correct: 2
          },
          {
            id: 3,
            type: 'critica',
            question: '¿Qué le enseñó Bruno a Ana?',
            options: ['Que el tamaño no determina el valor de alguien', 'Que las hormigas son importantes', 'Que el bosque es hermoso'],
            correct: 0
          }
        ]
      }
    ]
  },
  {
    moduleId: 'aventuras-espaciales',
    readings: [
      {
        id: 'viaje-luna',
        title: 'El Viaje a la Luna',
        imageUrl: 'https://images.unsplash.com/photo-1664983661035-f3c38a1ea93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29uJTIwYXN0cm9uYXV0JTIwc3BhY2UlMjBzdGFyc3xlbnwxfHx8fDE3NzIwODE1MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `Sofía era una niña de ocho años que soñaba con ser astronauta. Cada noche miraba las estrellas desde su ventana y imaginaba que viajaba por el espacio. Sus compañeros de clase a veces se reían de sus sueños, diciéndole que era imposible.

Una noche, mientras observaba la luna llena, Sofía vio algo increíble: una estrella fugaz pasó tan cerca que iluminó toda su habitación. Cerró los ojos y pidió un deseo: "Quisiera conocer la luna, aunque sea solo un ratito".

Cuando abrió los ojos, estaba flotando en el espacio, vestida con un traje de astronauta brillante. Frente a ella estaba la luna, enorme y plateada. "¿Cómo llegué aquí?", se preguntó asombrada. Una voz suave respondió: "Los sueños de corazón puro pueden hacerse realidad".

Sofía exploró la luna. Saltó alto gracias a la gravedad baja, tocó el polvo lunar y vio la Tierra brillando como una canica azul en la distancia. Pero lo más importante fue lo que aprendió: el universo era aún más maravilloso de lo que había imaginado, y valía la pena estudiar mucho para conocerlo mejor.

Al amanecer, Sofía despertó en su cama. No sabía si había sido un sueño o magia real, pero ya no le importaba. Ahora sabía con certeza que estudiaría ciencias con dedicación porque algún día, de verdad, sería astronauta.`,
        activity: {
          type: 'word-games',
          title: 'Juegos de Palabras Espaciales',
          games: [
            {
              id: 1,
              type: 'scramble',
              question: 'Desordena esta palabra: NUAL',
              answer: 'LUNA',
              scrambled: 'NUAL'
            },
            {
              id: 2,
              type: 'complete',
              question: 'Sofía quería ser ______',
              answer: 'ASTRONAUTA',
              options: ['ASTRONAUTA', 'DOCTORA', 'MAESTRA', 'PINTORA']
            },
            {
              id: 3,
              type: 'scramble',
              question: 'Desordena: LSERETAL',
              answer: 'ESTRELLA',
              scrambled: 'LSERETAL'
            },
            {
              id: 4,
              type: 'match',
              question: '¿Qué brillaba como una canica azul?',
              answer: 'LA TIERRA',
              options: ['LA TIERRA', 'LA LUNA', 'EL SOL', 'MARTE']
            },
            {
              id: 5,
              type: 'complete',
              question: 'Sofía tenía ______ años',
              answer: 'OCHO',
              options: ['SEIS', 'SIETE', 'OCHO', 'NUEVE']
            }
          ]
        },
        questions: [
          {
            id: 1,
            type: 'literal',
            question: '¿Por qué Sofía soñaba con ser astronauta?',
            options: ['Porque le gustaba el espacio', 'Porque quería viajar', 'Porque era una niña'],
            correct: 0
          },
          {
            id: 2,
            type: 'inferencial',
            question: '¿Por qué Sofía pidió un deseo?',
            options: ['Porque quería conocer la luna', 'Porque quería ser astronauta', 'Porque quería viajar'],
            correct: 0
          },
          {
            id: 3,
            type: 'critica',
            question: '¿Qué le enseñó Sofía a los niños?',
            options: ['Que estudiar ciencias con dedicación puede hacer que tus sueños se hagan realidad', 'Que el espacio es hermoso', 'Que la luna es plateada'],
            correct: 0
          }
        ]
      },
      {
        id: 'planeta-colores',
        title: 'El Planeta de los Colores',
        imageUrl: 'https://images.unsplash.com/photo-1769255119722-4537443e3ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFsaWVuJTIwcGxhbmV0JTIwc3BhY2V8ZW58MXx8fHwxNzcyMDgxNTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `Los astronautas Marta y Carlos viajaban en su nave espacial explorando la galaxia. Llevaban meses sin encontrar nada interesante, solo planetas vacíos de roca y gas. Estaban a punto de volver a la Tierra cuando detectaron algo extraño.

"¡Mira el radar!", gritó Carlos emocionado. "Hay un planeta que cambia de color cada segundo". Era cierto: el planeta pasaba del rojo al azul, del verde al amarillo, como si estuviera vivo. Decidieron aterrizar para investigar.

Al tocar el suelo del planeta, todo a su alrededor brillaba con colores increíbles. No había plantas ni animales, pero el planeta mismo parecía comunicarse con ellos a través de los colores. Cuando sentían alegría, todo se volvía dorado. Cuando tenían miedo, todo se tornaba gris.

Marta comprendió el mensaje: "Este planeta refleja nuestras emociones. Es como un espejo de nuestros sentimientos". Pasaron horas experimentando, riendo juntos haciendo que todo brillara con arcoíris, pensando en sus seres queridos para crear paisajes rosados.

Al regresar a la Tierra, Marta y Carlos compartieron su descubrimiento: encontraron un planeta que les enseñó que las emociones son poderosas y hermosas. También aprendieron que explorar el espacio exterior puede ayudarnos a entender mejor nuestro mundo interior.`,
        activity: {
          type: 'word-search',
          title: 'Sopa de Letras Espacial',
          description: 'Encuentra las palabras del viaje espacial',
          words: ['PLANETA', 'ESPACIO', 'COLORES', 'NAVE', 'MARTA', 'CARLOS'],
          grid: [
            ['P', 'L', 'A', 'N', 'E', 'T', 'A', 'X'],
            ['E', 'S', 'P', 'A', 'C', 'I', 'O', 'M'],
            ['C', 'O', 'L', 'O', 'R', 'E', 'S', 'A'],
            ['N', 'A', 'V', 'E', 'X', 'Z', 'Q', 'R'],
            ['M', 'A', 'R', 'T', 'A', 'W', 'E', 'T'],
            ['C', 'A', 'R', 'L', 'O', 'S', 'R', 'A'],
            ['X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E'],
            ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
          ],
          wordPositions: [
            { word: 'PLANETA', start: { row: 0, col: 0 }, end: { row: 0, col: 6 } },
            { word: 'ESPACIO', start: { row: 1, col: 0 }, end: { row: 1, col: 6 } },
            { word: 'COLORES', start: { row: 2, col: 0 }, end: { row: 2, col: 6 } },
            { word: 'NAVE', start: { row: 3, col: 0 }, end: { row: 3, col: 3 } },
            { word: 'MARTA', start: { row: 4, col: 0 }, end: { row: 4, col: 4 } },
            { word: 'CARLOS', start: { row: 5, col: 0 }, end: { row: 5, col: 5 } }
          ]
        },
        questions: [
          {
            id: 1,
            type: 'literal',
            question: '¿Por qué Marta y Carlos decidieron aterrizar en el planeta?',
            options: ['Porque el planeta cambiaba de color', 'Porque querían explorar más', 'Porque el planeta era grande'],
            correct: 0
          },
          {
            id: 2,
            type: 'inferencial',
            question: '¿Por qué el planeta reflejaba las emociones de Marta y Carlos?',
            options: ['Porque el planeta era mágico', 'Porque el planeta era consciente', 'Porque el planeta era un espejo'],
            correct: 0
          },
          {
            id: 3,
            type: 'critica',
            question: '¿Qué le enseñó el planeta a Marta y Carlos?',
            options: ['Que las emociones son poderosas y hermosas', 'Que el espacio es hermoso', 'Que explorar el espacio puede ayudar a entender mejor el mundo interior'],
            correct: 0
          }
        ]
      }
    ]
  },
  {
    moduleId: 'historias-heroes',
    readings: [
      {
        id: 'bombera-valentina',
        title: 'La Bombera Valentina',
        imageUrl: milesImage,
        text: `Valentina siempre supo que quería ser bombera. Desde pequeña admiraba el valor de quienes arriesgaban su vida por ayudar a otros. Sin embargo, en su pequeño pueblo, nunca había habido una mujer bombera. Muchos decían que era un trabajo "solo para hombres".

Valentina no se dejó desanimar. Entrenó duramente durante años: corrió kilómetros cada día, levantó pesas, estudió técnicas de rescate. Finalmente, a los 22 años, se convirtió en la primera bombera de su pueblo. Algunos todavía dudaban de sus capacidades.

Un día de verano, un incendio enorme comenzó en el edificio más alto del pueblo. Una familia estaba atrapada en el quinto piso. El humo era muy denso y las escaleras estaban bloqueadas por el fuego. El capitán de bomberos dudaba si enviar a alguien, era muy peligroso.

"Yo iré", dijo Valentina con voz firme. Usando su entrenamiento, subió por la escalera exterior del edificio. El calor era intenso, pero no se rindió. Llegó al quinto piso, rompió la ventana y sacó a la familia una por una. La última en salir fue una niña pequeña que le recordó a ella misma cuando era pequeña y soñaba con ayudar a otros.

El pueblo entero celebró a Valentina como una heroína. Pero ella dijo algo que nadie olvidó: "No soy heroína por ser mujer o por hacer algo especial. Soy heroína porque cuando alguien necesitaba ayuda, no dudé en actuar. Eso puede hacerlo cualquier persona con valor en su corazón".`,
        activity: {
          type: 'maze',
          title: '¡Ayuda a Valentina a llegar al edificio en llamas!',
          description: 'Guía a Valentina a través del pueblo',
          grid: [
            [2, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 3],
            [0, 0, 0, 1, 1, 1, 0, 1]
          ],
          solution: [
            { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 1, col: 0 },
            { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 },
            { row: 2, col: 5 }, { row: 2, col: 6 }, { row: 2, col: 7 }, { row: 3, col: 7 },
            { row: 3, col: 0 }, { row: 4, col: 0 }, { row: 5, col: 0 }, { row: 5, col: 1 },
            { row: 5, col: 2 }, { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 },
            { row: 6, col: 5 }, { row: 6, col: 6 }, { row: 6, col: 7 }
          ]
        },
        questions: [
          {
            id: 1,
            type: 'literal',
            question: '¿Por qué Valentina quería ser bombera?',
            options: ['Porque admiraba el valor de quienes ayudan a otros', 'Porque quería ser una heroína', 'Porque quería ser una mujer fuerte'],
            correct: 0
          },
          {
            id: 2,
            type: 'inferencial',
            question: '¿Por qué Valentina decidió subir por la escalera exterior del edificio?',
            options: ['Porque era más rápido', 'Porque era más seguro', 'Porque era más fácil'],
            correct: 0
          },
          {
            id: 3,
            type: 'critica',
            question: '¿Qué le enseñó Valentina a los demás?',
            options: ['Que ser heroína no significa ser mujer o hacer algo especial, sino actuar con valor', 'Que el incendio fue muy peligroso', 'Que la familia es importante'],
            correct: 0
          }
        ]
      },
      {
        id: 'medico-aldea',
        title: 'El Médico de la Aldea',
        imageUrl: milesImage,
        text: `El doctor Miguel era el único médico en una aldea remota de las montañas. Para llegar a la aldea más cercana se necesitaban tres horas a caballo. Miguel había decidido vivir allí porque sabía que esas personas necesitaban ayuda médica.

Vivir en la aldea no era fácil. No había hospitales con equipos modernos, ni internet para consultar información, ni otros médicos con quienes compartir casos difíciles. Miguel solo tenía sus conocimientos, sus manos y su determinación de ayudar.

Una noche de tormenta terrible, llegó un mensaje urgente. En una casa alejada, una mujer estaba teniendo complicaciones al dar a luz. El camino era peligroso con la tormenta, los árboles caían y el río estaba crecido. Cualquiera habría esperado a que pasara la tormenta, pero Miguel sabía que no había tiempo.

Se montó en su caballo y cabalgó bajo la lluvia torrencial. El viaje que normalmente tomaba una hora, le tomó tres. Llegó empapado y exhausto, pero inmediatamente se puso a trabajar. Con calma y experiencia, ayudó a que el bebé naciera sano. La madre y el bebé estaban bien.

La aldea entera estaba agradecida. Pero Miguel solo dijo: "Ser médico no es solo memorizar términos médicos. Es recordar cada día que detrás de cada paciente hay una persona, una familia, una historia que vale la pena salvar".`,
        activity: {
          type: 'riddles',
          title: 'Adivinanzas de la Aldea',
          riddles: [
            {
              id: 1,
              question: 'Curo a los enfermos, ayudo a sanar, con mi bata blanca me puedes encontrar. ¿Quién soy?',
              answer: 'MÉDICO',
              hints: ['Trabaja en hospitales', 'Ayuda a curar']
            },
            {
              id: 2,
              question: 'Vivo en las montañas, soy pequeña y alejada, pocas personas me habitan. ¿Qué soy?',
              answer: 'ALDEA',
              hints: ['Es más pequeña que una ciudad', 'Está lejos']
            },
            {
              id: 3,
              question: 'Tengo cuatro patas, te llevo de paseo, y relincho cuando me montas. ¿Quién soy?',
              answer: 'CABALLO',
              hints: ['Es un animal', 'Se puede montar']
            },
            {
              id: 4,
              question: 'Cuando hay nubes negras llego con fuerza, traigo rayos y agua, y todos buscan refugio. ¿Qué soy?',
              answer: 'TORMENTA',
              hints: ['Trae lluvia', 'Puede haber rayos']
            }
          ]
        },
        questions: [
          {
            id: 1,
            type: 'literal',
            question: '¿Por qué Miguel vivía en la aldea remota?',
            options: ['Porque era el único médico', 'Porque quería ser médico', 'Porque le gustaban las montañas'],
            correct: 0
          },
          {
            id: 2,
            type: 'inferencial',
            question: '¿Por qué Miguel decidió ir a la casa alejada durante la tormenta?',
            options: ['Porque era su trabajo', 'Porque quería ayudar a la mujer', 'Porque era una emergencia'],
            correct: 2
          },
          {
            id: 3,
            type: 'critica',
            question: '¿Qué le enseñó Miguel a la aldea?',
            options: ['Que ser médico no es solo memorizar términos médicos, sino recordar que detrás de cada paciente hay una persona, una familia, una historia que vale la pena salvar', 'Que la aldea es importante', 'Que la tormenta fue muy peligrosa'],
            correct: 0
          }
        ]
      }
    ]
  }
];

// Función helper para obtener lecturas por módulo
export const readingsData: ModuleReadings[] = baseReadingsData.map((moduleData) => ({
  ...moduleData,
  readings: moduleData.readings.map((reading) => ensureTenQuestionsForReading(reading)),
}));

export function getReadingsByModule(moduleId: string): Reading[] {
  const moduleData = readingsData.find(m => m.moduleId === moduleId);
  return moduleData?.readings || [];
}

// Función helper para obtener una lectura específica
export function getReading(moduleId: string, readingId: string): Reading | undefined {
  const readings = getReadingsByModule(moduleId);
  return readings.find(r => r.id === readingId);
}
