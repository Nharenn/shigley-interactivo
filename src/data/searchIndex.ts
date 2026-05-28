export interface SearchEntry {
  type: 'capitulo' | 'seccion' | 'herramienta' | 'referencia'
  title: string
  subtitle?: string
  href: string
  keywords: string[]
  partColor?: string
  chapterId?: number
}

const CHAPTER_SECTIONS: Record<number, string[]> = {
  1: [
    'El diseño', 'Diseño en ingeniería mecánica', 'Fases del proceso de diseño',
    'Herramientas y recursos de diseño', 'Responsabilidades profesionales',
    'Normas y códigos', 'Aspectos económicos', 'Seguridad y responsabilidad legal',
    'Esfuerzo y resistencia', 'Incertidumbre', 'Factor de diseño y factor de seguridad',
    'Confiabilidad', 'Dimensiones y tolerancias', 'Unidades',
    'Cálculos y cifras significativas', 'Interdependencias entre temas',
    'Caso de estudio: transmisión de potencia',
  ],
  2: [
    'Resistencia y rigidez del material', 'Significancia estadística de propiedades',
    'Resistencia y trabajo en frío', 'Dureza', 'Propiedades de impacto',
    'Efectos de la temperatura', 'Sistemas de numeración', 'Fundición en arena',
    'Moldeo en cascarón', 'Fundición de revestimiento', 'Metalurgia de polvos',
    'Procesos de trabajo en caliente', 'Procesos de trabajo en frío',
    'Tratamiento térmico del acero', 'Aceros aleados',
    'Aceros resistentes a la corrosión', 'Materiales para fundición',
    'Metales no ferrosos', 'Plásticos', 'Materiales compuestos', 'Selección de materiales',
  ],
  3: [
    'Equilibrio y diagramas de cuerpo libre', 'Fuerza cortante y momentos flectores',
    'Funciones de singularidad', 'Esfuerzo', 'Componentes cartesianos del esfuerzo',
    'Círculo de Mohr del esfuerzo plano', 'Esfuerzo tridimensional general',
    'Deformación unitaria elástica', 'Esfuerzos uniformemente distribuidos',
    'Esfuerzos normales en vigas en flexión', 'Esfuerzos cortantes en vigas en flexión',
    'Torsión', 'Concentración del esfuerzo', 'Esfuerzos en cilindros presurizados',
    'Esfuerzos en anillos rotatorios', 'Ajustes a presión y por contracción',
    'Efectos de la temperatura', 'Vigas curvas en flexión', 'Esfuerzos de contacto',
  ],
  4: [
    'Constantes de resorte', 'Tensión compresión y torsión',
    'Deformación debida a flexión', 'Métodos para calcular deflexión',
    'Deflexión por superposición', 'Deflexión por funciones de singularidad',
    'Energía de deformación', 'Teorema de Castigliano', 'Deflexión de elementos curvos',
    'Problemas estáticamente indeterminados', 'Elementos a compresión general',
    'Columnas largas carga centrada', 'Columnas de longitud intermedia',
    'Columnas con carga excéntrica', 'Puntales o elementos cortos',
    'Estabilidad elástica', 'Choque e impacto',
  ],
  5: [
    'Resistencia estática', 'Concentración del esfuerzo', 'Teorías de falla',
    'Esfuerzo cortante máximo ECM Tresca', 'Energía de distorsión ED von Mises',
    'Mohr-Coulomb para dúctiles CMD', 'Resumen materiales dúctiles',
    'Esfuerzo normal máximo ENM', 'Modificaciones Mohr para frágiles',
    'Resumen materiales frágiles', 'Selección de criterios de falla',
    'Mecánica de fractura', 'Análisis estocástico', 'Ecuaciones de diseño importantes',
  ],
  6: [
    'Introducción a la fatiga en metales', 'Enfoque de la falla por fatiga',
    'Métodos de fatiga-vida', 'Método del esfuerzo-vida',
    'Método de deformación-vida', 'Mecánica de fractura lineal elástica',
    'Límite de resistencia a la fatiga', 'Resistencia a la fatiga',
    'Factores modificadores de Marin', 'Concentración de esfuerzo y sensibilidad a la muesca',
    'Caracterización de esfuerzos fluctuantes', 'Criterios de falla por fatiga',
    'Fatiga por torsión bajo esfuerzos fluctuantes', 'Combinaciones de modos de carga',
    'Daño por fatiga acumulada Miner', 'Resistencia a la fatiga superficial',
    'Análisis estocástico', 'Resumen de ecuaciones importantes',
  ],
  7: [
    'Introducción a ejes y flechas', 'Materiales para ejes', 'Configuración de ejes',
    'Diseño para esfuerzo', 'Deflexión en ejes', 'Velocidades críticas',
    'Componentes de ejes cuñas', 'Límites y ajustes',
  ],
  8: [
    'Normas y definiciones de roscas', 'Tornillos de potencia',
    'Sujetadores roscados', 'Rigidez del sujetador', 'Rigidez del elemento',
    'Resistencia del perno', 'Carga externa en uniones', 'Par de torsión',
    'Uniones con precarga', 'Uniones con empaque', 'Fatiga en uniones',
    'Cortante en pernos',
  ],
  9: [
    'Símbolos de soldadura', 'Soldaduras a tope y filete', 'Esfuerzos en torsión',
    'Esfuerzos en flexión', 'Resistencia de soldaduras', 'Carga estática',
    'Fatiga en soldaduras', 'Soldadura por resistencia', 'Adhesivos',
  ],
  10: [
    'Resortes helicoidales', 'Esfuerzos en torsión resortes', 'Extremos y longitudes',
    'Deflexión y rigidez', 'Estabilidad pandeo en resortes', 'Materiales para resortes',
    'Diseño estático', 'Diseño a fatiga', 'Resortes de extensión',
    'Resortes de torsión', 'Resortes de hoja', 'Resortes Belleville', 'Resortes diversos',
  ],
  11: [
    'Tipos de cojinetes', 'Vida L10', 'Carga y vida', 'Confiabilidad Weibull',
    'Carga Vida Confiabilidad', 'Carga equivalente', 'Cargas variables',
    'Selección de cojinetes',
  ],
  12: [
    'Tipos de lubricación', 'Viscosidad', 'Ecuación de Petroff',
    'Lubricación estable', 'Película gruesa', 'Teoría hidrodinámica',
    'Diseño de chumaceras', 'Variables de diseño',
  ],
  13: [
    'Tipos de engranes', 'Nomenclatura de engranes', 'Acción conjugada',
    'Fundamentos de engranes', 'Relación de contacto', 'Interferencia en engranes',
    'Engranes cónicos', 'Engranes helicoidales', 'Tornillo sinfín',
    'Trenes de engranes', 'Análisis de fuerzas',
  ],
  14: [
    'Ecuación de Lewis', 'Durabilidad superficial', 'Esfuerzo AGMA',
    'Resistencia AGMA', 'Factores J e I', 'Cp constante elástica',
    'Kv factor dinámico', 'Ko factor de sobrecarga', 'Ks factor de tamaño',
    'Km factor de distribución', 'YN factor de ciclos', 'ZN factor de resistencia superficial',
    'SF y SH factores de seguridad', 'Análisis AGMA', 'Diseño acoplamiento AGMA',
  ],
  15: [
    'Engranes cónicos AGMA', 'Esfuerzos y resistencias cónicos',
    'Factores AGMA cónicos', 'Análisis cónico', 'Diseño cónico',
    'Ecuación AGMA tornillo sinfín', 'Análisis tornillo sinfín',
    'Diseño acoplamiento sinfín', 'Carga Buckingham',
  ],
  16: [
    'Análisis estático frenos', 'Frenos tambor expansión', 'Contracción externa freno',
    'Frenos de banda', 'Embragues axiales disco', 'Frenos de disco',
    'Embragues cónicos', 'Consideraciones energía', 'Temperatura en frenos',
    'Materiales de fricción', 'Volantes de inercia',
  ],
  17: [
    'Bandas de transmisión', 'Banda plana y redonda', 'Bandas en V',
    'Bandas de sincronización', 'Cadenas de rodillos', 'Cables metálicos',
    'Ejes flexibles',
  ],
  18: [
    'Introducción caso de estudio', 'Secuencia de diseño', 'Potencia y par torsión',
    'Especificaciones de engranes', 'Diseño del eje', 'Análisis de fuerzas',
    'Material y esfuerzos', 'Cojinetes y cuñas', 'Análisis final',
  ],
  19: [
    'Introducción a elementos finitos', 'Método FEM', 'Geometrías de elemento',
    'Proceso de solución', 'Generación de malla', 'Aplicación de cargas',
    'Condiciones de frontera', 'Técnicas de modelado', 'Esfuerzos térmicos',
    'Pandeo y vibración FEM',
  ],
  20: [
    'Introducción a estadística', 'Variables aleatorias', 'Media y desviación estándar',
    'Distribuciones de probabilidad', 'Distribución normal', 'Distribución lognormal',
    'Distribución Weibull', 'Propagación del error', 'Regresión lineal',
  ],
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = []

  for (const part of PARTS_DATA) {
    for (const ch of part.chapters) {
      entries.push({
        type: 'capitulo',
        title: `Capítulo ${ch.id}: ${ch.title}`,
        subtitle: ch.description,
        href: `/capitulo/${ch.id}`,
        keywords: [ch.title, ch.shortTitle, ch.description, ...ch.keywords],
        partColor: part.color,
        chapterId: ch.id,
      })

      const sections = CHAPTER_SECTIONS[ch.id] || []
      for (const sec of sections) {
        entries.push({
          type: 'seccion',
          title: `${ch.id}. ${sec}`,
          subtitle: `Capítulo ${ch.id} — ${ch.shortTitle}`,
          href: `/capitulo/${ch.id}`,
          keywords: [sec, ch.title, ch.shortTitle],
          partColor: part.color,
          chapterId: ch.id,
        })
      }
    }
  }

  for (const tool of TOOLS_DATA) {
    entries.push({
      type: 'herramienta',
      title: tool.title,
      subtitle: tool.desc,
      href: tool.href,
      keywords: [tool.title, tool.desc, ...tool.keywords],
    })
  }

  return entries
}

const PARTS_DATA = [
  {
    id: 1, color: '#3B82F6',
    chapters: [
      { id: 1, title: 'Introducción al diseño en ingeniería mecánica', shortTitle: 'Introducción al diseño', description: 'Proceso de diseño, factores de seguridad y normas técnicas', keywords: ['diseño', 'ingeniería', 'mecánica', 'factor de seguridad', 'normas', 'tolerancias', 'confiabilidad', 'incertidumbre', 'esfuerzo', 'resistencia'] },
      { id: 2, title: 'Materiales', shortTitle: 'Materiales', description: 'Propiedades mecánicas, diagrama esfuerzo-deformación, selección de materiales', keywords: ['materiales', 'propiedades', 'esfuerzo', 'deformación', 'dureza', 'acero', 'fundición', 'tratamiento térmico', 'compuestos', 'plásticos'] },
      { id: 3, title: 'Análisis de carga y esfuerzo', shortTitle: 'Carga y esfuerzo', description: 'DCL, cortante y momento, Círculo de Mohr, concentración de esfuerzos', keywords: ['carga', 'esfuerzo', 'DCL', 'diagrama cuerpo libre', 'cortante', 'momento', 'Mohr', 'torsión', 'flexión', 'vigas', 'concentración esfuerzo'] },
      { id: 4, title: 'Deflexión y rigidez', shortTitle: 'Deflexión', description: 'Deflexión en vigas, columnas, pandeo de Euler, método de Castigliano', keywords: ['deflexión', 'rigidez', 'vigas', 'columnas', 'pandeo', 'Euler', 'Castigliano', 'superposición', 'energía deformación', 'impacto'] },
    ],
  },
  {
    id: 2, color: '#F59E0B',
    chapters: [
      { id: 5, title: 'Fallas resultantes de carga estática', shortTitle: 'Falla estática', description: 'Teorías de falla MSS, DE, Mohr-Coulomb, mecánica de fractura', keywords: ['falla', 'estática', 'MSS', 'Tresca', 'von Mises', 'energía distorsión', 'Mohr-Coulomb', 'fractura', 'esfuerzo normal máximo', 'dúctil', 'frágil'] },
      { id: 6, title: 'Fallas por fatiga debidas a cargas variables', shortTitle: 'Fatiga', description: 'Curva S-N, factores de Marin, diagrama de Goodman, daño acumulado', keywords: ['fatiga', 'S-N', 'Marin', 'Goodman', 'Miner', 'daño acumulado', 'esfuerzo fluctuante', 'límite fatiga', 'muesca', 'Soderberg', 'Gerber'] },
    ],
  },
  {
    id: 3, color: '#22C55E',
    chapters: [
      { id: 7, title: 'Ejes, flechas y sus componentes', shortTitle: 'Ejes y flechas', description: 'Diseño de ejes, velocidades críticas, cuñas y anillos', keywords: ['ejes', 'flechas', 'velocidad crítica', 'cuñas', 'diseño eje', 'deflexión', 'torsión', 'concentración esfuerzo'] },
      { id: 8, title: 'Tornillos, sujetadores y uniones no permanentes', shortTitle: 'Tornillos', description: 'Uniones atornilladas, diagrama de precarga, fatiga en pernos', keywords: ['tornillos', 'sujetadores', 'uniones', 'precarga', 'perno', 'rosca', 'par torsión', 'rigidez', 'fatiga pernos', 'potencia'] },
      { id: 9, title: 'Soldadura, adhesión y uniones permanentes', shortTitle: 'Soldadura', description: 'Esfuerzos en soldaduras, grupos de soldaduras, simbología', keywords: ['soldadura', 'uniones', 'filete', 'adhesivos', 'símbolos', 'torsión', 'flexión', 'fatiga soldadura'] },
      { id: 10, title: 'Resortes mecánicos', shortTitle: 'Resortes', description: 'Resortes helicoidales, factor de Wahl, fatiga en resortes', keywords: ['resortes', 'helicoidales', 'Wahl', 'rigidez', 'pandeo', 'fatiga resortes', 'extensión', 'torsión', 'Belleville'] },
      { id: 11, title: 'Cojinetes de contacto rodante', shortTitle: 'Cojinetes rodantes', description: 'Vida L10, selección de cojinetes, confiabilidad', keywords: ['cojinetes', 'rodamiento', 'L10', 'vida', 'confiabilidad', 'Weibull', 'carga equivalente', 'selección'] },
      { id: 12, title: 'Cojinetes deslizantes y lubricación', shortTitle: 'Cojinetes deslizantes', description: 'Ecuación de Petroff, gráficas de Raimondi-Boyd, viscosidad', keywords: ['cojinetes deslizantes', 'lubricación', 'Petroff', 'Raimondi-Boyd', 'viscosidad', 'película', 'hidrodinámica', 'chumacera'] },
      { id: 13, title: 'Engranes: descripción general', shortTitle: 'Engranes general', description: 'Perfil de involuta, relaciones de transmisión, análisis de fuerzas', keywords: ['engranes', 'involuta', 'transmisión', 'fuerzas', 'cónicos', 'helicoidales', 'sinfín', 'trenes', 'relación transmisión'] },
      { id: 14, title: 'Engranes rectos y helicoidales', shortTitle: 'Engranes rectos', description: 'Ecuación de Lewis, calculadora AGMA, diseño completo', keywords: ['engranes rectos', 'helicoidales', 'Lewis', 'AGMA', 'durabilidad', 'esfuerzo', 'resistencia', 'acoplamiento'] },
      { id: 15, title: 'Engranes cónicos y de tornillo sinfín', shortTitle: 'Engranes cónicos', description: 'Análisis AGMA cónicos, eficiencia del sinfín, fuerzas 3D', keywords: ['cónicos', 'sinfín', 'AGMA cónico', 'eficiencia', 'Buckingham', 'acoplamiento'] },
      { id: 16, title: 'Embragues, frenos, coples y volantes', shortTitle: 'Embragues y frenos', description: 'Presión uniforme vs desgaste, freno de banda, diseño de volantes', keywords: ['embragues', 'frenos', 'coples', 'volantes', 'banda', 'disco', 'tambor', 'fricción', 'energía', 'temperatura', 'inercia'] },
      { id: 17, title: 'Elementos mecánicos flexibles', shortTitle: 'Elementos flexibles', description: 'Transmisión por banda, cadenas de rodillos, cables metálicos', keywords: ['bandas', 'cadenas', 'rodillos', 'cables', 'flexibles', 'transmisión', 'sincronización', 'V'] },
      { id: 18, title: 'Caso de estudio: transmisión de potencia', shortTitle: 'Caso de estudio', description: 'Diseño integrador: engranes + ejes + cojinetes + cuñas', keywords: ['caso estudio', 'transmisión potencia', 'integrador', 'engranes', 'ejes', 'cojinetes', 'cuñas', 'reductor'] },
    ],
  },
  {
    id: 4, color: '#A78BFA',
    chapters: [
      { id: 19, title: 'Análisis de elementos finitos', shortTitle: 'Elementos finitos', description: 'Discretización, malla, refinamiento y casos simples de FEA', keywords: ['elementos finitos', 'FEA', 'FEM', 'malla', 'discretización', 'esfuerzo térmico', 'pandeo', 'vibración', 'frontera'] },
      { id: 20, title: 'Consideraciones estadísticas', shortTitle: 'Estadística', description: 'Distribución normal, confiabilidad, regresión lineal', keywords: ['estadística', 'distribución', 'normal', 'lognormal', 'Weibull', 'regresión', 'confiabilidad', 'error', 'media', 'desviación', 'aleatoria'] },
    ],
  },
]

const TOOLS_DATA = [
  { title: 'Círculo de Mohr Interactivo', desc: 'Calcula esfuerzos principales, cortante máximo y ángulo del plano principal', href: '/herramientas', keywords: ['Mohr', 'esfuerzo principal', 'cortante máximo', 'círculo Mohr', 'esfuerzo plano', 'transformación esfuerzo'] },
  { title: 'Factor de Seguridad', desc: 'Calcula el factor de seguridad n = Sy/σ con indicador visual de estado', href: '/herramientas', keywords: ['factor seguridad', 'Sy', 'resistencia', 'esfuerzo', 'n', 'diseño seguro'] },
  { title: 'Conversor de Unidades', desc: 'Convierte entre sistemas SI y USCS para esfuerzo, fuerza y longitud', href: '/herramientas', keywords: ['unidades', 'conversión', 'SI', 'USCS', 'MPa', 'psi', 'newton', 'libra'] },
  { title: 'Calculadora de Marin', desc: 'Calcula el límite de fatiga corregido Se con todos los factores de Marin', href: '/herramientas', keywords: ['Marin', 'fatiga', 'límite fatiga', 'Se', 'ka', 'kb', 'kc', 'kd', 'ke', 'factor superficie', 'factor tamaño'] },
  { title: 'Conversor de Dureza', desc: 'Convierte entre Brinell (HB), Rockwell (HRC) y Vickers (HV), con estimación de Sut', href: '/herramientas', keywords: ['dureza', 'Brinell', 'Rockwell', 'Vickers', 'HB', 'HRC', 'HV', 'Sut', 'resistencia tensión'] },
]

export const SEARCH_INDEX = buildSearchIndex()
