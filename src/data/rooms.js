// src/data/rooms.js
// Editá aquí los textos, imágenes y beneficios de cada cuarto

export const rooms = [
  {
    id: 'ira',
    title: 'Cuarto de Ira',
    tag: 'Descarga física',
    step: '01',
    image: '/assets/ira.png',
    desc: 'Un espacio diseñado para liberar la rabia y la frustración acumulada de forma segura y controlada. Destruye objetos especialmente preparados mientras recibes acompañamiento.',
    benefits: [
      'Liberación inmediata de tensión muscular',
      'Reducción de cortisol (hormona del estrés)',
      'Descarga emocional sin dañar a otros',
      'Sensación de alivio y claridad mental',
    ],
  },
  {
    id: 'estres',
    title: 'Cuarto de Estrés',
    tag: 'Descompresión lúdica',
    step: '02',
    image: '/assets/estres.png',
    desc: 'Actividades dinámicas y lúdicas diseñadas para desactivar la respuesta de estrés crónico. Ideal para profesionales y estudiantes que necesitan desconectar de forma activa.',
    benefits: [
      'Actividades físicas controladas',
      'Juegos y dinámicas antiestrés',
      'Mejora del estado de ánimo',
      'Técnicas rápidas de regulación emocional',
    ],
  },
  {
    id: 'relax',
    title: 'Cuarto de Relajación',
    tag: 'Inmersión sensorial',
    step: '03',
    image: '/assets/relax.png',
    desc: 'Un ambiente multisensorial con meditación guiada, sonidos de baja frecuencia, iluminación cálida y tecnología háptica para activar la respuesta parasimpática del cuerpo.',
    benefits: [
      'Reducción profunda de la ansiedad',
      'Mejora de la calidad del sueño',
      'Activación del sistema nervioso parasimpático',
      'Sensación de paz y reconexión',
    ],
  },
  {
    id: 'estimulacion',
    title: 'Cuarto de Estimulación',
    tag: 'Activación cognitiva',
    step: '04',
    image: '/assets/estimulacion.png',
    desc: 'Un espacio diseñado para despertar los sentidos y activar el cerebro a través de desafíos sensoriales, luz, sonido y ejercicios cognitivos.',
    benefits: [
      'Estimulación multisensorial con luz, sonido y texturas',
      'Ejercicios cognitivos de atención y memoria',
      'Activación del estado de flow y concentración',
      'Ideal para bloqueos creativos o fatiga mental',
    ],
  },
]