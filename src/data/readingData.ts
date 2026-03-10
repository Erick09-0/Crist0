// Tipos de preguntas de comprensión lectora
export type QuestionType = 'literal' | 'inferencial' | 'critica';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface Reading {
  id: string;
  title: string;
  text: string;
  imageQuery: string;
  imageUrl: string;
  questions: Question[];
}

export interface ModuleReadings {
  moduleId: string;
  readings: Reading[];
}

// Base de datos de lecturas por módulo
export const readingsData: ModuleReadings[] = [
  {
    moduleId: 'cuentos-magicos',
    readings: [
      {
        id: 'bosque-encantado',
        title: 'El Bosque Encantado',
        imageQuery: 'magical forest fantasy',
        imageUrl: 'https://images.unsplash.com/photo-1766307543930-a35e9417b2d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwZm9yZXN0JTIwZmFudGFzeXxlbnwxfHx8fDE3NzIwODE1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `Había una vez un bosque mágico donde los árboles brillaban con luz propia. Las hojas eran de color plateado y dorado, y cuando el viento soplaba, sonaban como campanas suaves.

En ese lugar vivía Luna, una pequeña ardilla muy curiosa y valiente. Cada mañana, Luna saltaba de rama en rama buscando nuevas aventuras. A diferencia de otras ardillas que solo buscaban nueces, Luna prefería explorar lugares desconocidos.

Un día, mientras exploraba una zona profunda del bosque que nadie visitaba, Luna encontró una puerta dorada entre las raíces de un árbol antiquísimo. La puerta tenía talladas estrellas y lunas que parecían moverse. Con mucho cuidado y un poco de miedo, Luna empujó la puerta y...

¡Descubrió un jardín secreto lleno de flores que cantaban! Las flores entonaban melodías hermosas que contaban historias de tiempos antiguos. Luna se quedó escuchando durante horas, maravillada de haber encontrado ese lugar tan especial.

Desde ese día, Luna visitaba el jardín secreto cada tarde. Allí aprendió que ser curioso y valiente puede llevarte a descubrir las cosas más maravillosas del mundo.`,
        questions: [
          // LITERALES
          {
            id: 1,
            type: 'literal',
            question: '¿Cómo se llamaba la ardilla del cuento?',
            options: ['Estrella', 'Luna', 'Sol', 'Nube'],
            correct: 1,
            explanation: 'El texto dice claramente: "vivía Luna, una pequeña ardilla"'
          },
          {
            id: 2,
            type: 'literal',
            question: '¿De qué color eran las hojas de los árboles mágicos?',
            options: ['Verde y azul', 'Rojo y naranja', 'Plateado y dorado', 'Negro y blanco'],
            correct: 2,
            explanation: 'El cuento menciona: "Las hojas eran de color plateado y dorado"'
          },
          {
            id: 3,
            type: 'literal',
            question: '¿Qué encontró Luna entre las raíces del árbol?',
            options: ['Una casa', 'Un tesoro', 'Una puerta dorada', 'Una cueva oscura'],
            correct: 2,
            explanation: 'El texto indica: "Luna encontró una puerta dorada entre las raíces"'
          },
          // INFERENCIALES
          {
            id: 4,
            type: 'inferencial',
            question: '¿Por qué Luna era diferente a las otras ardillas?',
            options: [
              'Era más pequeña',
              'Prefería explorar en vez de buscar comida',
              'Era de otro color',
              'No sabía saltar'
            ],
            correct: 1,
            explanation: 'El texto dice que "a diferencia de otras ardillas que solo buscaban nueces, Luna prefería explorar"'
          },
          {
            id: 5,
            type: 'inferencial',
            question: '¿Qué sentimiento tuvo Luna antes de abrir la puerta?',
            options: ['Alegría', 'Enojo', 'Un poco de miedo', 'Tristeza'],
            correct: 2,
            explanation: 'El texto menciona "con mucho cuidado y un poco de miedo, Luna empujó la puerta"'
          },
          {
            id: 6,
            type: 'inferencial',
            question: '¿Por qué Luna volvía cada tarde al jardín?',
            options: [
              'Para buscar comida',
              'Porque le encantaba lo que había descubierto',
              'Para dormir allí',
              'Para esconderse de otros animales'
            ],
            correct: 1,
            explanation: 'Se puede deducir que Luna valoraba su descubrimiento ya que volvía regularmente'
          },
          // CRÍTICAS
          {
            id: 7,
            type: 'critica',
            question: '¿Qué enseñanza nos deja este cuento?',
            options: [
              'Nunca debemos explorar lugares nuevos',
              'Las ardillas solo deben buscar nueces',
              'Ser curioso y valiente puede llevarnos a descubrir cosas maravillosas',
              'Es mejor quedarse en casa siempre'
            ],
            correct: 2,
            explanation: 'El cuento termina con esta moraleja explícita'
          },
          {
            id: 8,
            type: 'critica',
            question: '¿Qué opinas sobre la actitud de Luna de ser curiosa?',
            options: [
              'Es peligroso y no debería hacerlo',
              'Es una cualidad positiva que la ayudó a descubrir cosas increíbles',
              'Es una pérdida de tiempo',
              'Solo los adultos pueden ser curiosos'
            ],
            correct: 1,
            explanation: 'La historia presenta la curiosidad como algo positivo que llevó a Luna a un descubrimiento maravilloso'
          },
          {
            id: 9,
            type: 'critica',
            question: '¿Crees que Luna hizo bien en abrir la puerta aunque tenía miedo?',
            options: [
              'No, debió huir inmediatamente',
              'Sí, porque superó su miedo y encontró algo hermoso',
              'No, nunca hay que hacer cosas que dan miedo',
              'Sí, pero solo porque era mágica'
            ],
            correct: 1,
            explanation: 'El cuento muestra que superar el miedo con precaución puede llevar a experiencias positivas'
          }
        ]
      },
      {
        id: 'hada-colores',
        title: 'El Hada de los Colores',
        imageQuery: 'fairy rainbow colors magical',
        imageUrl: 'https://images.unsplash.com/photo-1619629219033-82954b19de75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWlyeSUyMHJhaW5ib3clMjBjb2xvcnMlMjBtYWdpY2FsfGVufDF8fHx8MTc3MjA4MTUxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `En un reino lejano vivía un hada especial llamada Iris. Su poder era único: podía crear arcoíris con sus manos. Pero Iris estaba triste porque el reino había perdido todos sus colores. Todo era gris y opaco.

El rey, preocupado por su pueblo, le pidió a Iris que devolviera los colores al reino. "No puedo hacerlo sola", dijo Iris con voz temblorosa. "Necesito que la gente recuerde la alegría y la esperanza".

Iris tuvo una idea brillante. Reunió a todos los niños del reino en la plaza central. Les pidió que cerraran los ojos y pensaran en sus recuerdos más felices: jugar en el jardín, abrazar a sus padres, reír con sus amigos.

Mientras los niños recordaban con sonrisas en sus rostros, algo mágico sucedió. Los pensamientos felices se convirtieron en pequeñas chispas de luz de colores que salían de sus corazones. Iris tomó esas chispas y las lanzó al cielo, creando el arcoíris más hermoso jamás visto.

El arcoíris tocó cada rincón del reino. Las flores recuperaron sus colores brillantes, el cielo volvió a ser azul, y las mejillas de la gente se pusieron rosadas de felicidad. Todos aprendieron que la verdadera magia viene de dentro de nuestros corazones.`,
        questions: [
          // LITERALES
          {
            id: 1,
            type: 'literal',
            question: '¿Cómo se llamaba el hada de la historia?',
            options: ['Aurora', 'Luna', 'Iris', 'Celeste'],
            correct: 2,
            explanation: 'El texto dice: "vivía un hada especial llamada Iris"'
          },
          {
            id: 2,
            type: 'literal',
            question: '¿Qué poder tenía Iris?',
            options: [
              'Volar muy rápido',
              'Crear arcoíris con sus manos',
              'Hablar con animales',
              'Hacerse invisible'
            ],
            correct: 1,
            explanation: 'El cuento menciona: "Su poder era único: podía crear arcoíris con sus manos"'
          },
          {
            id: 3,
            type: 'literal',
            question: '¿A quiénes reunió Iris en la plaza central?',
            options: ['A los adultos', 'A los animales', 'A todos los niños', 'A otros hadas'],
            correct: 2,
            explanation: 'El texto indica: "Reunió a todos los niños del reino en la plaza central"'
          },
          // INFERENCIALES
          {
            id: 4,
            type: 'inferencial',
            question: '¿Por qué estaba triste Iris al principio?',
            options: [
              'No tenía amigos',
              'El reino había perdido sus colores',
              'Estaba enferma',
              'No sabía usar su magia'
            ],
            correct: 1,
            explanation: 'Se puede inferir que su tristeza se relaciona con que "el reino había perdido todos sus colores"'
          },
          {
            id: 5,
            type: 'inferencial',
            question: '¿Qué necesitaba Iris para devolver los colores?',
            options: [
              'Más poder mágico',
              'Una varita especial',
              'Que la gente sintiera alegría y esperanza',
              'Ayuda de otros hadas'
            ],
            correct: 2,
            explanation: 'Iris dijo: "Necesito que la gente recuerde la alegría y la esperanza"'
          },
          {
            id: 6,
            type: 'inferencial',
            question: '¿De dónde salieron las chispas de colores?',
            options: [
              'De las manos de Iris',
              'Del cielo',
              'De los recuerdos felices de los niños',
              'De las flores'
            ],
            correct: 2,
            explanation: 'El texto dice que los pensamientos felices se convirtieron en chispas de luz'
          },
          // CRÍTICAS
          {
            id: 7,
            type: 'critica',
            question: '¿Cuál es el mensaje principal de esta historia?',
            options: [
              'Solo las hadas pueden hacer magia',
              'Los colores no son importantes',
              'La verdadera magia viene de nuestros corazones y emociones positivas',
              'Los niños son más poderosos que los adultos'
            ],
            correct: 2,
            explanation: 'El cuento termina con: "la verdadera magia viene de dentro de nuestros corazones"'
          },
          {
            id: 8,
            type: 'critica',
            question: '¿Por qué crees que Iris eligió trabajar con los niños?',
            options: [
              'Porque los adultos no querían ayudar',
              'Porque los niños son más pequeños',
              'Porque los niños tienen recuerdos felices más puros y vivos',
              'Porque solo los niños podían verla'
            ],
            correct: 2,
            explanation: 'Los niños suelen tener emociones más genuinas y recuerdos felices más presentes'
          },
          {
            id: 9,
            type: 'critica',
            question: '¿Qué nos enseña este cuento sobre trabajar en equipo?',
            options: [
              'Es mejor trabajar solo',
              'Juntos podemos lograr cosas que no podríamos hacer solos',
              'Solo los líderes son importantes',
              'El trabajo en equipo no funciona'
            ],
            correct: 1,
            explanation: 'Iris no pudo hacerlo sola y necesitó la ayuda de todos para lograrlo'
          }
        ]
      },
      {
        id: 'estrella-perdida',
        title: 'La Estrella Perdida',
        imageQuery: 'fallen star night sky magical',
        imageUrl: 'https://images.unsplash.com/photo-1612864800594-22b1b1c44de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWxsZW4lMjBzdGFyJTIwbmlnaHQlMjBza3klMjBtYWdpY2FsfGVufDF8fHx8MTc3MjA4MTUxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `Lucía era una pequeña estrella que vivía en el cielo junto a miles de otras estrellas. Cada noche, todas brillaban juntas iluminando la oscuridad. Pero Lucía siempre quería brillar más fuerte que las demás.

Una noche, Lucía brilló con tanta fuerza que se salió de su lugar en el cielo y cayó a la tierra. Aterrizó en un bosque oscuro y solitario. Por primera vez, Lucía sintió miedo. Sin las otras estrellas a su lado, su luz era muy débil.

Un pequeño conejo llamado Tomás la encontró. "¿Por qué lloras, estrellita?", preguntó. "Quise brillar sola y ahora estoy perdida", respondió Lucía entre sollozos. Tomás le contó que él también se había alejado de su familia y se había perdido.

Juntos, decidieron ayudarse mutuamente. Lucía iluminaba el camino con su poca luz, y Tomás usaba su buen olfato para encontrar la dirección correcta. Trabajando juntos, Tomás encontró a su familia, y ellos ayudaron a Lucía a regresar al cielo.

Cuando Lucía volvió con las otras estrellas, comprendió algo importante: brilla más fuerte quien brilla junto a otros. Desde entonces, todas las estrellas brillan juntas, creando la luz más hermosa del universo.`,
        questions: [
          // LITERALES
          {
            id: 1,
            type: 'literal',
            question: '¿Cómo se llamaba la estrella protagonista?',
            options: ['Luna', 'Lucía', 'Aurora', 'Celeste'],
            correct: 1,
            explanation: 'El texto comienza diciendo: "Lucía era una pequeña estrella"'
          },
          {
            id: 2,
            type: 'literal',
            question: '¿Dónde cayó Lucía cuando se salió del cielo?',
            options: ['En el mar', 'En una montaña', 'En un bosque oscuro', 'En una ciudad'],
            correct: 2,
            explanation: 'El cuento dice: "Aterrizó en un bosque oscuro y solitario"'
          },
          {
            id: 3,
            type: 'literal',
            question: '¿Qué animal ayudó a Lucía?',
            options: ['Un pájaro', 'Un conejo', 'Un zorro', 'Un ciervo'],
            correct: 1,
            explanation: 'El texto menciona: "Un pequeño conejo llamado Tomás la encontró"'
          },
          // INFERENCIALES
          {
            id: 4,
            type: 'inferencial',
            question: '¿Por qué Lucía se cayó del cielo?',
            options: [
              'Por un viento fuerte',
              'Porque estaba cansada',
              'Por querer brillar demasiado fuerte ella sola',
              'Por un accidente'
            ],
            correct: 2,
            explanation: 'El texto dice: "Lucía brilló con tanta fuerza que se salió de su lugar"'
          },
          {
            id: 5,
            type: 'inferencial',
            question: '¿Qué tenían en común Lucía y Tomás?',
            options: [
              'Ambos eran animales',
              'Ambos estaban perdidos lejos de su familia',
              'Ambos vivían en el bosque',
              'Ambos eran muy brillantes'
            ],
            correct: 1,
            explanation: 'Tomás le contó que "él también se había alejado de su familia y se había perdido"'
          },
          {
            id: 6,
            type: 'inferencial',
            question: '¿Cómo se ayudaron Lucía y Tomás mutuamente?',
            options: [
              'Lucía dio luz y Tomás usó su olfato para encontrar el camino',
              'Solo Tomás ayudó a Lucía',
              'Solo Lucía ayudó a Tomás',
              'Ninguno ayudó al otro'
            ],
            correct: 0,
            explanation: 'El texto explica que cada uno usó sus habilidades para ayudar al otro'
          },
          // CRÍTICAS
          {
            id: 7,
            type: 'critica',
            question: '¿Qué lección importante aprendió Lucía?',
            options: [
              'Que es mejor estar solo',
              'Que brilla más fuerte quien brilla junto a otros',
              'Que nunca hay que intentar brillar',
              'Que las estrellas no son importantes'
            ],
            correct: 1,
            explanation: 'El cuento concluye con: "brilla más fuerte quien brilla junto a otros"'
          },
          {
            id: 8,
            type: 'critica',
            question: '¿Qué opinas sobre el deseo de Lucía de destacar sobre las demás?',
            options: [
              'Está bien querer destacar sin importar las consecuencias',
              'Es natural querer destacar, pero no a costa de alejarse de quienes nos importan',
              'Nunca debemos querer destacar',
              'Solo está bien si eres una estrella'
            ],
            correct: 1,
            explanation: 'La historia muestra que el individualismo extremo puede tener consecuencias negativas'
          },
          {
            id: 9,
            type: 'critica',
            question: '¿Por qué es importante la moraleja de este cuento?',
            options: [
              'Porque enseña que la cooperación es más valiosa que la competencia egoísta',
              'Porque solo habla de estrellas',
              'Porque los animales son importantes',
              'Porque el bosque es peligroso'
            ],
            correct: 0,
            explanation: 'El cuento enseña valores de colaboración, humildad y trabajo en equipo'
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
        imageQuery: 'dolphin ocean underwater',
        imageUrl: 'https://images.unsplash.com/photo-1655064879666-878b2bd59afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2xwaGluJTIwb2NlYW4lMjB1bmRlcndhdGVyfGVufDF8fHx8MTc3MjAyNTk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `En el océano Pacífico vivía un delfín joven llamado Nico. A diferencia de otros delfines que nadaban en grupos grandes, Nico prefería explorar solo. Sus padres siempre le advertían: "El océano es muy grande, quédate cerca de la familia".

Un día, Nico escuchó un sonido extraño que venía de las profundidades. Era un canto triste y solitario. Curioso como siempre, decidió investigar, aunque eso significaba alejarse de su familia. Nadó y nadó hasta que encontró a una ballena bebé atrapada en una red de pesca.

La ballena estaba asustada y cansada de intentar liberarse. "No te preocupes", dijo Nico con voz firme, "te ayudaré". Intentó morder la red, pero era muy resistente. Entonces recordó algo importante: su familia siempre decía que juntos eran más fuertes.

Nico nadó rápidamente de regreso y contó a su familia lo que había visto. Sin dudarlo, veinte delfines lo siguieron hasta donde estaba la ballena. Trabajando en equipo, cortaron la red con sus dientes afilados y liberaron a la ballena bebé.

La madre ballena apareció y agradeció a Nico y su familia. "Eres muy valiente", le dijo, "pero también fuiste sabio al pedir ayuda". Nico comprendió que ser valiente no significa enfrentar todo solo, sino saber cuándo pedir ayuda.`,
        questions: [
          // LITERALES
          {
            id: 1,
            type: 'literal',
            question: '¿Cómo se llamaba el delfín protagonista?',
            options: ['Nico', 'Nemo', 'Dory', 'Flipper'],
            correct: 0,
            explanation: 'El texto dice: "vivía un delfín joven llamado Nico"'
          },
          {
            id: 2,
            type: 'literal',
            question: '¿Qué animal encontró Nico atrapado?',
            options: ['Un pez', 'Una tortuga', 'Una ballena bebé', 'Otro delfín'],
            correct: 2,
            explanation: 'El cuento menciona: "encontró a una ballena bebé atrapada"'
          },
          {
            id: 3,
            type: 'literal',
            question: '¿Cuántos delfines ayudaron a liberar a la ballena?',
            options: ['Diez', 'Veinte', 'Treinta', 'Cinco'],
            correct: 1,
            explanation: 'El texto dice: "veinte delfines lo siguieron"'
          },
          // INFERENCIALES
          {
            id: 4,
            type: 'inferencial',
            question: '¿Por qué Nico decidió ir solo a investigar el sonido?',
            options: [
              'No le gustaba su familia',
              'Era curioso y le gustaba explorar solo',
              'Estaba perdido',
              'Sus padres se lo pidieron'
            ],
            correct: 1,
            explanation: 'El texto indica que "Nico prefería explorar solo" y era "curioso"'
          },
          {
            id: 5,
            type: 'inferencial',
            question: '¿Por qué Nico no pudo liberar a la ballena solo?',
            options: [
              'No quiso intentarlo',
              'La red era muy resistente',
              'Tenía miedo',
              'La ballena no quería'
            ],
            correct: 1,
            explanation: 'El cuento dice: "Intentó morder la red, pero era muy resistente"'
          },
          {
            id: 6,
            type: 'inferencial',
            question: '¿Qué hizo que Nico decidiera pedir ayuda a su familia?',
            options: [
              'Tuvo miedo',
              'Recordó que juntos son más fuertes',
              'Se cansó',
              'La ballena se lo pidió'
            ],
            correct: 1,
            explanation: 'Nico "recordó algo importante: su familia siempre decía que juntos eran más fuertes"'
          },
          // CRÍTICAS
          {
            id: 7,
            type: 'critica',
            question: '¿Cuál es la enseñanza principal de esta historia?',
            options: [
              'Nunca debemos ayudar a otros',
              'Es mejor estar siempre solo',
              'Ser valiente incluye saber cuándo pedir ayuda',
              'Los delfines son mejores que las ballenas'
            ],
            correct: 2,
            explanation: 'El cuento concluye: "ser valiente no significa enfrentar todo solo, sino saber cuándo pedir ayuda"'
          },
          {
            id: 8,
            type: 'critica',
            question: '¿Qué opinas sobre la decisión de Nico de alejarse de su familia?',
            options: [
              'Fue irresponsable, pero tuvo un buen resultado porque decidió pedir ayuda',
              'Fue perfecta desde el principio',
              'Nunca debió investigar',
              'Sus padres debieron ir con él'
            ],
            correct: 0,
            explanation: 'Aunque fue arriesgado, Nico mostró madurez al reconocer que necesitaba ayuda'
          },
          {
            id: 9,
            type: 'critica',
            question: '¿Cómo evaluarías la respuesta de la familia de Nico?',
            options: [
              'No debieron ayudarlo por desobediente',
              'Actuaron con amor y unidad al ayudar sin juzgar',
              'Solo debieron rescatarlo a él',
              'Debieron castigarlo primero'
            ],
            correct: 1,
            explanation: '"Sin dudarlo, veinte delfines lo siguieron" muestra apoyo incondicional familiar'
          }
        ]
      },
      {
        id: 'mariposa-diferente',
        title: 'La Mariposa Diferente',
        imageQuery: 'colorful butterfly garden flowers',
        imageUrl: 'https://images.unsplash.com/photo-1576121997483-6b0670d17aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGJ1dHRlcmZseSUyMGdhcmRlbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzcyMDgxNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `En un hermoso jardín lleno de flores, todas las mariposas eran de colores brillantes: rojas, azules, amarillas. Todas, excepto Mía. Mía era una mariposa de color blanco puro, sin ningún otro color en sus alas.

Las otras mariposas se burlaban de ella. "Eres muy aburrida", decían. "Pareces una simple polilla blanca". Mía se sentía muy triste y se escondía entre las flores blancas para que nadie la viera.

Un día llegó al jardín un pintor famoso buscando inspiración. Observó todas las mariposas coloridas, pero ninguna le llamaba la atención. Entonces vio a Mía descansando sobre una rosa blanca. "¡Qué belleza tan pura y elegante!", exclamó emocionado.

El pintor pasó horas pintando a Mía. Su cuadro se hizo tan famoso que personas de todo el mundo venían al jardín a ver a la "mariposa especial". Las otras mariposas no entendían por qué Mía era tan admirada.

Mía les explicó con amabilidad: "Ser diferente no es malo. Cada uno de nosotros tiene algo especial que ofrecer. Ustedes tienen colores vibrantes que alegran el jardín, yo tengo una elegancia simple. Todos somos importantes y hermosos a nuestra manera".`,
        questions: [
          // LITERALES
          {
            id: 1,
            type: 'literal',
            question: '¿De qué color era Mía?',
            options: ['Azul', 'Blanco', 'Rosa', 'Amarillo'],
            correct: 1,
            explanation: 'El texto dice: "Mía era una mariposa de color blanco puro"'
          },
          {
            id: 2,
            type: 'literal',
            question: '¿Quién llegó al jardín buscando inspiración?',
            options: ['Un fotógrafo', 'Un escritor', 'Un pintor', 'Un científico'],
            correct: 2,
            explanation: 'El cuento menciona: "llegó al jardín un pintor famoso"'
          },
          {
            id: 3,
            type: 'literal',
            question: '¿Dónde se escondía Mía?',
            options: [
              'Entre las flores rojas',
              'Entre las flores blancas',
              'Debajo de las hojas',
              'En el agua'
            ],
            correct: 1,
            explanation: 'El texto indica: "se escondía entre las flores blancas"'
          },
          // INFERENCIALES
          {
            id: 4,
            type: 'inferencial',
            question: '¿Por qué Mía se sentía triste al principio?',
            options: [
              'Porque no podía volar',
              'Porque las otras mariposas se burlaban de ella por ser diferente',
              'Porque estaba enferma',
              'Porque no tenía flores'
            ],
            correct: 1,
            explanation: 'Las otras mariposas "se burlaban de ella" y la llamaban aburrida'
          },
          {
            id: 5,
            type: 'inferencial',
            question: '¿Por qué el pintor eligió a Mía y no a las otras mariposas?',
            options: [
              'Porque era la única blanca',
              'Porque vio belleza en su simplicidad y elegancia',
              'Porque era más grande',
              'Porque las otras no estaban'
            ],
            correct: 1,
            explanation: 'El pintor exclamó: "¡Qué belleza tan pura y elegante!"'
          },
          {
            id: 6,
            type: 'inferencial',
            question: '¿Cómo cambió la situación de Mía después de que el pintor la pintara?',
            options: [
              'Empeoró',
              'Siguió igual',
              'Se hizo famosa y admirada',
              'Se fue del jardín'
            ],
            correct: 2,
            explanation: 'El cuadro "se hizo tan famoso que personas de todo el mundo venían" a verla'
          },
          // CRÍTICAS
          {
            id: 7,
            type: 'critica',
            question: '¿Cuál es el mensaje principal de este cuento?',
            options: [
              'Solo los colores brillantes son bonitos',
              'Ser diferente es malo',
              'Cada uno tiene algo especial que ofrecer, todos somos valiosos',
              'Solo importa lo que otros piensan de ti'
            ],
            correct: 2,
            explanation: 'Mía concluye: "Cada uno de nosotros tiene algo especial que ofrecer"'
          },
          {
            id: 8,
            type: 'critica',
            question: '¿Cómo evaluarías la actitud de Mía al final del cuento?',
            options: [
              'Se volvió orgullosa y arrogante',
              'Mostró humildad y generosidad al reconocer también la belleza de las demás',
              'Se vengó de las otras mariposas',
              'Se fue a otro jardín'
            ],
            correct: 1,
            explanation: 'Mía "explicó con amabilidad" y reconoció que todas son hermosas a su manera'
          },
          {
            id: 9,
            type: 'critica',
            question: '¿Qué nos enseña sobre el bullying o las burlas?',
            options: [
              'Que está bien burlarse de quien es diferente',
              'Que no debemos juzgar por las apariencias porque todos tenemos valor',
              'Que hay que esconderse cuando te molestan',
              'Que solo los adultos pueden resolver estos problemas'
            ],
            correct: 1,
            explanation: 'La historia muestra cómo las burlas duelen y que la verdadera belleza viene de ser uno mismo'
          }
        ]
      },
      {
        id: 'oso-hormiga',
        title: 'El Oso y la Hormiga',
        imageQuery: 'bear forest ant friendship',
        imageUrl: 'https://images.unsplash.com/photo-1687749927928-96276b1d0cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFyJTIwZm9yZXN0JTIwYW50JTIwZnJpZW5kc2hpcHxlbnwxfHx8fDE3NzIwODE1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `Bruno era un oso enorme y fuerte que vivía en el bosque. Todos los animales lo respetaban por su tamaño y fuerza. Bruno estaba orgulloso de ser tan grande y poderoso.

Un día de verano, Bruno se quedó dormido junto a un árbol. Una pequeña hormiga llamada Ana subió por su pata mientras dormía. Cuando Bruno despertó, sintió una cosquilla. "¿Quién osa molestarme?", rugió con voz fuerte. "Soy Ana", respondió la hormiguita sin miedo.

Bruno se rió a carcajadas. "¿Una hormiga tan pequeña tiene nombre? ¡Eres tan diminuta que apenas puedo verte!". Ana respondió tranquila: "Es cierto que soy pequeña, pero también puedo ser útil. Algún día podría ayudarte".

Bruno se rió aún más fuerte. "¿Tú ayudarme a mí? ¡Imposible!". Y se fue caminando, pisando fuerte para demostrar su poder. Pasaron las semanas y Bruno quedó atrapado en una red de cazadores. Luchó con todas sus fuerzas pero no pudo liberarse.

Ana, que pasaba por allí con su colonia, vio a Bruno atrapado. "¡Rápido, ayudemos al oso!", ordenó. Miles de hormiguitas trabajaron juntas mordiendo los hilos de la red. Después de horas de trabajo en equipo, Bruno quedó libre. "Gracias, pequeña Ana", dijo Bruno con humildad. "Aprendí que el tamaño no determina el valor de alguien".`,
        questions: [
          // LITERALES
          {
            id: 1,
            type: 'literal',
            question: '¿Cómo se llamaba el oso?',
            options: ['Bruno', 'Pedro', 'Alberto', 'Carlos'],
            correct: 0,
            explanation: 'El texto dice: "Bruno era un oso enorme"'
          },
          {
            id: 2,
            type: 'literal',
            question: '¿Cómo se llamaba la hormiga?',
            options: ['María', 'Ana', 'Lucía', 'Rosa'],
            correct: 1,
            explanation: 'La hormiga dice: "Soy Ana"'
          },
          {
            id: 3,
            type: 'literal',
            question: '¿En qué quedó atrapado Bruno?',
            options: ['En un hoyo', 'En una red de cazadores', 'En una jaula', 'En el barro'],
            correct: 1,
            explanation: 'El cuento menciona: "Bruno quedó atrapado en una red de cazadores"'
          },
          // INFERENCIALES
          {
            id: 4,
            type: 'inferencial',
            question: '¿Por qué Bruno se reía de Ana?',
            options: [
              'Porque Ana contó un chiste',
              'Porque pensaba que era demasiado pequeña para ser útil',
              'Porque Ana bailaba gracioso',
              'Porque estaba feliz'
            ],
            correct: 1,
            explanation: 'Bruno se rió cuando Ana dijo que podría ayudarlo porque la consideraba demasiado pequeña'
          },
          {
            id: 5,
            type: 'inferencial',
            question: '¿Cómo logró Ana liberar a Bruno?',
            options: [
              'Usando su fuerza individual',
              'Trabajando en equipo con su colonia',
              'Pidiendo ayuda a otros osos',
              'Usando magia'
            ],
            correct: 1,
            explanation: '"Miles de hormiguitas trabajaron juntas mordiendo los hilos de la red"'
          },
          {
            id: 6,
            type: 'inferencial',
            question: '¿Qué cambió en Bruno al final de la historia?',
            options: [
              'Se hizo más fuerte',
              'Aprendió a ser humilde y valorar a todos sin importar su tamaño',
              'Se hizo amigo de los cazadores',
              'Se fue del bosque'
            ],
            correct: 1,
            explanation: 'Bruno dijo "con humildad" y aprendió que el tamaño no determina el valor'
          },
          // CRÍTICAS
          {
            id: 7,
            type: 'critica',
            question: '¿Cuál es la moraleja de este cuento?',
            options: [
              'Solo los animales grandes son importantes',
              'Nunca debemos dormir en el bosque',
              'No debemos juzgar el valor de alguien por su apariencia o tamaño',
              'Las hormigas son mejores que los osos'
            ],
            correct: 2,
            explanation: 'Bruno aprende: "el tamaño no determina el valor de alguien"'
          },
          {
            id: 8,
            type: 'critica',
            question: '¿Por qué crees que Ana decidió ayudar a Bruno a pesar de que él se burló de ella?',
            options: [
              'Porque tenía miedo',
              'Porque tenía un buen corazón y no guardaba rencor',
              'Porque le debía un favor',
              'Porque Bruno le pidió perdón primero'
            ],
            correct: 1,
            explanation: 'Ana mostró nobleza al ayudar sin esperar disculpas, demostrando verdadera grandeza de corazón'
          },
          {
            id: 9,
            type: 'critica',
            question: '¿Qué nos enseña sobre el trabajo en equipo?',
            options: [
              'Que es mejor trabajar solo',
              'Que unidos podemos lograr cosas que parecen imposibles individualmente',
              'Que solo funciona con animales pequeños',
              'Que el trabajo en equipo es lento'
            ],
            correct: 1,
            explanation: 'Miles de hormiguitas pequeñas lograron liberar a un oso grande trabajando juntas'
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
        imageQuery: 'moon astronaut space stars',
        imageUrl: 'https://images.unsplash.com/photo-1664983661035-f3c38a1ea93f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29uJTIwYXN0cm9uYXV0JTIwc3BhY2UlMjBzdGFyc3xlbnwxfHx8fDE3NzIwODE1MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `Sofía era una niña de ocho años que soñaba con ser astronauta. Cada noche miraba las estrellas desde su ventana y imaginaba que viajaba por el espacio. Sus compañeros de clase a veces se reían de sus sueños, diciéndole que era imposible.

Una noche, mientras observaba la luna llena, Sofía vio algo increíble: una estrella fugaz pasó tan cerca que iluminó toda su habitación. Cerró los ojos y pidió un deseo: "Quisiera conocer la luna, aunque sea solo un ratito".

Cuando abrió los ojos, estaba flotando en el espacio, vestida con un traje de astronauta brillante. Frente a ella estaba la luna, enorme y plateada. "¿Cómo llegué aquí?", se preguntó asombrada. Una voz suave respondió: "Los sueños de corazón puro pueden hacerse realidad".

Sofía exploró la luna. Saltó alto gracias a la gravedad baja, tocó el polvo lunar y vio la Tierra brillando como una canica azul en la distancia. Pero lo más importante fue lo que aprendió: el universo era aún más maravilloso de lo que había imaginado, y valía la pena estudiar mucho para conocerlo mejor.

Al amanecer, Sofía despertó en su cama. No sabía si había sido un sueño o magia real, pero ya no le importaba. Ahora sabía con certeza que estudiaría ciencias con dedicación porque algún día, de verdad, sería astronauta.`,
        questions: [
          // LITERALES
          {
            id: 1,
            type: 'literal',
            question: '¿Cómo se llamaba la niña protagonista?',
            options: ['María', 'Ana', 'Sofía', 'Luna'],
            correct: 2,
            explanation: 'El texto comienza: "Sofía era una niña de ocho años"'
          },
          {
            id: 2,
            type: 'literal',
            question: '¿Cuántos años tenía Sofía?',
            options: ['Seis', 'Siete', 'Ocho', 'Nueve'],
            correct: 2,
            explanation: 'El cuento dice: "Sofía era una niña de ocho años"'
          },
          {
            id: 3,
            type: 'literal',
            question: '¿Qué vio Sofía pasar cerca de su ventana?',
            options: ['Un cometa', 'Una estrella fugaz', 'Un avión', 'Un satélite'],
            correct: 1,
            explanation: 'El texto menciona: "una estrella fugaz pasó tan cerca"'
          },
          // INFERENCIALES
          {
            id: 4,
            type: 'inferencial',
            question: '¿Por qué los compañeros de Sofía se reían de ella?',
            options: [
              'Porque pensaban que su sueño de ser astronauta era imposible',
              'Porque era divertida',
              'Porque no estudiaba',
              'Porque tenía un telescopio'
            ],
            correct: 0,
            explanation: 'Sus compañeros "se reían de sus sueños, diciéndole que era imposible"'
          },
          {
            id: 5,
            type: 'inferencial',
            question: '¿Qué significó el viaje a la luna para Sofía?',
            options: [
              'Fue solo entretenimiento',
              'La inspiró a estudiar más para cumplir su sueño',
              'Le dio miedo el espacio',
              'Le hizo cambiar de profesión'
            ],
            correct: 1,
            explanation: 'Al final "sabía con certeza que estudiaría ciencias con dedicación"'
          },
          {
            id: 6,
            type: 'inferencial',
            question: '¿Qué aprendió Sofía de más importante en su experiencia?',
            options: [
              'Que la luna es grande',
              'Que el universo es maravilloso y vale la pena estudiarlo',
              'Que puede flotar',
              'Que la Tierra es azul'
            ],
            correct: 1,
            explanation: '"Lo más importante fue lo que aprendió: el universo era aún más maravilloso"'
          },
          // CRÍTICAS
          {
            id: 7,
            type: 'critica',
            question: '¿Cuál es el mensaje central de esta historia?',
            options: [
              'La magia existe y nos da todo',
              'No debemos soñar cosas difíciles',
              'Los sueños grandes requieren esfuerzo y dedicación para hacerse realidad',
              'Solo en sueños podemos viajar al espacio'
            ],
            correct: 2,
            explanation: 'Sofía entiende que debe "estudiar ciencias con dedicación" para cumplir su sueño'
          },
          {
            id: 8,
            type: 'critica',
            question: '¿Qué opinas sobre la reacción de Sofía ante las burlas?',
            options: [
              'Debió abandonar su sueño',
              'Mostró valentía al mantener su sueño a pesar de las burlas',
              'Debió burlarse de sus compañeros también',
              'No le afectó nada'
            ],
            correct: 1,
            explanation: 'Sofía mantuvo su sueño y al final se comprometió aún más con él'
          },
          {
            id: 9,
            type: 'critica',
            question: '¿Por qué crees que el cuento no aclara si fue un sueño o realidad?',
            options: [
              'Porque el autor olvidó escribirlo',
              'Porque lo importante no es cómo se inspiró, sino que decidió trabajar por su sueño',
              'Porque fue un error',
              'Para confundir al lector'
            ],
            correct: 1,
            explanation: 'El texto dice "ya no le importaba" porque lo valioso fue la inspiración y determinación que ganó'
          }
        ]
      },
      {
        id: 'planeta-colores',
        title: 'El Planeta de los Colores',
        imageQuery: 'colorful alien planet space',
        imageUrl: 'https://images.unsplash.com/photo-1769255119722-4537443e3ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFsaWVuJTIwcGxhbmV0JTIwc3BhY2V8ZW58MXx8fHwxNzcyMDgxNTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `Los astronautas Marta y Carlos viajaban en su nave espacial explorando la galaxia. Llevaban meses sin encontrar nada interesante, solo planetas vacíos de roca y gas. Estaban a punto de volver a la Tierra cuando detectaron algo extraño.

"¡Mira el radar!", gritó Carlos emocionado. "Hay un planeta que cambia de color cada segundo". Era cierto: el planeta pasaba del rojo al azul, del verde al amarillo, como si estuviera vivo. Decidieron aterrizar para investigar.

Al tocar el suelo del planeta, todo a su alrededor brillaba con colores increíbles. No había plantas ni animales, pero el planeta mismo parecía comunicarse con ellos a través de los colores. Cuando sentían alegría, todo se volvía dorado. Cuando tenían miedo, todo se tornaba gris.

Marta comprendió el mensaje: "Este planeta refleja nuestras emociones. Es como un espejo de nuestros sentimientos". Pasaron horas experimentando, riendo juntos haciendo que todo brillara con arcoíris, pensando en sus seres queridos para crear paisajes rosados.

Al regresar a la Tierra, Marta y Carlos compartieron su descubrimiento: encontraron un planeta que les enseñó que las emociones son poderosas y hermosas. También aprendieron que explorar el espacio exterior puede ayudarnos a entender mejor nuestro mundo interior.`,
        questions: [
          // LITERALES
          {
            id: 1,
            type: 'literal',
            question: '¿Cómo se llamaban los dos astronautas?',
            options: [
              'Pedro y Ana',
              'Marta y Carlos',
              'Luis y María',
              'Sofía y Bruno'
            ],
            correct: 1,
            explanation: 'El texto dice: "Los astronautas Marta y Carlos"'
          },
          {
            id: 2,
            type: 'literal',
            question: '¿Qué hacía especial al planeta que encontraron?',
            options: [
              'Tenía agua',
              'Cambiaba de color cada segundo',
              'Tenía animales extraños',
              'Era muy grande'
            ],
            correct: 1,
            explanation: 'Carlos dijo: "Hay un planeta que cambia de color cada segundo"'
          },
          {
            id: 3,
            type: 'literal',
            question: '¿De qué color se ponía el planeta cuando sentían alegría?',
            options: ['Gris', 'Dorado', 'Azul', 'Verde'],
            correct: 1,
            explanation: 'El cuento dice: "Cuando sentían alegría, todo se volvía dorado"'
          },
          // INFERENCIALES
          {
            id: 4,
            type: 'inferencial',
            question: '¿Por qué el planeta cambiaba de color?',
            options: [
              'Por el clima',
              'Porque reflejaba las emociones de los astronautas',
              'Por la rotación',
              'Por error'
            ],
            correct: 1,
            explanation: 'Marta comprendió: "Este planeta refleja nuestras emociones"'
          },
          {
            id: 5,
            type: 'inferencial',
            question: '¿Qué sentían los astronautas al principio del viaje?',
            options: [
              'Emoción por todos sus descubrimientos',
              'Desánimo por no encontrar nada interesante',
              'Miedo del espacio',
              'Hambre'
            ],
            correct: 1,
            explanation: '"Llevaban meses sin encontrar nada interesante" y "estaban a punto de volver"'
          },
          {
            id: 6,
            type: 'inferencial',
            question: '¿Qué hicieron Marta y Carlos para crear paisajes rosados?',
            options: [
              'Usaron pintura',
              'Pensaron en sus seres queridos',
              'Gritaron muy fuerte',
              'Saltaron mucho'
            ],
            correct: 1,
            explanation: 'El texto menciona: "pensando en sus seres queridos para crear paisajes rosados"'
          },
          // CRÍTICAS
          {
            id: 7,
            type: 'critica',
            question: '¿Cuál es la lección principal de esta historia?',
            options: [
              'Que todos los planetas cambian de color',
              'Que las emociones son poderosas y hermosas',
              'Que es aburrido explorar el espacio',
              'Que debemos quedarnos en la Tierra'
            ],
            correct: 1,
            explanation: 'Aprendieron: "las emociones son poderosas y hermosas"'
          },
          {
            id: 8,
            type: 'critica',
            question: '¿Qué significa que "explorar el espacio exterior puede ayudarnos a entender nuestro mundo interior"?',
            options: [
              'Que solo el espacio es importante',
              'Que las aventuras y experiencias nuevas nos ayudan a conocernos mejor',
              'Que debemos olvidar nuestras emociones',
              'Que el espacio está dentro de nosotros'
            ],
            correct: 1,
            explanation: 'La experiencia del planeta les ayudó a entender mejor sus propias emociones'
          },
          {
            id: 9,
            type: 'critica',
            question: '¿Por qué fue importante que no se rindieran y regresaran a casa antes de encontrar el planeta?',
            options: [
              'Porque así gastaron más combustible',
              'Porque la perseverancia a veces lleva a descubrimientos maravillosos',
              'Para perder más tiempo',
              'No fue importante'
            ],
            correct: 1,
            explanation: 'Justo cuando iban a rendirse ("a punto de volver") hicieron su mayor descubrimiento'
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
        imageQuery: 'firefighter woman rescue hero',
        imageUrl: 'https://images.unsplash.com/photo-1713689824345-c86fd9e2e06b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlZmlnaHRlciUyMHdvbWFuJTIwcmVzY3VlJTIwaGVyb3xlbnwxfHx8fDE3NzIwODE1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `Valentina siempre supo que quería ser bombera. Desde pequeña admiraba el valor de quienes arriesgaban su vida por ayudar a otros. Sin embargo, en su pequeño pueblo, nunca había habido una mujer bombera. Muchos decían que era un trabajo "solo para hombres".

Valentina no se dejó desanimar. Entrenó duramente durante años: corrió kilómetros cada día, levantó pesas, estudió técnicas de rescate. Finalmente, a los 22 años, se convirtió en la primera bombera de su pueblo. Algunos todavía dudaban de sus capacidades.

Un día de verano, un incendio enorme comenzó en el edificio más alto del pueblo. Una familia estaba atrapada en el quinto piso. El humo era muy denso y las escaleras estaban bloqueadas por el fuego. El capitán de bomberos dudaba si enviar a alguien, era muy peligroso.

"Yo iré", dijo Valentina con voz firme. Usando su entrenamiento, subió por la escalera exterior del edificio. El calor era intenso, pero no se rindió. Llegó al quinto piso, rompió la ventana y sacó a la familia una por una. La última en salir fue una niña pequeña que le recordó a ella misma cuando era pequeña y soñaba con ayudar a otros.

El pueblo entero celebró a Valentina como una heroína. Pero ella dijo algo que nadie olvidó: "No soy heroína por ser mujer o por hacer algo especial. Soy heroína porque cuando alguien necesitaba ayuda, no dudé en actuar. Eso puede hacerlo cualquier persona con valor en su corazón".`,
        questions: [
          // LITERALES
          {
            id: 1,
            type: 'literal',
            question: '¿Cómo se llamaba la protagonista?',
            options: ['Victoria', 'Valentina', 'Valeria', 'Vanesa'],
            correct: 1,
            explanation: 'El texto comienza: "Valentina siempre supo"'
          },
          {
            id: 2,
            type: 'literal',
            question: '¿A qué edad se convirtió Valentina en bombera?',
            options: ['20 años', '21 años', '22 años', '23 años'],
            correct: 2,
            explanation: 'El cuento dice: "a los 22 años, se convirtió en la primera bombera"'
          },
          {
            id: 3,
            type: 'literal',
            question: '¿En qué piso estaba atrapada la familia?',
            options: ['Tercer piso', 'Cuarto piso', 'Quinto piso', 'Sexto piso'],
            correct: 2,
            explanation: 'El texto indica: "Una familia estaba atrapada en el quinto piso"'
          },
          // INFERENCIALES
          {
            id: 4,
            type: 'inferencial',
            question: '¿Por qué Valentina tuvo que esforzarse más que otros para ser bombera?',
            options: [
              'Porque era de otro pueblo',
              'Porque enfrentaba prejuicios de género',
              'Porque era muy joven',
              'Porque no tenía dinero'
            ],
            correct: 1,
            explanation: 'Nunca había habido una mujer bombera y "muchos decían que era un trabajo solo para hombres"'
          },
          {
            id: 5,
            type: 'inferencial',
            question: '¿Cómo se preparó Valentina para ser bombera?',
            options: [
              'Solo leyó libros',
              'Entrenó físicamente y estudió técnicas durante años',
              'Le pidió ayuda a otros',
              'No se preparó'
            ],
            correct: 1,
            explanation: 'El texto dice: "Entrenó duramente durante años: corrió kilómetros, levantó pesas, estudió"'
          },
          {
            id: 6,
            type: 'inferencial',
            question: '¿Qué sintió Valentina al rescatar a la niña pequeña?',
            options: [
              'Cansancio solamente',
              'Conexión porque le recordó a ella misma cuando era niña',
              'Miedo',
              'Nada especial'
            ],
            correct: 1,
            explanation: 'La niña "le recordó a ella misma cuando era pequeña y soñaba con ayudar a otros"'
          },
          // CRÍTICAS
          {
            id: 7,
            type: 'critica',
            question: 'Según Valentina, ¿qué hace a alguien un héroe o heroína?',
            options: [
              'Ser hombre o mujer',
              'Tener un trabajo especial',
              'Actuar sin dudar cuando alguien necesita ayuda',
              'Ser famoso'
            ],
            correct: 2,
            explanation: 'Valentina dijo: "Soy heroína porque cuando alguien necesitaba ayuda, no dudé en actuar"'
          },
          {
            id: 8,
            type: 'critica',
            question: '¿Qué mensaje transmite el cuento sobre los roles de género?',
            options: [
              'Que hay trabajos solo para hombres y otros solo para mujeres',
              'Que las personas pueden lograr sus sueños sin importar su género',
              'Que las mujeres son mejores que los hombres',
              'Que los hombres no pueden ser sensibles'
            ],
            correct: 1,
            explanation: 'Valentina demostró con hechos que el género no determina las capacidades'
          },
          {
            id: 9,
            type: 'critica',
            question: '¿Por qué es importante la perseverancia que mostró Valentina?',
            options: [
              'Porque sin ella habría abandonado ante los prejuicios y nunca habría salvado vidas',
              'Para lucirse',
              'Para demostrar que era mejor que otros',
              'No fue importante'
            ],
            correct: 0,
            explanation: 'Su perseverancia le permitió superar obstáculos y cumplir su sueño de ayudar a otros'
          }
        ]
      },
      {
        id: 'medico-aldea',
        title: 'El Médico de la Aldea',
        imageQuery: 'doctor village helping people',
        imageUrl: 'https://images.unsplash.com/photo-1659718282409-203239812162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjB2aWxsYWdlJTIwaGVscGluZyUyMHBlb3BsZXxlbnwxfHx8fDE3NzIwODE1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        text: `El doctor Miguel era el único médico en una aldea remota de las montañas. Para llegar a la aldea más cercana se necesitaban tres horas a caballo. Miguel había decidido vivir allí porque sabía que esas personas necesitaban ayuda médica.

Vivir en la aldea no era fácil. No había hospitales con equipos modernos, ni internet para consultar información, ni otros médicos con quienes compartir casos difíciles. Miguel solo tenía sus conocimientos, sus manos y su determinación de ayudar.

Una noche de tormenta terrible, llegó un mensaje urgente. En una casa alejada, una mujer estaba teniendo complicaciones al dar a luz. El camino era peligroso con la tormenta, los árboles caían y el río estaba crecido. Cualquiera habría esperado a que pasara la tormenta, pero Miguel sabía que no había tiempo.

Se montó en su caballo y cabalgó bajo la lluvia torrencial. El viaje que normalmente tomaba una hora, le tomó tres. Llegó empapado y exhausto, pero inmediatamente se puso a trabajar. Con calma y experiencia, ayudó a que el bebé naciera sano. La madre y el bebé estaban bien.

La aldea entera estaba agradecida. Pero Miguel solo dijo: "Ser médico no es solo memorizar términos médicos. Es recordar cada día que detrás de cada paciente hay una persona, una familia, una historia que vale la pena salvar".`,
        questions: [
          // LITERALES
          {
            id: 1,
            type: 'literal',
            question: '¿Cómo se llamaba el médico?',
            options: ['Manuel', 'Miguel', 'Mario', 'Marcos'],
            correct: 1,
            explanation: 'El texto dice: "El doctor Miguel era el único médico"'
          },
          {
            id: 2,
            type: 'literal',
            question: '¿Cuántas horas se necesitaban para llegar a la aldea más cercana?',
            options: ['Una hora', 'Dos horas', 'Tres horas', 'Cuatro horas'],
            correct: 2,
            explanation: 'El cuento menciona: "se necesitaban tres horas a caballo"'
          },
          {
            id: 3,
            type: 'literal',
            question: '¿Cuánto tiempo le tomó a Miguel llegar durante la tormenta?',
            options: ['Una hora', 'Dos horas', 'Tres horas', 'Cuatro horas'],
            correct: 2,
            explanation: 'El texto dice: "El viaje que normalmente tomaba una hora, le tomó tres"'
          },
          // INFERENCIALES
          {
            id: 4,
            type: 'inferencial',
            question: '¿Por qué Miguel decidió vivir en la aldea remota?',
            options: [
              'Porque le pagaban mucho dinero',
              'Porque sabía que esas personas necesitaban ayuda médica',
              'Porque no conseguía trabajo en la ciudad',
              'Porque le gustaba la montaña'
            ],
            correct: 1,
            explanation: 'El texto explica: "había decidido vivir allí porque sabía que esas personas necesitaban ayuda"'
          },
          {
            id: 5,
            type: 'inferencial',
            question: '¿Qué desafíos enfrentaba Miguel en la aldea?',
            options: [
              'Demasiados pacientes',
              'Falta de equipos modernos, internet y otros médicos',
              'El clima siempre era malo',
              'No le gustaba su trabajo'
            ],
            correct: 1,
            explanation: 'El cuento lista: "No había hospitales con equipos modernos, ni internet, ni otros médicos"'
          },
          {
            id: 6,
            type: 'inferencial',
            question: '¿Por qué Miguel no esperó a que pasara la tormenta?',
            options: [
              'Porque le gustaba la aventura',
              'Porque no había tiempo, era una emergencia',
              'Porque quería demostrar su valor',
              'Porque no sabía que había tormenta'
            ],
            correct: 1,
            explanation: 'El texto dice: "Cualquiera habría esperado, pero Miguel sabía que no había tiempo"'
          },
          // CRÍTICAS
          {
            id: 7,
            type: 'critica',
            question: 'Según Miguel, ¿qué es lo más importante de ser médico?',
            options: [
              'Memorizar términos médicos',
              'Ganar mucho dinero',
              'Recordar que detrás de cada paciente hay una persona que vale la pena salvar',
              'Trabajar en hospitales modernos'
            ],
            correct: 2,
            explanation: 'Miguel dijo: "Es recordar cada día que detrás de cada paciente hay una persona, una familia"'
          },
          {
            id: 8,
            type: 'critica',
            question: '¿Qué cualidades heroicas demuestra Miguel en esta historia?',
            options: [
              'Solo valentía física',
              'Valentía, dedicación, empatía y poner a otros antes que su seguridad',
              'Inteligencia solamente',
              'Fuerza física'
            ],
            correct: 1,
            explanation: 'Miguel muestra múltiples cualidades: valor (viajó en tormenta), dedicación (vivir en aldea remota), empatía'
          },
          {
            id: 9,
            type: 'critica',
            question: '¿Qué podemos aprender sobre el verdadero servicio a los demás?',
            options: [
              'Que solo debemos ayudar cuando es fácil',
              'Que el verdadero servicio a veces requiere sacrificio personal',
              'Que es mejor quedarse en lugares cómodos',
              'Que solo los médicos pueden servir'
            ],
            correct: 1,
            explanation: 'Miguel sacrificó comodidades y arriesgó su seguridad por ayudar a quienes lo necesitaban'
          }
        ]
      }
    ]
  }
];

// Función helper para obtener lecturas por módulo
export function getReadingsByModule(moduleId: string): Reading[] {
  const moduleData = readingsData.find(m => m.moduleId === moduleId);
  return moduleData?.readings || [];
}

// Función helper para obtener una lectura específica
export function getReading(moduleId: string, readingId: string): Reading | undefined {
  const readings = getReadingsByModule(moduleId);
  return readings.find(r => r.id === readingId);
}
