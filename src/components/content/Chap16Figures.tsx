'use client'
import { SVGContainer } from './ChapterHelpers'

export function DiskClutchSVG() {
  return (
    <SVGContainer caption="Figura 16-1/2: Embrague de disco — fuerzas axial y de fricción generan par" width={360} height={280}>
      <defs>
        <marker id="arr16" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="var(--accent)" />
        </marker>
        <linearGradient id="discGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#22C55E" stopOpacity={0.6} />
        </linearGradient>
      </defs>
      {/* Disco fricción superior */}
      <rect x="110" y="70" width="160" height="30" rx="4" fill="url(#discGrad)" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Disco fricción inferior */}
      <rect x="110" y="170" width="160" height="30" rx="4" fill="url(#discGrad)" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Eje central */}
      <rect x="182" y="200" width="16" height="50" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5" rx="2" />
      {/* Forro de fricción */}
      <rect x="120" y="100" width="140" height="10" rx="2" fill="#f97316" opacity="0.5" />
      <rect x="120" y="160" width="140" height="10" rx="2" fill="#f97316" opacity="0.5" />
      {/* Flecha fuerza axial */}
      <line x1="190" y1="50" x2="190" y2="68" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr16)" />
      <text x="195" y="55" fill="#ef4444" fontSize="10" fontFamily="var(--font-mono)">F</text>
      <line x1="190" y1="200" x2="190" y2="218" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr16)" />
      {/* Flecha torque */}
      <path d="M120,85 Q100,95 105,115" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr16)" />
      <text x="95" y="105" fill="var(--text-2)" fontSize="9">T</text>
      {/* Diámetros */}
      <line x1="110" y1="135" x2="50" y2="135" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="3,2" />
      <text x="40" y="130" fill="var(--text-2)" fontSize="9">d (int.)</text>
      <line x1="270" y1="135" x2="310" y2="135" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="3,2" />
      <text x="295" y="130" fill="var(--text-2)" fontSize="9">D (ext.)</text>
      {/* Elemento de área */}
      <path d="M145,100 L145,160" stroke="var(--text-2)" strokeWidth="0.6" strokeDasharray="2,2" />
      <text x="148" y="135" fill="var(--text-2)" fontSize="8">r</text>
    </SVGContainer>
  )
}

export function BandBrakeSVG() {
  return (
    <SVGContainer caption="Figura 16-5/6: Freno de banda — P₁/P₂ = e^(f·θ)" width={380} height={280}>
      <defs>
        <marker id="arr16b" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="var(--accent)" />
        </marker>
      </defs>
      {/* Tambor */}
      <circle cx="190" cy="140" r="65" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <circle cx="190" cy="140" r="55" fill="#22C55E15" stroke="var(--accent)" strokeWidth="0.5" />
      {/* Banda alrededor */}
      <path d="M125,140 Q125,75 190,75 Q255,75 255,140" fill="none" stroke="#f97316" strokeWidth="4" opacity="0.7" />
      <path d="M125,140 Q125,205 190,205 Q255,205 255,140" fill="none" stroke="#f97316" strokeWidth="4" opacity="0.7" />
      {/* Palanca */}
      <line x1="255" y1="140" x2="340" y2="110" stroke="var(--accent)" strokeWidth="2" />
      <line x1="255" y1="140" x2="340" y2="170" stroke="var(--accent)" strokeWidth="2" />
      {/* Pivote */}
      <circle cx="340" cy="110" r="5" fill="var(--accent)" />
      <circle cx="340" cy="170" r="5" fill="var(--accent)" />
      {/* Fuerzas */}
      <line x1="340" y1="110" x2="370" y2="110" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arr16b)" />
      <text x="365" y="105" fill="#ef4444" fontSize="9">F</text>
      {/* Tensión banda */}
      <text x="135" y="90" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">P₁</text>
      <text x="135" y="215" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">P₂</text>
      {/* Rotación */}
      <path d="M155,90 Q130,100 130,125" fill="none" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#arr16b)" />
      <text x="110" y="100" fill="var(--text-2)" fontSize="9">ω</text>
    </SVGContainer>
  )
}

export function FlywheelSVG() {
  return (
    <SVGContainer caption="Figura 16-10: Volante de inercia — suaviza pulsaciones de energía" width={360} height={280}>
      <defs>
        <marker id="arr16c" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <path d="M0,0 L7,2.5 L0,5" fill="var(--accent)" />
        </marker>
      </defs>
      {/* Masa volante */}
      <circle cx="180" cy="140" r="95" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <circle cx="180" cy="140" r="70" fill="#22C55E15" stroke="var(--accent)" strokeWidth="1" />
      <circle cx="180" cy="140" r="30" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4,3" />
      <circle cx="180" cy="140" r="10" fill="var(--accent)" />
      {/* Eje */}
      <rect x="175" y="30" width="10" height="220" fill="var(--accent)" opacity={0.3} />
      {/* Flecha rotación */}
      <path d="M260,100 Q280,130 270,170" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr16c)" />
      <text x="275" y="140" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">ω</text>
      {/* Dimensiones */}
      <line x1="85" y1="210" x2="85" y2="265" stroke="var(--text-2)" strokeWidth="0.8" />
      <line x1="180" y1="210" x2="180" y2="265" stroke="var(--text-2)" strokeWidth="0.8" />
      <line x1="180" y1="210" x2="275" y2="210" stroke="var(--text-2)" strokeWidth="0.8" />
      <text x="115" y="258" fill="var(--text-2)" fontSize="9">R₁</text>
      <text x="215" y="205" fill="var(--text-2)" fontSize="9">R₂</text>
      {/* Energía */}
      <path d="M65,50 Q95,20 130,30 Q160,40 180,35" fill="none" stroke="#f97316" strokeWidth="1.5" opacity={0.5} />
      <text x="65" y="45" fill="#f97316" fontSize="9">ΔE</text>
    </SVGContainer>
  )
}
