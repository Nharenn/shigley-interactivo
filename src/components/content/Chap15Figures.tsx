'use client'
import { SVGContainer } from './ChapterHelpers'

export function BevelGearSVG() {
  return (
    <SVGContainer caption="Figura 15-1: Engranes cónicos rectos — geometría cónica con ejes a 90°" width={420} height={300}>
      <defs>
        <marker id="arrow15" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="var(--accent)" />
        </marker>
        <linearGradient id="gearGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#22C55E" stopOpacity={0.6} />
        </linearGradient>
      </defs>
      {/* Piñón cónico (adelante) */}
      <ellipse cx="180" cy="210" rx="60" ry="25" fill="url(#gearGrad1)" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="120" y1="210" x2="180" y2="130" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="240" y1="210" x2="180" y2="130" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M120,210 Q150,250 180,210" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
      {/* Corona cónica (lado) */}
      <ellipse cx="220" cy="140" rx="20" ry="50" fill="url(#gearGrad1)" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="220" y1="90" x2="180" y2="130" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="220" y1="190" x2="180" y2="130" stroke="var(--accent)" strokeWidth="1.5" />
      {/* Línea de paso */}
      <path d="M240,210 L220,140" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4,3" />
      {/* Flecha de torque */}
      <line x1="170" y1="230" x2="170" y2="265" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow15)" />
      <text x="155" y="278" fill="var(--text-2)" fontSize="10" fontFamily="var(--font-mono)">T₁</text>
      {/* Flecha rotación */}
      <path d="M195,220 Q210,215 215,200" fill="none" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#arrow15)" />
      <text x="218" y="195" fill="var(--text-2)" fontSize="9">ω₁</text>
      {/* Llamadas */}
      <line x1="125" y1="210" x2="100" y2="260" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="2,2" />
      <text x="70" y="272" fill="var(--text-2)" fontSize="9">Piñón cónico</text>
      <line x1="230" y1="100" x2="280" y2="85" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="2,2" />
      <text x="268" y="80" fill="var(--text-2)" fontSize="9">Corona</text>
      <text x="10" y="20" fill="var(--text-2)" fontSize="9">γ = arctan(N₁/N₂)</text>
    </SVGContainer>
  )
}

export function WormGearSVG() {
  return (
    <SVGContainer caption="Figura 15-5: Acoplamiento tornillo sinfín–corona — ejes a 90°, relación hasta 100:1" width={420} height={280}>
      <defs>
        <marker id="arrow15b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill="var(--accent)" />
        </marker>
        <linearGradient id="wormGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22C55E" stopOpacity={0.2} />
          <stop offset="50%" stopColor="#22C55E" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#22C55E" stopOpacity={0.2} />
        </linearGradient>
      </defs>
      {/* Eje tornillo sinfín (horizontal) */}
      <line x1="50" y1="160" x2="350" y2="160" stroke="var(--accent)" strokeWidth="3" />
      {/* Rosca del sinfín */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => {
        const x = 80 + i * 20
        return <path key={i} d={`M${x},140 L${x+3},180`} stroke="var(--accent)" strokeWidth="2" opacity={0.7} />
      })}
      {/* Cilindro sinfín */}
      <rect x="60" y="145" width="260" height="30" rx="3" fill="url(#wormGrad)" stroke="var(--accent)" strokeWidth="1" />
      {/* Corona (vista lateral) */}
      <ellipse cx="260" cy="120" rx="18" ry="45" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <path d="M242,120 Q260,115 278,120" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <line x1="260" y1="75" x2="260" y2="165" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
      {/* Dientes de la corona */}
      {[-40,-30,-20,-10,0,10,20,30,40].map(i => {
        const y = 120 + i
        const xo = 242 + (i < 0 ? Math.abs(i)*0.15 : 0)
        return <line key={i} x1={260} y1={y} x2={xo} y2={y} stroke="var(--accent)" strokeWidth="1.5" opacity={0.5} />
      })}
      {/* Ángulo de avance */}
      <path d="M90,160 L120,145" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,2" />
      <text x="95" y="150" fill="var(--text-2)" fontSize="9">λ</text>
      {/* Flecha rotación sinfín */}
      <path d="M330,145 Q340,155 330,168" fill="none" stroke="var(--accent)" strokeWidth="1.2" markerEnd="url(#arrow15b)" />
      <text x="335" y="140" fill="var(--text-2)" fontSize="9">ωw</text>
      {/* Flecha rotación corona */}
      <path d="M280,95 Q295,90 300,105" fill="none" stroke="var(--accent)" strokeWidth="1" markerEnd="url(#arrow15b)" />
      <text x="285" y="88" fill="var(--text-2)" fontSize="9">ωG</text>
      {/* Llamada */}
      <line x1="80" y1="180" x2="60" y2="220" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="2,2" />
      <text x="20" y="235" fill="var(--text-2)" fontSize="9">Tornillo sinfín (Nw hilos)</text>
      <line x1="275" y1="165" x2="300" y2="210" stroke="var(--text-2)" strokeWidth="0.8" strokeDasharray="2,2" />
      <text x="290" y="225" fill="var(--text-2)" fontSize="9">Corona (NG dientes)</text>
    </SVGContainer>
  )
}
