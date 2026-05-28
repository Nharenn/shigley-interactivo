'use client'
import { SVGContainer } from './ChapterHelpers'

export function GearboxLayoutSVG() {
  return (
    <SVGContainer caption="Figura 18-1: Reductor de 2 etapas — vista en corte del sistema integrado" width={440} height={300}>
      <defs>
        <marker id="arr18" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="var(--accent)" />
        </marker>
      </defs>
      {/* Carcasa */}
      <rect x="30" y="30" width="380" height="240" rx="8" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="200" y="25" fill="var(--text-2)" fontSize="8" textAnchor="middle">Carcasa 22 × 14 × 14 pulg</text>

      {/* Eje de entrada (eje 2) */}
      <line x1="60" y1="100" x2="200" y2="100" stroke="var(--accent)" strokeWidth="3" />
      <circle cx="200" cy="100" r="22" fill="#22C55E" stroke="var(--accent)" strokeWidth="1.5" opacity={0.6} />
      <text x="200" y="105" fill="var(--text-1)" fontSize="8" textAnchor="middle">N₂</text>
      {/* Cojinetes entrada */}
      <rect x="75" y="92" width="8" height="16" rx="2" fill="#f97316" opacity={0.6} />
      <rect x="145" y="92" width="8" height="16" rx="2" fill="#f97316" opacity={0.6} />

      {/* Eje intermedio (eje 3-4) */}
      <line x1="100" y1="200" x2="300" y2="200" stroke="var(--accent)" strokeWidth="3" />
      <circle cx="300" cy="200" r="32" fill="#22C55E" stroke="var(--accent)" strokeWidth="1.5" opacity={0.6} />
      <text x="300" y="205" fill="var(--text-1)" fontSize="8" textAnchor="middle">N₃</text>
      <circle cx="100" cy="200" r="22" fill="#22C55E" stroke="var(--accent)" strokeWidth="1.5" opacity={0.6} />
      <text x="100" y="205" fill="var(--text-1)" fontSize="8" textAnchor="middle">N₄</text>
      {/* Cojinetes intermedio */}
      <rect x="130" y="192" width="8" height="16" rx="2" fill="#f97316" opacity={0.6} />
      <rect x="260" y="192" width="8" height="16" rx="2" fill="#f97316" opacity={0.6} />

      {/* Eje de salida (eje 5) */}
      <line x1="240" y1="100" x2="380" y2="100" stroke="var(--accent)" strokeWidth="3" />
      <circle cx="240" cy="100" r="32" fill="#22C55E" stroke="var(--accent)" strokeWidth="1.5" opacity={0.6} />
      <text x="240" y="105" fill="var(--text-1)" fontSize="8" textAnchor="middle">N₅</text>
      {/* Cojinetes salida */}
      <rect x="275" y="92" width="8" height="16" rx="2" fill="#f97316" opacity={0.6} />
      <rect x="345" y="92" width="8" height="16" rx="2" fill="#f97316" opacity={0.6} />

      {/* Flecha potencia entrada */}
      <line x1="30" y1="100" x2="55" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr18)" />
      <text x="35" y="93" fill="#ef4444" fontSize="8">20 hp</text>
      <text x="35" y="115" fill="var(--text-2)" fontSize="8">1750 rpm</text>

      {/* Flecha salida */}
      <line x1="385" y1="100" x2="410" y2="100" stroke="#22C55E" strokeWidth="2" markerEnd="url(#arr18)" />
      <text x="395" y="93" fill="#22C55E" fontSize="8">86 rpm</text>

      {/* Línea de transmisión */}
      <path d="M200,122 L300,168" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="3,2" />
      <path d="M100,222 L240,132" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="3,2" />

      {/* Etiquetas */}
      <text x="310" y="180" fill="var(--text-2)" fontSize="8">Etapa 1</text>
      <text x="145" y="230" fill="var(--text-2)" fontSize="8">Etapa 2</text>

      {/* Cuñas */}
      <rect x="205" y="95" width="6" height="3" fill="#f97316" />
      <rect x="105" y="195" width="6" height="3" fill="#f97316" />
      <rect x="245" y="95" width="6" height="3" fill="#f97316" />
    </SVGContainer>
  )
}

export function ShaftForcesSVG() {
  return (
    <SVGContainer caption="Figura 18-2: Diagramas de fuerza cortante y momento flector en el eje intermedio" width={400} height={300}>
      <defs>
        <marker id="arr18b" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="var(--accent)" />
        </marker>
      </defs>
      {/* Eje */}
      <line x1="50" y1="60" x2="350" y2="60" stroke="var(--accent)" strokeWidth="3" />
      {/* Cojinetes */}
      <rect x="70" y="52" width="12" height="16" rx="2" fill="#f97316" opacity={0.6} />
      <rect x="310" y="52" width="12" height="16" rx="2" fill="#f97316" opacity={0.6} />
      {/* Engrane N₃ */}
      <circle cx="180" cy="60" r="25" fill="#22C55E40" stroke="var(--accent)" strokeWidth="1" />
      <text x="180" y="65" fill="var(--text-1)" fontSize="9" textAnchor="middle">N₃</text>
      {/* Piñón N₄ */}
      <circle cx="280" cy="60" r="18" fill="#22C55E60" stroke="var(--accent)" strokeWidth="1" />
      <text x="280" y="65" fill="var(--text-1)" fontSize="9" textAnchor="middle">N₄</text>
      {/* Fuerzas */}
      <line x1="180" y1="35" x2="180" y2="10" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr18b)" />
      <text x="185" y="22" fill="#ef4444" fontSize="9" fontFamily="var(--font-mono)">Wt₃</text>
      <line x1="280" y1="78" x2="280" y2="100" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr18b)" />
      <text x="260" y="95" fill="#ef4444" fontSize="9" fontFamily="var(--font-mono)">Wt₄</text>
      {/* Diagrama cortante */}
      <text x="15" y="165" fill="var(--text-2)" fontSize="9">V</text>
      <line x1="50" y1="150" x2="350" y2="150" stroke="var(--text-2)" strokeWidth="0.5" />
      <path d="M70,130 L180,130 L180,170 L280,170 L280,130 L322,130" fill="none" stroke="#f97316" strokeWidth="2" />
      {/* Diagrama momento */}
      <text x="15" y="245" fill="var(--text-2)" fontSize="9">M</text>
      <line x1="50" y1="230" x2="350" y2="230" stroke="var(--text-2)" strokeWidth="0.5" />
      <path d="M70,230 L180,230 Q220,200 280,230 L322,230" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="4,2" />
      <circle cx="225" cy="215" r="3" fill="#f97316" />
      <text x="215" y="210" fill="#f97316" fontSize="8">M_max</text>
    </SVGContainer>
  )
}
