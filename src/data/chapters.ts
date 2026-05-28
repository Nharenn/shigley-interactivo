export interface Chapter {
  id: number
  title: string
  shortTitle: string
  part: 1 | 2 | 3 | 4
  slides: number
  ready: boolean
  icon: string
  description: string
}

export interface Part {
  id: 1 | 2 | 3 | 4
  title: string
  color: string
  cssVar: string
  chapters: Chapter[]
}

export const PARTS: Part[] = [
  {
    id: 1,
    title: 'Fundamentos',
    color: '#3B82F6',
    cssVar: 'var(--part-1)',
    chapters: [
      { id: 1, title: 'Introducción al diseño en ingeniería mecánica', shortTitle: 'Introducción al diseño', part: 1, slides: 8, ready: true, icon: 'compass', description: 'Proceso de diseño, factores de seguridad y normas técnicas' },
      { id: 2, title: 'Materiales', shortTitle: 'Materiales', part: 1, slides: 12, ready: true, icon: 'layers', description: 'Propiedades mecánicas, diagrama esfuerzo-deformación, selección de materiales' },
      { id: 3, title: 'Análisis de carga y esfuerzo', shortTitle: 'Carga y esfuerzo', part: 1, slides: 25, ready: true, icon: 'activity', description: 'DCL, cortante y momento, Círculo de Mohr, concentración de esfuerzos' },
      { id: 4, title: 'Deflexión y rigidez', shortTitle: 'Deflexión', part: 1, slides: 18, ready: true, icon: 'trending-down', description: 'Deflexión en vigas, columnas, pandeo de Euler, método de Castigliano' },
    ],
  },
  {
    id: 2,
    title: 'Prevención de fallas',
    color: '#F59E0B',
    cssVar: 'var(--part-2)',
    chapters: [
      { id: 5, title: 'Fallas resultantes de carga estática', shortTitle: 'Falla estática', part: 2, slides: 15, ready: true, icon: 'alert-triangle', description: 'Teorías de falla MSS, DE, Mohr-Coulomb, mecánica de fractura' },
      { id: 6, title: 'Fallas por fatiga debidas a cargas variables', shortTitle: 'Fatiga', part: 2, slides: 22, ready: true, icon: 'zap', description: 'Curva S-N, factores de Marin, diagrama de Goodman, daño acumulado' },
    ],
  },
  {
    id: 3,
    title: 'Diseño de elementos mecánicos',
    color: '#22C55E',
    cssVar: 'var(--part-3)',
    chapters: [
      { id: 7, title: 'Ejes, flechas y sus componentes', shortTitle: 'Ejes y flechas', part: 3, slides: 14, ready: true, icon: 'rotate-cw', description: 'Diseño de ejes, velocidades críticas, cuñas y anillos' },
      { id: 8, title: 'Tornillos, sujetadores y uniones no permanentes', shortTitle: 'Tornillos', part: 3, slides: 16, ready: true, icon: 'tool', description: 'Uniones atornilladas, diagrama de precarga, fatiga en pernos' },
      { id: 9, title: 'Soldadura, adhesión y uniones permanentes', shortTitle: 'Soldadura', part: 3, slides: 12, ready: true, icon: 'git-merge', description: 'Esfuerzos en soldaduras, grupos de soldaduras, simbología' },
      { id: 10, title: 'Resortes mecánicos', shortTitle: 'Resortes', part: 3, slides: 14, ready: true, icon: 'loader', description: 'Resortes helicoidales, factor de Wahl, fatiga en resortes' },
      { id: 11, title: 'Cojinetes de contacto rodante', shortTitle: 'Cojinetes rodantes', part: 3, slides: 12, ready: true, icon: 'disc', description: 'Vida L10, selección de cojinetes, confiabilidad' },
      { id: 12, title: 'Cojinetes deslizantes y lubricación', shortTitle: 'Cojinetes deslizantes', part: 3, slides: 12, ready: true, icon: 'droplet', description: 'Ecuación de Petroff, gráficas de Raimondi-Boyd, viscosidad' },
      { id: 13, title: 'Engranes: descripción general', shortTitle: 'Engranes general', part: 3, slides: 16, ready: true, icon: 'settings', description: 'Perfil de involuta, relaciones de transmisión, análisis de fuerzas' },
      { id: 14, title: 'Engranes rectos y helicoidales', shortTitle: 'Engranes rectos', part: 3, slides: 14, ready: true, icon: 'settings', description: 'Ecuación de Lewis, calculadora AGMA, diseño completo' },
      { id: 15, title: 'Engranes cónicos y de tornillo sinfín', shortTitle: 'Engranes cónicos', part: 3, slides: 10, ready: true, icon: 'settings', description: 'Análisis AGMA cónicos, eficiencia del sinfín, fuerzas 3D' },
      { id: 16, title: 'Embragues, frenos, coples y volantes', shortTitle: 'Embragues y frenos', part: 3, slides: 12, ready: true, icon: 'octagon', description: 'Presión uniforme vs desgaste, freno de banda, diseño de volantes' },
      { id: 17, title: 'Elementos mecánicos flexibles', shortTitle: 'Elementos flexibles', part: 3, slides: 10, ready: true, icon: 'link', description: 'Transmisión por banda, cadenas de rodillos, cables metálicos' },
      { id: 18, title: 'Caso de estudio: transmisión de potencia', shortTitle: 'Caso de estudio', part: 3, slides: 10, ready: true, icon: 'package', description: 'Diseño integrador: engranes + ejes + cojinetes + cuñas' },
    ],
  },
  {
    id: 4,
    title: 'Herramientas de análisis',
    color: '#A78BFA',
    cssVar: 'var(--part-4)',
    chapters: [
      { id: 19, title: 'Análisis de elementos finitos', shortTitle: 'Elementos finitos', part: 4, slides: 8, ready: true, icon: 'grid', description: 'Discretización, malla, refinamiento y casos simples de FEA' },
      { id: 20, title: 'Consideraciones estadísticas', shortTitle: 'Estadística', part: 4, slides: 8, ready: true, icon: 'bar-chart-2', description: 'Distribución normal, confiabilidad, regresión lineal' },
    ],
  },
]

export const ALL_CHAPTERS = PARTS.flatMap((p) => p.chapters)

export function getChapter(id: number) {
  return ALL_CHAPTERS.find((c) => c.id === id)
}

export function getPartColor(partId: 1 | 2 | 3 | 4) {
  const vars: Record<number, string> = {
    1: 'var(--part-1)',
    2: 'var(--part-2)',
    3: 'var(--part-3)',
    4: 'var(--part-4)',
  }
  return vars[partId] ?? 'var(--accent)'
}
